// create web server
const express = require('express');
const app = express();
const port = 3000;

// create middleware
const morgan = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

// set up middleware
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// set up view engine
app.set('view engine', 'ejs');

// set up routes
const commentsRoutes = require('./routes/comments');
app.use('/comments', commentsRoutes);

// root route
app.get('/', (req, res) => {
    res.render('home');
});

// error route
app.get('*', (req, res) => {
    res.render('error');
});

// listen for requests
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});