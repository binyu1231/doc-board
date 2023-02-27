export function shuffle(collection: any[]) {
  const newColl = collection.slice()
  const len = newColl.length
  newColl.forEach((item, i) => {
    const rand = Math.floor(Math.random() * (len - i))
    newColl[i] = newColl[rand]
    newColl[rand] = item
  })

  return newColl
}

export function loadPublicJson<T = any>(path: string) {
  return new Promise<T>((resolve) => {
    const xhr = new XMLHttpRequest()
    xhr.onreadystatechange = () => {
      if (!xhr || xhr.readyState !== 4) return
      if (xhr.status === 0) return

      resolve(JSON.parse(xhr.response))

    }

    xhr.open('get', path)
    xhr.send()
  })
}

export function toDbl(n: any) {
  return Number(n) > 9 ? `${n}` : `0${n}`
}