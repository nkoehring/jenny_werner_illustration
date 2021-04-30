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
      width: '62rem',
      menuWidth: '18%',
      spacing: '2rem'
    },
    page: {
      url: 'https://jenillu.art',
      title: 'Jenny Werner Illustration',
      description: 'Jenny Werners Portfolio Page',
      footer: '© 2021 Jenny Werner Illustration'
    },
    menu: [
      { type: 'entry', name: 'About', url: '/about'},
      { type: 'entry', name: 'Contact', url: '/contact'},
      { type: 'separator' },
      { type: 'entry', name: 'Comic Art', url: '/comic-art'},
      { type: 'entry', name: 'Portraits', url: '/portraits'},
      { type: 'entry', name: 'Painting', url: '/painting'},
      { type: 'entry', name: 'Pixel Art', url: '/pixel-art'},
      { type: 'entry', name: 'Traditional', url: '/traditional'},
      { type: 'entry', name: 'Sewing', url: '/sewing'},
      { type: 'entry', name: 'Various', url: '/various'},
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
