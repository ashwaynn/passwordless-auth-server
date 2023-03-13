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
            user.userRole,
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

module.exports = {
    checkUserExists,
    createUser,
};
