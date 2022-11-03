const mongoose = require('mongoose');


const mongoURI = "mongodb+srv://m001-student:m001-mongodb-basics@sandbox.1tynyfo.mongodb.net/todo-list";

const connectToMongo = ()=>{
    mongoose.connect(mongoURI, ()=>{
        console.log("Connected to Mongo successfully")
    })
}

module.exports = connectToMongo;