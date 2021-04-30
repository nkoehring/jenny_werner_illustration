import { writeFile } from 'fs'
import { dirname, join } from 'path'
import * as Eta from 'eta'

const __dirname = dirname(new URL(import.meta.url).pathname)
const srcDir = join(__dirname, 'src')
const targetDir = join(__dirname, 'dist')

async function render() {
  Eta.configure({ views: srcDir })

  const output = await Eta.renderFile('./index', {
    cssVars: {
      dark: '#06112d',
      bright: '#ffffff',
      shade: '#7d8391',
      width: '99rem',
      menuWidth: '18%',
      spacing: '3rem'
    },
    page: {
      // url: 'https://jenillu.art',
      url: 'https://sharp-colden-61c14c.netlify.app',
      title: 'Jenny Werner Illustration',
      description: 'Jenny Werners Portfolio Page',
      footer: '© 2021 Jenny Werner Illustration'
    },
    menu: [
      { type: 'page', name: 'About', slug: 'about'},
      { type: 'page', name: 'Contact', slug: 'contact'},
      { type: 'separator' },
      { type: 'gallery', name: 'Comic Art', slug: 'comic-art'},
      { type: 'gallery', name: 'Portraits', slug: 'portraits'},
      { type: 'gallery', name: 'Painting', slug: 'painting'},
      { type: 'gallery', name: 'Pixel Art', slug: 'pixel-art'},
      { type: 'gallery', name: 'Traditional', slug: 'traditional'},
      { type: 'gallery', name: 'Sewing', slug: 'sewing'},
      { type: 'gallery', name: 'Various', slug: 'various'},
      { type: 'separator' }
    ],
    social: [
      { name: 'discord', url: 'https://discord.gg/ZMr2TkerxJ' },
      { name: 'telegram', url: 'https://t.me/jennywernerillustrations' },
      { name: 'twitter', url: 'https://twitter.com/jennywernerillu' },
      { name: 'kofi', url: 'https://ko-fi.com/jennywernerillustration' },
      { name: 'instagram', url: 'https://www.instagram.com/jennywernerillustration' }
    ]
  })

  const target = join(targetDir, 'index.html')
  await writeFile(target, output, err => {
    if (err) console.error('Whoops!', err)
    else console.log('success')
  })
}


render()
