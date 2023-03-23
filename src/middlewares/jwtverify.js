const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).send("Authorization failed. No access token.");
    }
  
    //Verifying if the token is valid.
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        console.log(err);
        return res.status(403).send("Could not verify token");
      }
      const decodedToken = jwt.decode(token);
      req.decodeduserName = decodedToken.username;
      req.decodeduserRole = decodedToken.userRole;
    });
    next();
  };

  module.exports = {
    authenticateToken
};