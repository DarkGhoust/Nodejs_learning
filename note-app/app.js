
const getNotes = require('./notes.js')
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

    },function(argv){
        console.log(`Title: ${argv.title}, Body: ${argv.body}`)
    }
).help()

//REmoving a note
yargs.command('remove', 'Remove note', function(){
    console.log('Remove a note')
}
).help()
//List  a note
yargs.command('list', 'List of notes', function(){
    console.log('List of notes')
}
).help()

//Read a note
yargs.command('read', 'Read a note', function(){
    console.log('Read a note')
}
).help().argv