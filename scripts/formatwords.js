/* eslint-disable */
const path = require('path')
const fs = require('fs/promises')

fs.readFile(path.resolve(__dirname, './words'), 'utf-8')
.then(content => {
    console.log()

    const wordRows = content.split('\n').filter(r => r.trim() && !r.startsWith('-'))
    wordRows.sort()
    const oldLength = wordRows.length
    const duplicateCount = oldLength - new Set(wordRows).size
    console.log('重复单词数量', duplicateCount)

    const wordConfigs = wordRows.map(r => {
        const [ tanngo, kana ]　= r.split('#')
        return {
            t: tanngo.trim(), k: kana.trim()
        }
    })

    fs.writeFile(path.resolve(__dirname, '../src/meta/meta-word.json'), JSON.stringify(wordConfigs))
    console.log(wordConfigs)
})