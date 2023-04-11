const express = require('express');
//const cors = require('cors');
const { ERR_MESSAGES } = require('./src/constants/app-constants');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');


const { API_ROUTES } = require('./src/constants/route-constants');
const { ResponseObject } = require('./src/Interfaces/ResponseObjects');
const { authRouter } = require('./src/routes/auth');
const { userRouter } = require('./src/routes/user');
const { dbConfig } = require('./src/utils/db-utils');
const { setCORSHeaders } = require('./src/middlewares/CORS');
const { adminRouter } = require('./src/routes/admin');


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
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cookieParser());

//app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request handlers

app.use(API_ROUTES.AUTH, authRouter);
app.use(API_ROUTES.USER, userRouter);
app.use(API_ROUTES.ADMIN, adminRouter);

// 404 page

app.use((req, res) => {
    res.status(404).json(
        new ResponseObject(false, ERR_MESSAGES.GENERAL.URL_NOT_AVAILABLE)
    );
});
