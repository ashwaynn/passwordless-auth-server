const express = require('express');
const { ERR_MESSAGES } = require('./src/constants/app-constants');
const cookieParser = require('cookie-parser');


const { API_ROUTES } = require('./src/constants/route-constants');
const { ResponseObject } = require('./src/Interfaces/ResponseObjects');
const { authRouter } = require('./src/routes/auth');
const { userRouter } = require('./src/routes/user');
const { dbConfig } = require('./src/utils/db-utils');
const { setCORSHeaders } = require('./src/middlewares/CORS');


require('dotenv').config();

const app = express();
const server_port = 3000;

app.listen(server_port, () => {
    console.log('\nPasswordless Auth Server listening on port', server_port);
});

// DB connection
dbConfig();

// Middleware to parse form data into a useable format
app.use(setCORSHeaders);

app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// GET Request handlers

app.use(API_ROUTES.AUTH, authRouter);
app.use(API_ROUTES.USER, userRouter);

// 404 page

app.use((req, res) => {
    res.status(404).json(
        new ResponseObject(false, ERR_MESSAGES.GENERAL.URL_NOT_AVAILABLE)
    );
});
