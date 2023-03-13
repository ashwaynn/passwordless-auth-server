class User {
    username;
    userRole;
    publicKey;
    metaData;

    constructor(_username = '', _userRole = '', _publicKey = '', _metaData = '') {
        this.username = _username;
        this.userRole = _userRole;
        this.publicKey = _publicKey;
        this.metaData = _metaData;
    }
}

module.exports = {
    User,
};
