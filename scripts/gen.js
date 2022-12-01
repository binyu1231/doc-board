/* eslint-disable */
const path = require('path')
const fs = require('fs')
const markdownIt = require('markdown-it')
const markdownItMeta = require('markdown-it-meta')

const kinds = ['project', 'framework', 'language', 'knowledge']
const root = '../src/pages/'

function toDouble(n) {
  return n < 10 ? `0${n}` : `${n}`
}

function upperHead(str) {
  return str[0].toUpperCase() + str.substring(1).replace(/[-_](\w)/g, (_, c) => ` ${c.toUpperCase(c)}`)
}

function genMetaInfo(filePath) {
  const mdtext = fs.readFileSync(filePath, 'utf-8')
  const md = markdownIt()
  md.use(markdownItMeta)
  // try {
  const divider = '---'
  const secondDivideIndex = mdtext.replace(divider, '').indexOf(divider)
  const text = mdtext.substring(0, secondDivideIndex + divider.length * 2)

  md.render(text)
  // }
  // catch (e) {
  //   console.error(e)
  // }

  const d = new Date(md.meta.date)
  const dateString = md.meta.date ? `${d.getFullYear()}-${toDouble(d.getMonth() + 1)}-${toDouble(d.getDate())}` : ''

  const meta = {
    ...md.meta,
    date: dateString,
  }

  if (md.meta.title) {
    meta.name = md.meta.title
  }

  return meta
}

function genStruct(kind) {

  const kindPath = path.join(__dirname, root, kind)

  const dirs = fs.readdirSync(kindPath)
  
  return {
    name: upperHead(kind),
    id: kind,
    children: dirs.map(dir => {
      const colPath = path.join(__dirname, root, `/${kind}/${dir}`)
      // const stat = fs.statSync(colPath)
      const files = fs.readdirSync(colPath).filter(fPath => fPath.match(/(\.vue)|(\.md)$/))
      const children = files.map(fPath => {
        const title = fPath.replace(/\.\w+$/, '')
        return {
          name: upperHead(title),
          value: `${kind}/${dir}/${title}`.replace(/(\/index)$/, ''),
          ...genMetaInfo(path.join(colPath, fPath))
        } 
      })
      
      children.sort((a, b) => new Date(b.date) - new Date(a.date))

      return {
        name: upperHead(dir.replace(/^\d+-/g, '')),
        children
      }
    })
  }
}

function writeMetafile(content, filename) {
  fs.writeFileSync(path.resolve(__dirname, `../src/meta/${filename}`), JSON.stringify(content, null, 2), 'utf-8')
}

(function gen() {
  const info = kinds.map(genStruct)
  writeMetafile(info, 'short.json')
  console.log(JSON.stringify(info, null, 2))
})()

