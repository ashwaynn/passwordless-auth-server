const dotenv = require('dotenv');
const crypto = require('crypto');
dotenv.config();

async function createNonce(length = 16) {
    try {
      const randomBytes = await crypto.randomBytes(length);
      const nonce = randomBytes.toString('hex');
      return nonce;
    } catch (error) {
      //console.error('Error creating nonce:', error);
      throw new Error('Failed to create nonce');
    }
  }


const timestamp = Date.now();

async function ChallengeGeneration(username) {
    const challenge = `${username}:${await createNonce()}:${timestamp}`;
    const signature = await SignatureGeneration(challenge);
    return { signature, challenge };
}

//creation of signature
async function SignatureGeneration(challenge){  
    const hmac = crypto.createHmac('sha256', process.env.SECRET_KEY);
    hmac.update(challenge);                                                
    const signature = hmac.digest('hex');
    return signature;
}

//authentication
function Authentication(response, signature){
    //decryption of response
    try {
      decryptedChallenge = crypto.publicDecrypt(
        {
          key: process.env.PUBLIC_KEY,
          padding: crypto.constants.RSA_PKCS1_PADDING,
        },
        Buffer.from(response, 'base64')
      );
    } catch (error) {
      //console.error('Error decrypting challenge:', error);
      throw new Error('Error decrypting challenge:', error);
    }

      const hmac2 = crypto.createHmac('sha256', process.env.SECRET_KEY);
      hmac2.update(decryptedChallenge);    
      const signature2 = hmac2.digest('hex'); 
      
      if ((Date.now() - timestamp)< 60*1000)
          if(signature === signature2)                                                              
            { return true;
             }
        else { return false;}
}

module.exports = {
    ChallengeGeneration,
    SignatureGeneration,
    Authentication,
};

