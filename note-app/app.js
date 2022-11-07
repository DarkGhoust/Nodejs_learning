
const notes = require('./notes.js')
const chalk = require('chalk')
const yargs = require('yargs')

yargs.version('1.1.0')

//Adding a note
yargs.command('add', 'Add new note', {
        title: {
            describe: 'Note tilte',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },(argv) => {
        notes.addNote(argv.title, argv.body)
    }
).help()

//REmoving a note
yargs.command('remove', 'Remove note', {
        title: {
            describe: 'Note tilte',
            demandOption: true,
            type: 'string'
        },
    },(argv) => {
        notes.removeNote(argv.title)
    }
).help()
//List  a note
yargs.command('list', 'List of notes', () =>{
    notes.getList()
}
).help()

//Read a note
yargs.command('read', 'Read a note', {
    title: {
        describe: 'Note tilte',
        demandOption: true,
        type: 'string'
    },
},(argv) => {
    notes.readNote(argv.title)
}
).help().argv