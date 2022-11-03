// this is for import from mongoose
const mongoose = require('mongoose');
const { Schema } = mongoose

const NotesSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true,
    },
    tag:{
        type: String,
        default: 'General'
    },
    date:{
        type: Date,
        default: Date.now
    }
})

const Note = mongoose.model('note',NotesSchema);
//this is for export
module.exports = Note;
