import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * `vite dev` serve só os estáticos: as funções de /api existem em produção
 * (Vercel), mas não aqui. Este plugin monta os mesmos handlers como middleware
 * do dev server, com um par req/res no formato que eles esperam, para o painel
 * e a página funcionarem em `npm run dev` batendo no Neon de verdade.
 *
 * Só roda em desenvolvimento; não entra no build.
 */
function devApiPlugin(secrets) {
  return {
    name: 'learning-dev-api',
    apply: 'serve',
    configureServer(server) {
      // Os handlers leem process.env; o .env do Vite não chega lá sozinho.
      for (const [key, value] of Object.entries(secrets)) {
        if (value && !process.env[key]) process.env[key] = value
      }

      server.middlewares.use(async (req, res, next) => {
        const url = new URL(req.url, 'http://localhost')
        if (!url.pathname.startsWith('/api/learning')) return next()

        const rest = url.pathname.slice('/api/learning'.length).replace(/^\/|\/$/g, '')

        try {
          const module = rest
            ? await server.ssrLoadModule('/api/learning/[id].js')
            : await server.ssrLoadModule('/api/learning/index.js')

          // Corpo JSON: o middleware do Vite não faz esse parse.
          let body
          if (req.method !== 'GET' && req.method !== 'HEAD') {
            const chunks = []
            for await (const chunk of req) chunks.push(chunk)
            const raw = Buffer.concat(chunks).toString('utf8')
            if (raw) {
              try {
                body = JSON.parse(raw)
              } catch {
                res.statusCode = 400
                res.setHeader('Content-Type', 'application/json')
                return res.end(JSON.stringify({ error: 'JSON inválido' }))
              }
            }
          }

          const query = Object.fromEntries(url.searchParams)
          if (rest) query.id = rest

          // Shim mínimo da API de resposta da Vercel.
          const shim = {
            status(code) {
              res.statusCode = code
              return shim
            },
            setHeader(name, value) {
              res.setHeader(name, value)
              return shim
            },
            json(payload) {
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify(payload))
            },
            end(payload) {
              res.end(payload)
            },
          }

          await module.default({ ...req, method: req.method, headers: req.headers, query, body }, shim)
        } catch (error) {
          server.config.logger.error(`[dev api] ${error.stack || error.message}`)
          if (!res.writableEnded) {
            res.statusCode = 500
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: 'Erro na função de desenvolvimento' }))
          }
        }
      })
    },
  }
}

/** Únicas variáveis que o dev server precisa enxergar. */
const SERVER_ONLY_KEYS = ['DATABASE_URL', 'ADMIN_TOKEN']

export default defineConfig(({ mode }) => {
  // loadEnv com prefixo '' lê o .env inteiro. Nada disso vai parar no bundle
  // (não entra em `define`), mas o objeto é reduzido na hora às duas chaves que
  // o plugin usa: assim uma secret futura no .env não fica à toa no processo.
  const all = loadEnv(mode, process.cwd(), '')
  const secrets = Object.fromEntries(
    SERVER_ONLY_KEYS.filter((key) => all[key]).map((key) => [key, all[key]])
  )

  return {
    plugins: [react(), devApiPlugin(secrets)],
    resolve: {
      alias: {
        '@': '/src',
        '@components': '/src/components',
        '@styles': '/src/styles',
        '@assets': '/src/assets',
      },
    },
  }
})
