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

//for accepting form data = help get the title snippet and body in create file and put it in an object that we can use it easily
app.use(express.urlencoded({ extended: true }));

//morgan a third party middleware
app.use(morgan('dev'));

//mongoose and mongo sandbox routes

//save the blog = blog.save(), find all the blogs = Blog.find(), find single blog based on id = Blog.findById('61888b371cd9364c941de695'), delete a blog = Blog.findByIdAndDelete(id). NOTE: they are acny .then .catch

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
});

app.post('/blogs', (req, res) => {
    const blog = new Blog(req.body);

    blog.save()
        .then((result) => {
            res.redirect('/blogs');
        })
        .catch((err) => {
            console.log(err)
        })
});

app.get('/blogs/create', (req, res) => {
    res.render('create', {title: 'Create'})
})

app.get('/blogs/:id', (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then((result) => {
            res.render('details', { blog: result, title: 'Blog Details' })
        })
        .catch((err) => {
            console.log(err)
        })
});

app.delete('/blogs/:id', (req, res) => {
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
        .then((result) => {
            res.json({ redirect: '/blogs' })
        })
        .catch((err) => {
            console.log(err)
        })
})

//redirect
// app.get('/about-me', (req, res) => {
//     res.redirect('/about')
// })

//404 Page
// express runs code top to bottom. position is important
// this code should stay at the bottom
app.use((req, res) => {
    res.status(404).render('404', {title: '404'})
})

// REQUEST TYPES
//GET requests to get a resource
//POST requests to create new data (eg a new blog)
//DELETE requests to delete data(eg. delete a blog)
//PUT request to update data (eg. update a blog)