const express = require('express');
const mysql = require('mysql');
const sql_funcs = require('./sql_queries')
require('dotenv').config();


const app = express();
const server_port = 3000;


app.listen(server_port, () => {
    console.log("\nPasswordless Auth Server listening on port", server_port);
});



// DB connection

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.MYSQL_PASS,
    database: 'passwordless_auth'
  })

/*

Ran the following SQL code in MySQL Workbench to avoid connection error when connecting from Node.js:

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '<password>';
flush privileges;

*/

connection.connect((err) => {
    if(err) throw err;
    console.log("Connection to DB succeeded");    
})



// Middleware to parse form data into a useable format

app.use(express.urlencoded({ extended: true }));



// GET Request handlers

app.get('/sign-in', (req, res) => {
    res.sendFile('./views/sign-in.html', {root: __dirname});
});


app.get('/welcome', (req, res) => {
    res.sendFile('./views/welcome.html', {root: __dirname});
});

app.get('/create-user', (req, res) => {
    res.sendFile('./views/create-user.html', {root: __dirname})
});

app.get('/check-username', (req, res) => {
    res.sendFile('./views/check-username.html', {root: __dirname});
});

app.get('/delete-user', (req, res) => {
    res.sendFile('./views/delete-user.html', {root: __dirname});
});

// POST Request handler

app.post('/sign-in', (req, res) => {
    console.log("Contents of the form: ", req.body);
    sql_funcs.read_user_details(connection, req.body.username);
    res.redirect('/welcome');
});

app.post('/create-user', (req, res) => {
    const data = [req.body.username, "Normal-User", req.body.publickey, "{\"data\":\"hi\"}"];
    sql_funcs.create_user(connection, data);
    console.log("User created!");
    res.redirect('/welcome');
});

app.post('/check-username', (req, res) => {
    sql_funcs.check_user_exists(connection, req.body.username).then(user_present => {
        if(user_present){
            console.log("Received value of user_present is", user_present);
            res.redirect('/check-username');
        }else{
            console.log("Received value of user_present is", user_present);
            res.redirect('/welcome');
        }
    }).catch(err => {
        console.log(err);
    });
});

app.post('/delete-user', (req, res) => {
    sql_funcs.delete_user(connection, req.body.username);
    res.redirect('/delete-user');
});

// 404 page

app.use((req, res) => {
    res.status(404).sendFile('./views/404.html', {root: __dirname});
});