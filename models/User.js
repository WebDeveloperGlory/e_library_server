var mongoose                = require('mongoose');
//Set up default mongoose connection
var Schema = mongoose.Schema;

var userSchema = new Schema({
    email: {
        type: String
    },
    username: {
        type: String,
        required: true
    }, 
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "guest"
    },
    points: {
        type: Number,
        default: 0
    },
    currentlyBorrowed: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Book'
        }
    ],
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],
    read: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Book'
        }
    ]
});

// Compile model from schema
var User = mongoose.model('User', userSchema );

module.exports = User;