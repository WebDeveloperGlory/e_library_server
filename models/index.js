var mongoose = require('mongoose');
//Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1/e_library';
// var mongoDB = 'mongodb+srv://gloryumuerri223:Web351Developer.72@cluster0.kj1tjrm.mongodb.net/e_lib_server?retryWrites=true&w=majority';
mongoose.connect(mongoDB, { useNewUrlParser: true }).then(() => console.log("connected to mongoDB atlas"));
 //Get the default connection
var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

mongoose.set('debug', true);
mongoose.Promise = Promise;

module.exports.Book = require('./Book');
module.exports.User = require('./User');
module.exports.Comment = require('./Comment');