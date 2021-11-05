const http = require('http');
const fs = require('fs');
const _ = require('lodash');

const server = http.createServer((req, res) => {
    //lodash random number
    const num = _.random(0, 20);
    console.log(num)

    //loadash run function once
    const greet = _.once(() => {
        console.log('hello')
    })
    greet()
    greet()

    //set header content type
    res.setHeader('Content-Type', 'text/html');

    let path = './views/';
    switch(req.url){
        case '/':
            path += 'index.html';
            res.statusCode = 200;
            break;
        case '/about':
            path += 'about.html';
            res.statusCode = 200;
            break;
        case '/about-me':
            //redirect
            res.statusCode = 301;
            res.setHeader('Location', '/about');
            res.end();
            break;
        default:
            path += '404.html';
            res.statusCode = 404;
            break;
    }

    //send an html file
    fs.readFile(path, (err, data) => {
        if(err){
            console.log(err)
            res.end();
        }else{
            // res.write(data);
            res.end(data);
        }
    })
});

server.listen(3000, 'localhost', () => {
    console.log('listing for request on port 3000')
})

//             Status Codes
//100 Range - information responses
//200 Range - success codes  200
//300 Range - codes for redirects   301
//400 Range - user or client error codes  404
//500 Range - server error codes