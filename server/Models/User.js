const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
   
    fullName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
  
    notes : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "notes",
    },

    sharedNotes : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "notes",
        }
    ],
  
    image: {
        type: String,
    }
},
{ timestamps: true }
)

module.exports = mongoose.model('user', userSchema);