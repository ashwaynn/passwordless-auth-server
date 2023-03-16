const QUERIES = {
    USERS: {
        CREATE_USER: `INSERT INTO users (user_name, public_key, meta_data) VALUES (?, ?, ?)`,
        CHECK_USERNAME: `SELECT EXISTS(SELECT 1 FROM users WHERE user_name = ?) as is_available`,
        UPDATE_USER: 'UPDATE user meta_data = ? WHERE user_name = ?',
    },
    SIGN_IN: {
        EXTRACT_PUBLICKEY: 'SELECT public_key FROM users WHERE user_name = ?',
        EXTRACT_METADATA: 'SELECT user_role, meta_data FROM users WHERE user_name = ?'
    }
};

module.exports = { QUERIES };
