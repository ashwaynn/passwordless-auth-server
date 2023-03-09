const dotenv = require('dotenv');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
dotenv.config();
var getPem = require('rsa-pem-from-mod-exp');


const lel = {"modulus":"tqUN2PhK1pEHfw1cLELtud7mNdTCYcOphL5PcijANV1nO3C98fl/9VOT69ivcBGMc4gFgrHARHuThIJqSSIq2DIbMD6i6cp/rhqr9dneiaVzHoLGWnrNx8QuNGS63nm/dDn+G6us4nZW6IqcvSFwDvaBcYF8K4BzYrIh8K7sMlk=","exponent":"AQAB"}

var pem = getPem(lel.modulus, lel.exponent);


async function createNonce(length = 16) {
    try {
      const randomBytes = await crypto.randomBytes(length);
      const nonce = randomBytes.toString('hex');
      return nonce;
    } catch (error) {

      throw new Error('Failed to create nonce');
    }
  }




async function ChallengeGeneration(username) {
  try {
    const timestamp = await Date.now();
    const challenge = `${username}:${await createNonce()}:${timestamp}`;
    const signature = await SignatureGeneration(challenge);
    return { signature, challenge };
  }
  catch(e){
    throw new Error('Error generating challenge or signature');
  }
}

//creation of signature
async function SignatureGeneration(challenge){  
  try {
    const hmac = crypto.createHmac('sha256', process.env.SECRET_KEY);
    hmac.update(challenge);                                                
    const signature = hmac.digest('hex');
    return signature;
  } catch(e){
    throw new Error('Error generating signature');
  }
}




//verification of response
async function decryptResponse(response, challenge) {
  try {
    const isVerified = crypto.verify(
      "sha256",
      Buffer.from(challenge),
      {
        key: pem,
      },
      Buffer.from(response, "base64")
    );
      
    return isVerified;
  } catch (error) {
    throw new Error('Error verifying challenge');
  }
}


//authentication
async function Authentication(response, signature, challenge){
      try {
      const [username, , timestamp] = challenge.split(':').map(e => isNaN(e) ? e : parseInt(e));  


      //edit the code to send the publicKey once signup has been implemented
      const isVerified = await decryptResponse(response, challenge);
      
        //creation of signature to verify
        if (isVerified){
          const hmac2 = crypto.createHmac('sha256', process.env.SECRET_KEY);
          hmac2.update(challenge);    
          const signature2 = hmac2.digest('hex'); 
          
          
        //verification of signature  
        if (signature === signature2) {
          if((Date.now() - timestamp) < 60*1000)
           {      
                const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
                return {token, username};
           }
           else {
            throw new Error('Timestamp is invalid');
          }
        } else {
          throw new Error('signature verification failed');
      }
      }} catch (error) {
        throw new Error('invalid authentication');
      }       
  }


module.exports = {
  ChallengeGeneration,
  SignatureGeneration,
  Authentication,
};
