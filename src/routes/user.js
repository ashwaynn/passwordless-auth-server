const { ROUTES } = require('../constants/route-constants');
const { Router } = require('express');
const { User } = require('../Interfaces/AppInterfaces');
const { checkUserExists, createUser } = require('../doa/user-data-controller');
const { ResponseObject } = require('../Interfaces/ResponseObjects');
const { ERR_MESSAGES } = require('../constants/app-constants');


const userRouter = Router();

userRouter.post(ROUTES.USER.CHECK_USERNAME, async (req, res) => {
    const { username } = req.body;
    try {
        const result = await checkUserExists(username);
        res.status(200).json(result);
    } catch (error) {
        const result = new ResponseObject(
            false,
            ERR_MESSAGES.GENERAL.INTERNAL_SERVER_ERR
        );
        res.status(500).json(result);
    }
});

userRouter.post(ROUTES.USER.CREATE_USER,async (req, res) => {
    const { username, publicKey, metaData } = req.body;

    const user = new User(username, publicKey, metaData);

    try {
        const result = await createUser(user);
        res.status(200).json(result);
    } catch (error) {
        const result = new ResponseObject(
            false,
            ERR_MESSAGES.GENERAL.INTERNAL_SERVER_ERR
        );
        res.status(500).json(result);
    }
});



// userRouter.post(ROUTES.USER.DELETE_USER,() => {
//     console.log('bleh')
//     next()
// },async (req, res) => {
//     const { username, publicKey, metaData } = req.body;

//     const user = new User(username, publicKey, metaData);

//     try {
//         const result = await createUser(user);
//         res.status(200).json(result);
//     } catch (error) {
//         const result = new ResponseObject(
//             false,
//             ERR_MESSAGES.GENERAL.INTERNAL_SERVER_ERR
//         );
//         res.status(500).json(result);
//     }
// });



module.exports = {
    userRouter,
};
