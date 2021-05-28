import { readFileSync, writeFile } from 'fs'
import { dirname, join } from 'path'
import * as Eta from 'eta'

const __dirname = dirname(new URL(import.meta.url).pathname)
const srcDir = join(__dirname, 'src')
const targetDir = join(__dirname, 'dist')

async function render() {
  const cssVars = JSON.parse(readFileSync('./settings/styles.json', 'utf-8'))
  const page = JSON.parse(readFileSync('./settings/page.json', 'utf-8'))
  const menu = JSON.parse(readFileSync('./settings/menu.json', 'utf-8'))
  const galleryOptions = JSON.parse(readFileSync('./settings/gallery.json', 'utf-8'))
  const social = JSON.parse(readFileSync('./settings/footer.json', 'utf-8'))

  Eta.configure({ views: srcDir })

  const output = await Eta.renderFile('./index', {
    cssVars, page, menu, galleryOptions, social,
    gallery: {
      // the path is generated like `/assets/img/$galleryName/$name.jpg`
      'comic-art': [
        { alt: 'foo1', name: 'img01' },
        { alt: 'bar1', name: 'img02' },
        { alt: 'baz1', name: 'img03' },
        { alt: 'foo2', name: 'img04' },
        { alt: 'bar2', name: 'img05' },
        { alt: 'baz2', name: 'img06' },
        { alt: 'foo3', name: 'img01' },
        { alt: 'bar3', name: 'img02' },
        { alt: 'baz3', name: 'img03' },
        { alt: 'foo4', name: 'img04' },
        { alt: 'bar4', name: 'img05' },
        { alt: 'baz4', name: 'img06' },
        { alt: 'foo5', name: 'img01' },
        //{ alt: 'bar5', name: 'img02' },
        //{ alt: 'baz5', name: 'img03' },
        //{ alt: 'foo6', name: 'img04' },
        //{ alt: 'bar6', name: 'img05' },
        //{ alt: 'baz6', name: 'img06' },
        //{ alt: 'foo7', name: 'img01' },
        //{ alt: 'bar7', name: 'img02' },
        //{ alt: 'baz7', name: 'img03' },
        //{ alt: 'foo8', name: 'img04' },
        //{ alt: 'bar8', name: 'img05' },
        //{ alt: 'baz8', name: 'img06' }
      ],
      'portraits': [
      ],
      'painting': [
      ],
      'pixel-art': [
      ],
      'traditional': [
      ],
      'sewing': [
      ],
      'various': [
      ],
    }
  })

  const target = join(targetDir, 'index.html')
  await writeFile(target, output, err => {
    if (err) console.error('Whoops!', err)
    else console.log('success')
  })
}


render()
