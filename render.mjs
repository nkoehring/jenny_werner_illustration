import { readFile, readdir, writeFile } from 'fs/promises'
import { basename, dirname, join } from 'path'
import * as Eta from 'eta'
import Markdown from 'markdown-it'

const __dirname = dirname(new URL(import.meta.url).pathname)
const srcDir = join(__dirname, 'src')
const targetDir = join(__dirname, 'dist')
const galleriesPath = join(__dirname, 'galleries')
const pagesPath = join(__dirname, 'pages')

function settingsPath(fileName) {
  return join(__dirname, 'settings', `${fileName}.json`)
}

async function readAllJSON(path, ext='.json') {
  const contents = {}
  const files = await readdir(path)

  for (const fileName of files) {
    if (fileName.endsWith(ext)) {
      const absPath = join(path, fileName)
      const key = fileName.slice(0, ext.length * -1)
      contents[key] = JSON.parse(await readFile(absPath, 'utf-8'))
    }
  }

  return contents
}

async function renderedPages() {
  const pages = await readAllJSON(pagesPath)
  const md = Markdown({
    html: true,
    breaks: true,
    linkify: true,
    typographer: true
  })

  Object.values(pages).forEach(p => p.body = md.render(p.body))
  return pages
}

async function render() {
  const cssVars = JSON.parse(await readFile(settingsPath('styles'), 'utf-8'))
  const page = JSON.parse(await readFile(settingsPath('page'), 'utf-8'))
  const menu = JSON.parse(await readFile(settingsPath('menu'), 'utf-8'))
  const galleryOptions = JSON.parse(await readFile(settingsPath('gallery'), 'utf-8'))
  const social = JSON.parse(await readFile(settingsPath('footer'), 'utf-8'))
  const gallery = await readAllJSON(galleriesPath)
  const pages = await renderedPages()

  Eta.configure({ views: srcDir })

  const output = await Eta.renderFile('./index', {
    cssVars, page, menu, galleryOptions, social, pages, gallery
  })

  const target = join(targetDir, 'index.html')
  await writeFile(target, output, err => {
    if (err) console.error('Whoops!', err)
    else console.log('success')
  })
}


render()
