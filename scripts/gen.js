/* eslint-disable */
const path = require('path')
const fs = require('fs')
const markdownIt = require('markdown-it')
const markdownItMeta = require('markdown-it-meta')

const kinds = ['project', 'framework', 'language', 'knowledge']
const root = '../src/pages/'
const lastFiles = new Map()
const newDistance = 7 * 24 * 3600000
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
  
  const kindStruct = {
    name: upperHead(kind),
    id: kind,
    hasNew: false,
    children: null
  }

  kindStruct.children = dirs.map(dir => {

    const dirStruct = {
      name: upperHead(dir.replace(/^\d+-/g, '')),
      children: null
    }
    const colPath = path.join(__dirname, root, `/${kind}/${dir}`)
    // const stat = fs.statSync(colPath)
    const files = fs.readdirSync(colPath)
      .filter(fPath => !fPath.startsWith('_') && fPath.match(/(\.vue)|(\.md)$/))
      dirStruct.children = files.map(fPath => {
      const uniPath = `/${kind}/${dir}/${fPath}`
      let hasNew = false
      const lastFileMutDate = lastFiles.get(uniPath)
      const fileMTime = new Date(fs.statSync(path.join(__dirname, root, uniPath)).mtime).getTime()
      if (lastFileMutDate) {
        if (fileMTime <= lastFileMutDate) {
          // noop
        }
        else {
          hasNew = dirStruct.hasNew = true
          lastFiles.set(uniPath, fileMTime);
        }
      }
      else {
        hasNew = dirStruct.hasNew = true
        lastFiles.set(uniPath, fileMTime)
      }
      

      const title = fPath.replace(/\.\w+$/, '')

      return {
        name: upperHead(title),
        value: `${kind}/${dir}/${title}`.replace(/(\/index)$/, ''),
        hasNew,
        ...genMetaInfo(path.join(colPath, fPath))
      } 
    })
    
    dirStruct.children.sort((a, b) => new Date(b.date) - new Date(a.date))

    return dirStruct
  })
  .filter(dir => dir.children.length > 0)

  return kindStruct
}

function writeMetafile(content, filename) {
  const metaDir = path.resolve(__dirname, `../src/meta`)
  if (!fs.existsSync(metaDir)) {
    fs.mkdirSync(metaDir)
  }
  fs.writeFileSync(path.resolve(__dirname, `../src/meta/${filename}`), JSON.stringify(content, null, 2), 'utf-8')
}

(function gen() {
  try {
    const lastfilesUri = path.resolve(__dirname, './lastfiles')
    const lastFilesStr = fs.readFileSync(lastfilesUri, 'utf-8')
    lastFilesStr.split('\n').forEach(row => {
      const [date, name] = row.split('|')
      lastFiles.set(name, Number(date))
    })
  }
  catch {

  }
  console.log(lastFiles)
  const info = kinds.map(genStruct)


  const thisfileStr = Array.from(lastFiles.keys()).reduce((content, key) => {
    const row = lastFiles.get(key) + '|' + key
    return content + '\n' + row
  }, '')

  fs.writeFileSync(path.resolve(__dirname, `./lastfiles`), thisfileStr, 'utf-8')

  writeMetafile(info, 'short.json')
  return 
})()

