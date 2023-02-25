const {checkUserExists} = require('../doa/user-data-controller');
const {ChallengeGeneration, Authentication} = require('../asym-auth-server-sdk/ChallengeResponse.js')
const { ResponseObject } = require('../Interfaces/ResponseObjects');

const GetChallenge = async (username) => {
    const responseObject = new ResponseObject();
    try {
      const userExists = await checkUserExists(username);
      if (!userExists) {
        throw new Error('User does not exist');
      }
      
      const result = await ChallengeGeneration(username);

      responseObject.isSuccess = true;
      responseObject.payload = result;
      return responseObject;
  } catch (e) {
      responseObject.isSuccess = false;
      responseObject.message = 'challenge generation is wrong';
      return responseObject;
  }
};

const SignIn = async (response,signature) => {
    const responseObject = new ResponseObject();
    try {
        const result = await Authentication(response, signature);
        console.log(result);
        responseObject.payload = result;
        responseObject.isSuccess = true;
        return responseObject;
      } catch (e) {
      responseObject.isSuccess = false;
      responseObject.message = 'authentication failed';
      return responseObject;
  }
};

  
module.exports = {
    GetChallenge,
    SignIn
};
  
  