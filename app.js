const express = require('express');

//express app
const app = express();

//register view engine ejs
app.set('view engine', 'ejs');

//listen for requests
app.listen(3000);

app.get('/', (req, res) => {
    // res.send('<p>Home Page</p>');
    res.render('index')
})

app.get('/about', (req, res) => {
    // res.send('<p>About Page</p>');
    res.render('about')
})

//redirect
// app.get('/about-me', (req, res) => {
//     res.redirect('/about')
// })

app.get('/blogs/create', (req, res) => {
    res.render()
})

//404 Page
// express runs code top to bottom. position is important
// this code should stay at the bottom
app.use((req, res) => {
    res.status(404).render('404')
})