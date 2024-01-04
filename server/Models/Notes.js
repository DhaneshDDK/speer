const mongoose = require('mongoose');

const notesSchema = new mongoose.Schema({
    id : {
        type : String,
        required : true
    },
    title : {
        type : String,
        required : true
    },
    content : {
        type : String,
        required : true
    },
    author : {
        type : String,
    },
    created_at : {
        type : Date,
        default : Date.now()
    },
    updated_at : {
        type : Date,
        default : Date.now()
    },
    tags : [
        {
            type : String,
            required : true
        }
    ]
},
 {
    timestamps : true,
 }
)

module.exports = mongoose.model('notes', notesSchema);