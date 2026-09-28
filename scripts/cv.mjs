#!/usr/bin/env node
/**
 * Gera os PDFs do currículo a partir de cv/cv-<lang>.html.
 *
 *   npm run cv:build    escreve public/cv-pt.pdf e public/cv-en.pdf
 *
 * Usa o Chrome ou o Edge instalados em modo headless, sem dependência extra.
 * Para apontar outro navegador, defina CHROME_PATH.
 */
import { existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { execFileSync } from 'node:child_process'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const LANGS = ['pt', 'en']

const CANDIDATES = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
].filter(Boolean)

const browser = CANDIDATES.find((path) => existsSync(path))
if (!browser) {
  console.error('Nenhum Chrome/Edge encontrado. Defina CHROME_PATH.')
  process.exit(1)
}

for (const lang of LANGS) {
  const source = pathToFileURL(join(root, 'cv', `cv-${lang}.html`)).href
  const output = join(root, 'public', `cv-${lang}.pdf`)
  execFileSync(browser, [
    '--headless=new',
    '--disable-gpu',
    '--no-pdf-header-footer',
    // Dá tempo da fonte do Google Fonts carregar antes de imprimir.
    '--virtual-time-budget=5000',
    `--print-to-pdf=${output}`,
    source,
  ], { stdio: 'ignore' })
  console.log(`  ${lang}: ${output}`)
}
