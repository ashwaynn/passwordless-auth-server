const { ERR_MESSAGES } = require('../constants/app-constants');
const { QUERIES } = require('../constants/queries');
const { User } = require('../Interfaces/AppInterfaces');
const { ResponseObject } = require('../Interfaces/ResponseObjects');
const { executeQuery } = require('../utils/db-utils');

/**
 * This method returns a list of all users present in the DB .
 * @param {string} decodeduserRole
 */
const listUsers = async (decodeduserRole) => {
    const responseObject = new ResponseObject();
    try {
        if(decodeduserRole === "Admin"){
            const result = await executeQuery(QUERIES.ADMIN.LIST_USERS);     
            responseObject.isSuccess = true;
            responseObject.payload = result;
            return responseObject;
        }else{
            throw new Error("Not Authorized");
        }
    } catch (e) {
        if (e.message === "Not Authorized")
            throw new Error("Not Authorized");
        else
            throw new Error("Internal server error");
    }
};

/**
 * This method updates a User's role in the DB .
 * @param {string} username
 * @param {string} userRole
 * @param {string} decodeduserRole
 */
const adminUpdatesUser = async (username, userRole, decodeduserRole) => {
    const responseObject = new ResponseObject();
    try {
        if(decodeduserRole === "Admin"){
            const result = await executeQuery(QUERIES.ADMIN.ADMIN_UPDATES_USER, [
                userRole,
                username
            ]);     
            responseObject.isSuccess = true;
            //responseObject.payload = result;
            return responseObject;
        }else{
            throw new Error("Not Authorized");
        }
    } catch (e) {
        if (e.message === "Not Authorized")
            throw new Error("Not Authorized");
        else
            throw new Error("Internal server error");
    }
};

/**
 * This method deletes a User in the DB .
 * @param {string} username
 * @param {string} decodeduserRole
 */
const adminDeletesUser = async (username, decodeduserRole) => {
    const responseObject = new ResponseObject();
    try {
        if(decodeduserRole === "Admin"){
            const result = await executeQuery(QUERIES.ADMIN.ADMIN_DELETES_USER, [
                username,
            ]);     
            responseObject.isSuccess = true;
            //responseObject.payload = result;
            return responseObject;   
        }else{
            throw new Error("Not Authorized");
        }
    } catch (e) {
        if (e.message === "Not Authorized")
            throw new Error("Not Authorized");
        else
            throw new Error("Internal server error");
    }
};

module.exports = {
    listUsers,
    adminUpdatesUser,
    adminDeletesUser
};