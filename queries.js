const QUERIES = {
    USERS: {
        CREATE_USER : `INSERT INTO users (user_name, user_role, public_key, meta_data) VALUES (?, ?, ?, ?)`,
        READ_ALL_USERS : `SELECT * FROM users`,
        READ_USER : `SELECT * FROM users WHERE user_name=?`,
        UPDATE_USER : `UPDATE users SET public_key =? WHERE user_name =?`,
        DELETE_USER : `DELETE FROM users WHERE user_name=?`
    }
};


module.exports = { QUERIES };