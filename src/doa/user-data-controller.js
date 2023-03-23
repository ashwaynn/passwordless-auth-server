const { ERR_MESSAGES } = require('../constants/app-constants');
const { QUERIES } = require('../constants/queries');
const { User } = require('../Interfaces/AppInterfaces');
const { ResponseObject } = require('../Interfaces/ResponseObjects');
const { executeQuery } = require('../utils/db-utils');
/**
 * This method checks whether the username is already exists in the table or not.
 * @param {string} username
 * @returns {ResponseObject} Result
 */
const checkUserExists = async (username) => {
    const responseObject = new ResponseObject();
    try {
        const result = await executeQuery(QUERIES.USERS.CHECK_USERNAME, [
            username,
        ]);
       

        responseObject.isSuccess = true;
        responseObject.payload = result[0];
        return responseObject;
    } catch (e) {
        responseObject.isSuccess = false;
        responseObject.message = ERR_MESSAGES.GENERAL.ERR_MSG;
        return responseObject;
    }
};

/**
 * This method creates a user with Normal User role.
 * @param {User} user
 */
const createUser = async (user) => {
    const responseObject = new ResponseObject();
    try {
        const result = await executeQuery(QUERIES.USERS.CREATE_USER, [
            user.username,
            JSON.stringify(user.publicKey),
            JSON.stringify(user.metaData)
        ]);
        responseObject.isSuccess = true;
        return responseObject;
    } catch (e) {
        responseObject.isSuccess = false;
        responseObject.message = ERR_MESSAGES.GENERAL.ERR_MSG;
        return responseObject;
    }
};

const extractUser = async (username, userRole) => {
    const responseObject = new ResponseObject();
    try {
        const result = await executeQuery(QUERIES.USERS.EXTRACT_USERINFO, [
            username,
        ]);

        const userInfo = JSON.parse(result[0].meta_data);
        const dp = userInfo.dp;
        const email = userInfo.email;
        const displayName = userInfo.displayName;

        return {dp, email, displayName, userRole, username}; 

        // responseObject.isSuccess = true;
        // responseObject.payload = result;
        // return responseObject;
    } catch (e) {
        responseObject.isSuccess = false;
        responseObject.message = ERR_MESSAGES.GENERAL.ERR_MSG;
        return responseObject;
    }
};



const updateUser = async (metaData, username, decodeduserName) => {
    const responseObject = new ResponseObject();
    try {
        if (username === decodeduserName) {
            await executeQuery(QUERIES.USERS.UPDATE_USER, [
            JSON.stringify(metaData),
            username,
        ]);
        }
        else {
            throw new Error('Not authenticated');
        }
        const result = await executeQuery(QUERIES.USERS.EXTRACT_USERINFO,[username]);
        responseObject.isSuccess = true;
        responseObject.payload = result;
        return responseObject;
    } catch (e) {
        if (e.message === 'Not authenticated')
            throw new Error('Not authenticated to update info');
        else
            throw new Error('Internal server error');
    }
};


module.exports = {
    checkUserExists,
    createUser,
    updateUser,
    extractUser
};
