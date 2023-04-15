const { ROUTES } = require('../constants/route-constants');
const { Router } = require('express');
const { ResponseObject } = require('../Interfaces/ResponseObjects');
const { ERR_MESSAGES } = require('../constants/app-constants');
const { authenticateToken} = require('../middlewares/jwtverify');
const { listUsers, adminUpdatesUser, adminDeletesUser } = require('../doa/admin-doa');

const adminRouter = Router();

adminRouter.get(ROUTES.ADMIN.LIST_USERS, authenticateToken, async (req, res) => {
    try {
        //console.log("From admin.js, decodeduserRole", req.decodeduserRole);
        const result = await listUsers(req.decodeduserRole);
        res.status(200).json(result);
    } catch (error) {
        if (error.message === "Not Authorized"){
            const result = new ResponseObject(
                false,
                ERR_MESSAGES.GENERAL.AUTHORIZATION_FAILED
            );
            res.status(401).json(result);    
        }else{
            const result = new ResponseObject(
                false,
                ERR_MESSAGES.GENERAL.INTERNAL_SERVER_ERR
            );
            res.status(500).json(result);
        }
    }
});

adminRouter.put(ROUTES.ADMIN.ADMIN_UPDATES_USER, authenticateToken, async (req, res) => {
    const { username, userRole } = req.body;
    try {
        const result = await adminUpdatesUser(username, userRole, req.decodeduserRole);
        res.status(200).json(result);
    } catch (error) {
        if (error.message === "Not Authorized"){
            const result = new ResponseObject(
                false,
                ERR_MESSAGES.GENERAL.AUTHORIZATION_FAILED
            );
            res.status(401).json(result);    
        }else{
            const result = new ResponseObject(
                false,
                ERR_MESSAGES.GENERAL.INTERNAL_SERVER_ERR
            );
            res.status(500).json(result);
        }
    }
});

adminRouter.delete(ROUTES.ADMIN.ADMIN_DELETES_USER, authenticateToken, async (req, res) => {
    const { username } = req.body;
    try {
        const result = await adminDeletesUser(username, req.decodeduserRole);
        res.status(200).json(result);
    } catch (error) {
        if (error.message === "Not Authorized"){
            const result = new ResponseObject(
                false,
                ERR_MESSAGES.GENERAL.AUTHORIZATION_FAILED
            );
            res.status(401).json(result);    
        }else{
            const result = new ResponseObject(
                false,
                ERR_MESSAGES.GENERAL.INTERNAL_SERVER_ERR
            );
            res.status(500).json(result);
        }
    }
});


module.exports = {
    adminRouter,
};