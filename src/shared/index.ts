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