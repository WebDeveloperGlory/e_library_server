var express = require('express'),
    app = express();

var bodyParser      = require('body-parser'),
    cors            = require('cors');
    passport        = require('passport'),
    cookieParser    = require('cookie-parser'),
    bcrypt          = require('bcryptjs'),
    localStrategy   = require('passport-local').Strategy,
    authRoutes      = require('./routes/auth'),
    bookRoutes      = require('./routes/book'),
    userRoutes      = require('./routes/user'),
    commentRoutes   = require('./routes/comment'),
    db              = require('./models');


// =======================================END OF IMPORT=======================================//
app.use(cors({
    origin: 'http://127.0.0.1:5173',
    credentials: true
}));
app.use(cors({
    origin: 'https://thunderous-bavarois-a8f0ad.netlify.app',
    credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Setting Up Passport
app.use(require('express-session')({
    secret: 'hehehe23ji2sdmayu2',
    saveUninitialized: false,
    cookie: { 
        // maxAge: 1000 * 60 * 60 * 24,
        secure: true,
        sameSite: 'none',
    },
    resave: false
}));
app.use(cookieParser('hehehe23ji2sdmayu2'));
app.use(passport.initialize());
app.use(passport.session());
require('./middleware/passportConfig')(passport)

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
})

// ============= TEST CODE ============= //
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
// =======================================END OF MIDLLEWARES=======================================//

app.get('/', (req, res) => {
    res.json({message: 'Make a post request to /api/auth/signup to create an account'})
})
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/users', userRoutes);
app.use('/api/books/:bookId/comments', commentRoutes)
// app.delete('/api/users', function(req, res) {
//     db.Book.remove({})
//         .then(function(done) {
//             res.json({message: `deleted all Successfully`});
//         }).catch(function(err) {console.log(err)});
// });

var PORT = 8081;
app.listen(process.env.PORT || PORT, function() {
    console.log(`App is running on port ${PORT}`)
});
