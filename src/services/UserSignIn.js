const {checkUserExists} = require('../doa/user-data-controller');
const {ChallengeGeneration, Authentication} = require('../asym-auth-server-sdk/ChallengeResponse.js')
const { ResponseObject } = require('../Interfaces/ResponseObjects');
const { getPublicKey, getUserMetadata } = require('../doa/Sign-in-doa');



const GetChallenge = async (username) => {
    const responseObject = new ResponseObject();
    try {
      const userExists = await checkUserExists(username);
      
      if (!userExists.payload.is_available) {
        throw new Error('User does not exist');
      }
      else {
      const result = await ChallengeGeneration(username);

      responseObject.isSuccess = true;
      responseObject.payload = result;
      return responseObject;
      }
  } catch (e) {
      
      if (e.message === 'User does not exist') {
        throw new Error('User does not exist');
      } else {
        throw new Error('Error in challenge or signature generation');
      }
      
  }
};


const SignIn = async (response, signature, challenge) => {
    const responseObject = new ResponseObject();
    try {

      //const publicKey = await getPublicKey(username);
      //var pem = getPem(publicKey.modulus, publicKey.exponent);

      //change code to send publickey once signup is implemented
        const {token, username} = await Authentication(response, signature, challenge);


        const metaData = await getUserMetadata(username);

        responseObject.payload = {token, metaData};
        responseObject.message = 'login successful';
        responseObject.isSuccess = true;
        return responseObject;
            
      } catch (e) {
      if (e.message === 'username is not present') {
        throw new Error('username is not present');
      }

      else 
          throw new Error('Authentication failed');
  }
};

  
module.exports = {
    GetChallenge,
    SignIn
};
  
  