const { QUERIES } = require('../constants/queries');
const { executeQuery } = require('../utils/db-utils');

//retrieves corresponding public key from table
const getPublicKey = async (user) => {
    
    try {
        const result = await executeQuery(QUERIES.SIGN_IN.EXTRACT_PUBLICKEY, [
            user,
        ]);

        return result[0].public_key; 
    } catch (e) {
        throw new Error('username is not present');
    }
};

const getUserMetadata = async (user) => {
    
    try {
        const result = await executeQuery(QUERIES.SIGN_IN.EXTRACT_METADATA, [
            user,
        ]);

        return result; 
    } catch (e) {
        throw new Error('username is not present');
    }
};

module.exports = {
    getPublicKey,
    getUserMetadata
};
