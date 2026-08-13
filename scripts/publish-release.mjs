#!/usr/bin/env node
// Publishes the built installer to GitHub Releases. nidal.ee reads that release
// to answer update checks, so this is what actually ships a version: until the
// release exists with both the zipped bundle and its signature, the updater
// keeps serving the previous one.
import { execFileSync } from 'node:child_process'
import { copyFileSync, existsSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const bundle = join(root, 'apps/desktop/src-tauri/target/release/bundle/msi')

const { package: pkg } = JSON.parse(
  readFileSync(join(root, 'apps/desktop/src-tauri/tauri.conf.json'), 'utf8'),
)
const version = pkg.version
const tag = `v${version}`

// A tag that disagrees with the config would publish an installer under the
// wrong version and the updater would offer it forever.
const pushedTag = process.env.GITHUB_REF_NAME
if (pushedTag && pushedTag.startsWith('v') && pushedTag !== tag) {
  console.error(`publish: tag ${pushedTag} does not match version ${version}`)
  process.exit(1)
}

const installer = join(bundle, `Nidalee_${version}_x64_en-US.msi`)
const updaterBundle = `${installer}.zip`
const signature = `${updaterBundle}.sig`

for (const file of [installer, updaterBundle, signature]) {
  if (!existsSync(file)) {
    console.error(`publish: ${file} is missing, run "npx tauri build" first`)
    process.exit(1)
  }
}

// The website links to a name that never changes, so it does not need editing
// for every release.
const alias = join(bundle, 'Nidalee-Setup.msi')
copyFileSync(installer, alias)

const git = (...args) => {
  try {
    return execFileSync('git', args, { cwd: root, encoding: 'utf8' }).trim()
  } catch {
    return ''
  }
}

// Plain lines, because these notes are shown both on the release page and in the
// app's update prompt, where markdown would render as literal characters.
function notes() {
  const previous = git('describe', '--tags', '--abbrev=0', `${tag}^`) || git('describe', '--tags', '--abbrev=0', 'HEAD^')
  const range = previous ? `${previous}..HEAD` : 'HEAD'
  const log = git('log', '--no-merges', '--format=%s', range)
  const subjects = log ? log.split('\n').filter(Boolean) : []

  const worthMentioning = subjects
    .filter(s => /^(feat|fix|perf)(\([^)]*\))?:/.test(s))
    .filter(s => !/^chore(\(release\))?:/.test(s))
    .map(s => s.replace(/^\w+(\([^)]*\))?:\s*/, ''))
    .map(s => s.charAt(0).toUpperCase() + s.slice(1))

  const lines = worthMentioning.length ? worthMentioning : ['Maintenance and reliability fixes.']
  return `${lines.map(line => `- ${line}`).join('\n')}\n`
}

const notesFile = join(bundle, `notes-${version}.md`)
writeFileSync(notesFile, notes(), 'utf8')

try {
  execFileSync(
    'gh',
    ['release', 'create', tag, installer, alias, updaterBundle, signature,
      '--title', version, '--notes-file', notesFile, '--latest'],
    { cwd: root, stdio: 'inherit', shell: process.platform === 'win32' },
  )
  console.log(`publish: ${version} is live, nidal.ee will serve it within five minutes`)
} finally {
  rmSync(notesFile, { force: true })
}
