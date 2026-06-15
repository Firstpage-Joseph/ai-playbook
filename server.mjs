import { createReadStream } from 'node:fs'
import { stat } from 'node:fs/promises'
import { createServer } from 'node:http'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const host = '0.0.0.0'
const port = Number.parseInt(process.env.PORT || '4173', 10)
const root = path.join(path.dirname(fileURLToPath(import.meta.url)), 'dist')
const indexFile = path.join(root, 'index.html')

const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
}

async function resolveFile(url) {
  const pathname = decodeURIComponent(new URL(url, 'http://localhost').pathname)
  const relativePath = pathname.replace(/^\/+/, '')
  const candidate = path.resolve(root, relativePath)

  if (candidate !== root && !candidate.startsWith(`${root}${path.sep}`)) {
    return null
  }

  try {
    const info = await stat(candidate)
    if (info.isFile()) return candidate
  } catch {
    // Unknown routes are handled by the SPA entry point.
  }

  return indexFile
}

const server = createServer(async (request, response) => {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    response.writeHead(405, { Allow: 'GET, HEAD' })
    response.end()
    return
  }

  try {
    const file = await resolveFile(request.url || '/')

    if (!file) {
      response.writeHead(400)
      response.end('Bad request')
      return
    }

    const info = await stat(file)
    const extension = path.extname(file).toLowerCase()

    response.writeHead(200, {
      'Content-Type': contentTypes[extension] || 'application/octet-stream',
      'Content-Length': info.size,
      'Cache-Control': extension === '.html'
        ? 'no-cache'
        : 'public, max-age=31536000, immutable',
    })

    if (request.method === 'HEAD') {
      response.end()
      return
    }

    createReadStream(file).pipe(response)
  } catch (error) {
    console.error(error)
    response.writeHead(500)
    response.end('Internal server error')
  }
})

server.listen(port, host, () => {
  console.log(`Static site listening on http://${host}:${port}`)
})
