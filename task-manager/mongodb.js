// CRUD 
// C:/Users/USER/mongodb/bin/mongod.exe --dbpath=/Users/USER/mongodb-data

const {MongoClient, ObjectId } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) =>{
    if (error){
        return console.log(error)
    } 
    
    const db = client.db(databaseName)

    db.collection('tasks').deleteOne({
        _id: new ObjectId("63736e56ddca75112d121b06")
    }).then((result)=>{
        console.log(result)
    }).catch((err) =>{
        console.log(err)
    })

    db.collection('tasks').find({}).forEach((e)=>{
        console.log(e)
    })

})