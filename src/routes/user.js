const { ROUTES } = require('../constants/route-constants');
const { Router } = require('express');
const { User } = require('../Interfaces/AppInterfaces');
const { checkUserExists, createUser, updateUser, extractUser, DeleteUser } = require('../doa/user-data-controller');
const { ResponseObject } = require('../Interfaces/ResponseObjects');
const { ERR_MESSAGES } = require('../constants/app-constants');
const { authenticateToken} = require('../middlewares/jwtverify');
const {checkLoggedIn} = require('../middlewares/checklogin');

const userRouter = Router();

userRouter.get(ROUTES.USER.LOGGED_IN, checkLoggedIn, async (req, res) => {
    try {
        const result = await extractUser(req.decodeduserName, req.decodeduserRole);
        res.status(200).json(result);
    } catch (error) {
        const result = new ResponseObject(
            false,
            ERR_MESSAGES.GENERAL.INTERNAL_SERVER_ERR
        );
        res.status(500).json(result);
    }
});


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

userRouter.post(ROUTES.USER.CREATE_USER, async (req, res) => {
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


userRouter.put(ROUTES.USER.UPDATE_USER, authenticateToken, async (req, res) => {
    const {username, metadata} = req.body;
    try {
        const result = await updateUser(metadata, username, req.decodeduserName);
        res.status(200).json(result);
    } catch (error) {
        if ( error.message === 'Not authenticated to update info') {
        const result = new ResponseObject(
            false,
            ERR_MESSAGES.GENERAL.AUTHENTICATION_FAILED
        );
        res.status(401).json(result);
        }
        else {
            const result = new ResponseObject(
                false,
                ERR_MESSAGES.GENERAL.INTERNAL_SERVER_ERR
            );
            res.status(500).json(result);

        }
    }
});

userRouter.delete(ROUTES.USER.DELETE_USER, authenticateToken, async (req, res) => {
    
    const {username, encryptedusername} = req.body;
    try {
        const result = await DeleteUser(username, req.decodeduserName, encryptedusername);
        res.clearCookie('jwt').status(200).json(result);
    } catch (error) {
        const result = new ResponseObject(
            false,
            ERR_MESSAGES.GENERAL.INTERNAL_SERVER_ERR
        );
        res.status(500).json(result);
    }
});



module.exports = {
    userRouter,
};
