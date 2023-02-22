class User {
    username;
    publicKey;
    metaData;

    constructor(_username = '', _publicKey = '', _metaData = '') {
        this.username = _username;
        this.publicKey = _publicKey;
        this.metaData = _metaData;
    }
}

module.exports = {
    User,
};
