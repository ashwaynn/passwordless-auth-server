const {checkUserExists} = require('../doa/user-data-controller');
const {ChallengeGeneration, Authentication} = require('../asym-auth-server-sdk/ChallengeResponse.js')
const { ResponseObject } = require('../Interfaces/ResponseObjects');
const { getPublicKey, getUserMetadata } = require('../doa/Sign-in-doa');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
var getPem = require('rsa-pem-from-mod-exp');
dotenv.config();


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
        throw new Error('Internal Server Error');
      }
      
  }
};


const SignIn = async (response, signature, challenge) => {
    const responseObject = new ResponseObject();
    try {
      const [username1, , timestamp] = challenge.split(':').map(e => isNaN(e) ? e : parseInt(e));  
      const publicKey = await getPublicKey(username1);
      const data = JSON.parse(publicKey);
      var pem = getPem(data.modulus, data.exponent);

      //change code to send publickey once signup is implemented
        const username = await Authentication(response, signature, challenge, pem);
        const {dp, email, displayName, userRole} = await getUserMetadata(username);
        const token = jwt.sign({username, userRole}, process.env.JWT_SECRET, { expiresIn: '1h' });
        
        
        responseObject.payload = {username, displayName, email, dp, userRole};
        responseObject.message = 'login successful';
        responseObject.isSuccess = true;
        return {token, responseObject};
            
      } catch (e) {
      if (e.message === 'username is not present') {
        throw new Error('username is not present');
      }

      else 
          throw new Error('Authentication failed');
  }
};

const logOut = async (username) => {
  const responseObject = new ResponseObject();
  try {

    responseObject.isSuccess = true;
    responseObject.payload = result;
    return responseObject;
    }
 catch (e) {
    
    if (e.message === 'User does not exist') {
      throw new Error('User does not exist');
    } else {
      throw new Error('Error in challenge or signature generation');
    }
    
}
};


module.exports = {
    GetChallenge,
    SignIn,
    logOut
};
  
  