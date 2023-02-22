class ResponseObject {
    isSuccess;
    message;
    payload;

    constructor(_isSuccess = true, _message = '', _payload = {}) {
        this.isSuccess = _isSuccess;
        this.message = _message;
        this.payload = _payload;
    }
}

module.exports = {
    ResponseObject,
};
