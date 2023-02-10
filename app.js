const express = require('express');

const app = express();
app.listen(3000);


// Middleware to parse form data into a useable format

app.use(express.urlencoded({ extended: true }));



// GET Request handlers

app.get('/sign-in', (req, res) => {
    res.sendFile('./views/sign-in.html', {root: __dirname});
});


app.get('/welcome', (req, res) => {
    res.sendFile('./views/welcome.html', {root: __dirname});
});



// POST Request handler

app.post('/sign-in', (req, res) => {
    console.log("Contents of the form: ", req.body);
    res.redirect('/welcome');
});



// 404 page

app.use((req, res) => {
    res.status(404).sendFile('./views/404.html', {root: __dirname});
});