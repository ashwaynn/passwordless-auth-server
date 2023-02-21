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
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DATABASE
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

app.get('/users', (req, res) => {
    sql_funcs.readUsersTable(connection).then(successObject =>{
        console.log("In app.js then(): ", successObject);
        res.json(successObject)    
    }).catch(err => {
        console.log("In app.js catch(): ", err);
        res.json(err);
    });;
});

app.get('/update-user', (req, res) => {
    res.sendFile('./views/update-user.html', {root: __dirname})
});



// POST Request handler

app.post('/create-user', async (req, res) => { 
    const data = [req.body.username, "Normal-User", req.body.publickey, "{\"data\":\"hi\"}"];
    sql_funcs.createUser(connection, data).then(successObject =>{
        console.log("In app.js then(): ", successObject);
        res.json(successObject)    
    }).catch(err => {
        console.log("In app.js catch(): ", err);
        res.json(err);
    });
});

app.post('/check-username', (req, res) => {
    sql_funcs.checkUserExists(connection, req.body.username).then(successObject =>{
        console.log("In app.js then(): ", successObject);
        res.json(successObject)    
    }).catch(err => {
        console.log("In app.js catch(): ", err);
        res.json(err);
    });
});

app.post('/update-user', (req, res) => {
    const data = [req.body.publickey, req.body.username];
    sql_funcs.updateUser(connection, data).then(successObject =>{
        console.log("In app.js then(): ", successObject);
        res.json(successObject)    
    }).catch(err => {
        console.log("In app.js catch(): ", err);
        res.json(err);
    });
});

app.post('/delete-user', (req, res) => {
    sql_funcs.deleteUser(connection, req.body.username).then(successObject =>{
        console.log("In app.js then(): ", successObject);
        res.json(successObject)    
    }).catch(err => {
        console.log("In app.js catch(): ", err);
        res.json(err);
    });
});



// 404 page

app.use((req, res) => {
    res.status(404).sendFile('./views/404.html', {root: __dirname});
});



/*
To-Do

res.send() / res.json() for all APIs
success obj { successState, data {}, errorMsg}
async await

*/

/*
app.post('/create-user', async (req, res) => { 
    const data = [req.body.username, "Normal-User", req.body.publickey, "{\"data\":\"hi\"}"];
    try{
        const successObject = await sql_funcs.createUser(connection, data);
        console.log("In app.js: ", successObject);
        res.json(successObject);
    }catch(err){
        console.log("Error!!!!!!");
    }
});
*/