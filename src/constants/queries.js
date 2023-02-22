const QUERIES = {
    USERS: {
        CREATE_USER: `INSERT INTO users (user_name, public_key, meta_data) VALUES (?, ?, ?)`,
        CHECK_USERNAME: `SELECT EXISTS(SELECT 1 FROM users WHERE user_name = ?) as is_available`,
    },
};

module.exports = { QUERIES };
