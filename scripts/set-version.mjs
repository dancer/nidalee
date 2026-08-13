#!/usr/bin/env node
// The version lives in four places that must agree: the installer name comes
// from tauri.conf.json, the updater compares against the Cargo package version,
// and the site prints it. Drift between them is how a release ends up offering
// users a build they already have.
//
//   node scripts/set-version.mjs 0.1.4
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const version = process.argv[2]

if (!/^\d+\.\d+\.\d+$/.test(version ?? '')) {
  console.error('usage: node scripts/set-version.mjs <major.minor.patch>')
  process.exit(1)
}

const edits = [
  ['apps/desktop/package.json', /("version":\s*)"[^"]+"/, `$1"${version}"`],
  ['apps/desktop/src-tauri/tauri.conf.json', /("version":\s*)"[^"]+"/, `$1"${version}"`],
  ['apps/desktop/src-tauri/Cargo.toml', /^(version = )"[^"]+"/m, `$1"${version}"`],
  ['apps/web/app/version.ts', /(APP_VERSION = )'[^']+'/, `$1'${version}'`],
]

for (const [file, pattern, replacement] of edits) {
  const path = join(root, file)
  const before = readFileSync(path, 'utf8')
  const after = before.replace(pattern, replacement)
  if (before === after) {
    console.error(`set-version: no version found in ${file}`)
    process.exit(1)
  }
  writeFileSync(path, after)
  console.log(`set-version: ${file}`)
}

// Cargo.lock records the package version too, and a stale entry makes the
// release build dirty the lockfile.
const lockPath = join(root, 'apps/desktop/src-tauri/Cargo.lock')
const lock = readFileSync(lockPath, 'utf8')
writeFileSync(
  lockPath,
  lock.replace(/(name = "nidalee"\nversion = )"[^"]+"/, `$1"${version}"`),
)
console.log('set-version: apps/desktop/src-tauri/Cargo.lock')
console.log(`\nnow: git commit -am "chore: v${version}" && git tag v${version} && git push --follow-tags`)
