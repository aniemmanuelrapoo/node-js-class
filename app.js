const express = require('express');

//express app
const app = express();

//listen for requests
app.listen(3000);

app.get('/', (req, res) => {
    // res.send('<p>Home Page</p>');
    res.sendFile('./views/index.html', { root: __dirname })
})

app.get('/about', (req, res) => {
    // res.send('<p>About Page</p>');
    res.sendFile('./views/about.html', { root: __dirname })
})

//redirect
app.get('/about-me', (req, res) => {
    res.redirect('/about')
})

//404 Page
// express runs code top to bottom. position is important
// this code should stay at the bottom
app.use((req, res) => {
    res.status(404).sendFile('./views/404.html', { root: __dirname })
})