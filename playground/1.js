const fs = require('fs')

// const book = {
//     title: 'book name',
//     author: 'author of book'
// }

// const bookjson = JSON.stringify(book)

// fs.writeFileSync('1.json', bookjson)

const dataBuffer = fs.readFileSync('1.json')
const data = JSON.parse(dataBuffer.toString())
data.age = 51
data.name = "Sombrero"

fs.writeFileSync('1.json', JSON.stringify(data))


