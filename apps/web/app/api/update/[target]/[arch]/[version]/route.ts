import { NextResponse } from 'next/server'

// Tauri's updater polls this endpoint with its own version, OS and architecture.
// We answer from the latest GitHub release: 204 means "you are up to date", and
// anything else must include the signed bundle's URL and signature, which the
// client verifies against the public key baked into the app before installing.
//
// Serving the manifest from our own domain means a release goes live the moment
// it is published on GitHub, with no second deploy and nothing to keep in sync.

const REPO = 'dancer/nidalee'
const CACHE_SECONDS = 300

// Only Windows x86_64 is built today. Tauri sends target as `windows`.
const SUPPORTED = new Set(['windows-x86_64'])

type GitHubAsset = { name: string; browser_download_url: string }
type GitHubRelease = {
  tag_name: string
  name: string | null
  body: string | null
  published_at: string
  draft: boolean
  prerelease: boolean
  assets: GitHubAsset[]
}

// "0.1.10" must beat "0.1.9", so compare numerically rather than as strings.
function isNewer(candidate: string, current: string) {
  const parse = (v: string) => v.replace(/^v/, '').split('.').map(n => parseInt(n, 10) || 0)
  const [a, b] = [parse(candidate), parse(current)]
  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    const diff = (a[i] ?? 0) - (b[i] ?? 0)
    if (diff !== 0) return diff > 0
  }
  return false
}

export async function GET(
  _request: Request,
  { params }: { params: { target: string; arch: string; version: string } },
) {
  const platform = `${params.target}-${params.arch}`
  if (!SUPPORTED.has(platform)) {
    return new NextResponse(null, { status: 204 })
  }

  const response = await fetch(`https://api.github.com/repos/${REPO}/releases/latest`, {
    headers: { Accept: 'application/vnd.github+json' },
    next: { revalidate: CACHE_SECONDS },
  })
  if (!response.ok) {
    return NextResponse.json({ error: 'could not reach the release feed' }, { status: 502 })
  }

  const release: GitHubRelease = await response.json()
  if (release.draft || release.prerelease) {
    return new NextResponse(null, { status: 204 })
  }

  const latest = release.tag_name.replace(/^v/, '')
  if (!isNewer(latest, params.version)) {
    return new NextResponse(null, { status: 204 })
  }

  // Tauri installs from the zipped MSI and refuses to run it without a matching
  // signature, so an incomplete release is treated as no release at all.
  const bundle = release.assets.find(a => a.name.endsWith('.msi.zip'))
  const signatureAsset = release.assets.find(a => a.name.endsWith('.msi.zip.sig'))
  if (!bundle || !signatureAsset) {
    return new NextResponse(null, { status: 204 })
  }

  const signatureResponse = await fetch(signatureAsset.browser_download_url, {
    next: { revalidate: CACHE_SECONDS },
  })
  if (!signatureResponse.ok) {
    return NextResponse.json({ error: 'could not read the release signature' }, { status: 502 })
  }

  return NextResponse.json(
    {
      version: latest,
      notes: release.body?.trim() || `Nidalee ${latest}`,
      pub_date: release.published_at,
      url: bundle.browser_download_url,
      signature: (await signatureResponse.text()).trim(),
    },
    { headers: { 'Cache-Control': `public, s-maxage=${CACHE_SECONDS}, stale-while-revalidate=60` } },
  )
}
