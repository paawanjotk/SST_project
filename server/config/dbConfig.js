const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost:27017/SST_project")

const connection = mongoose.connection

connection.on('connected' , ()=>{
    console.log('Connection Successful')
})
connection.on('error' , ()=>{
    console.log('Connection unsuccessful')
})