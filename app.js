const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog')

//express app
const app = express();

//connect to mongodb
const dbURI = 'mongodb+srv://rapoo:rapoo151@nodetuts.ycpjl.mongodb.net/node-tuts?retryWrites=true&w=majority'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err))

//register view engine ejs
app.set('view engine', 'ejs');

//listen for requests
// app.listen(3000);

//middleware is any code which runs on a server between getting a request and sending a response
// app.use((req, res, next) => {
//     console.log('new request made:');
//     console.log('host:', req.hostname);
//     console.log('path:', req.path);
//     console.log('method:', req.method);

//     //run the other code
//     next();
// })

//middleware and static files eg, css images that will be public
app.use(express.static('public'));

//morgan a third party middleware
app.use(morgan('dev'));

//mongoose and mongo sandbox routes

//save the blog = blog.save(), find all the blogs = Blog.find(), find single blog based on id = Blog.findById('61888b371cd9364c941de695')

//routes
app.get('/', (req, res) => {
    res.redirect('/blogs')
})

app.get('/about', (req, res) => {
    res.render('about', {title: 'About'})
})

//blog routes
app.get('/blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('index', { title: 'All Blogs', blogs: result })
        })
        .catch((err) => {
            console.log(err)
        })
})

//redirect
// app.get('/about-me', (req, res) => {
//     res.redirect('/about')
// })

app.get('/blogs/create', (req, res) => {
    res.render('create', {title: 'Create'})
})

//404 Page
// express runs code top to bottom. position is important
// this code should stay at the bottom
app.use((req, res) => {
    res.status(404).render('404', {title: '404'})
})