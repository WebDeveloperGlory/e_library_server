var mongoose = require('mongoose');
//Set up default mongoose connection
var Schema = mongoose.Schema;

var commentSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    authur: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    authurName: {
        type: String,
        required: true,
        default: "Hello"
    },
    book: {
        type: Schema.Types.ObjectId,
        ref: 'Book',
    }
    
});
// Compile model from schema
var Comment = mongoose.model('Comment', commentSchema );

module.exports = Comment;