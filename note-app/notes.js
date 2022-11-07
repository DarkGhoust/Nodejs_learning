const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, body) =>{
    const notes = loadNotes()
    const find = notes.find( (note) => note.title === title )

    if(!find){
        notes.push({
            title: title,
            body: body
        })
    
        saveNotes(notes)
        console.log(chalk.bgGreen('Added!'))
    } else{
        console.log(chalk.bgRed('Duplicate founded!'))
    }    
}

const readNote = (title) =>{
    const notes = loadNotes()
    const find = notes.find( (note) => note.title === title )

    debugger

    if(find){
        console.log(chalk.bgWhite(find.title))
        console.log(find.body)
    } else{
        console.log(chalk.bgRed('Not founded!'))
    }    
}

const removeNote = (title) => {
    const notes = loadNotes()
    const duplicate = notes.filter( (note) =>  note.title !== title )

    if(duplicate.length < notes.length){
        saveNotes(duplicate)
        console.log(chalk.bgGreen('Removed!'))
    } else{
        console.log(chalk.bgRed('Note not found!'))
    }    
}

const getList = () =>{
    const notes = loadNotes()
    console.log(chalk.bgGreen('Your list'))
    console.table(notes)
    
}


//Additional functions

const loadNotes = () =>{
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        return JSON.parse(dataBuffer.toString())
    } catch(e){
        return []
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    getList: getList,
    readNote: readNote
}