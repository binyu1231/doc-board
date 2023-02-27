/* eslint-disable */
const path = require('path')
const fs = require('fs/promises')

const files = [
    'n4', 'n5'
]

const check = false

function genWordJson(fileName) {
    fs.readFile(path.resolve(__dirname, './' + fileName), 'utf-8')
    .then(content => {

        const wordRows = content.split('\n').filter(r => r.trim() && !r.startsWith('-'))
        wordRows.sort()
        const countMap = wordRows.reduce((cache, row) => {
            if (!cache.hasOwnProperty(row)) {
                cache[row] = 0
            }
            cache[row]++
            return cache
        }, {})

        const duplicateCount = Object.keys(countMap).filter(key => countMap[key] !== 1)

        if (check) console.log(fileName, '重复单词数量', duplicateCount)

        const wordConfigs = wordRows.map(r => {
            const [ kana, tanngo ]　= r.split('#')

            if (check && kana.trim() === tanngo.trim()) console.log(kana)

            return {
                t: tanngo.trim(), k: kana.trim()
            }
        })

        fs.writeFile(path.resolve(__dirname, `../public/meta-${fileName}.json`), JSON.stringify(wordConfigs))
        // console.log(wordConfigs)
    })
}

files.map(genWordJson)