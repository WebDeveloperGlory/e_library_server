var mongoose = require('mongoose');
//Set up default mongoose connection
var Schema = mongoose.Schema;

var bookSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    part: {
        type: Number,
        default: 1
    },
    sympnosis: {
        type: String,
        default: 'A lorem ipsum absdbjk asn n  shf akfd as fbsa fh d,   jafdhsbv,sdajf  jhjfbdsakfa bjw fhasdb fla j n ldas jdbj wdkl jb  jbshadbklf  havhj  h ,s fjsdabajdanl a hba n lnu'
    },
    author: {
        type: String,
        default: 'Emiya Shirou'
    },
    rating: {
        type: Number,
        default: 8.2
    },
    readLink: {
        type: String,
        // required: true
    },
    genres: {
        type: Array,
    },
    currentlyReading: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],
    bookSize: {
        type: Number,
        default: 2
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    }
});
// Compile model from schema
var Book = mongoose.model('Book', bookSchema );

module.exports = Book;