const publicKeyConversion = async (publicKey) => {
    const publicKeyString = JSON.stringify(publicKey);
    const publicKeyBase64 = Buffer.from(publicKeyString).toString('base64')
    return publicKeyBase64;
}

module.exports = {
    publicKeyConversion
};
  