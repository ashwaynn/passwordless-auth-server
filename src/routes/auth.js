const { ROUTES } = require("../constants/route-constants");
const { Router } = require("express");
const { ResponseObject } = require('../Interfaces/ResponseObjects');
const { ERR_MESSAGES } = require('../constants/app-constants');
const { SignIn, GetChallenge, logOut } = require("../services/UserSignIn");
const http = require('http');

const authRouter = Router();

authRouter.get(ROUTES.AUTH.SIGN_UP, (req, res) => {
  res.send("Hello");
});

authRouter.post(ROUTES.AUTH.GET_CHALLENGE, async (req, res) => {
  const {username} = req.body;
  
    try {
        const result = await GetChallenge(username);
        res.status(200).json(result);
    } catch (error) {
        const result = new ResponseObject(
            false,
            error.message,
        );
        res.status(500).json(result);
    }
});

authRouter.post(ROUTES.AUTH.SIGN_IN, async (req, res) => {
  const { response, signature, challenge } = req.body;
    try {
        const {token, responseObject} = await SignIn(response, signature, challenge);
        const expirationTime = new Date(Date.now() + 3600 * 100);
        res.cookie("jwt", token, { httpOnly: true, path: '/', expires: expirationTime}).status(200).json(responseObject);
    } catch (error) {
      if (error.message === 'username is not present'){
        const result = new ResponseObject(
          false,
          ERR_MESSAGES.GENERAL.INTERNAL_SERVER_ERR,
      );
      res.status(500).json(result);

      }
      else {
        const result = new ResponseObject(
            false,
            ERR_MESSAGES.GENERAL.AUTHENTICATION_FAILED
        );
        res.status(401).json(result);
      }
    }
});

authRouter.get(ROUTES.AUTH.LOG_OUT, async (req, res) => {
    try {
      res.clearCookie('jwt').status(200).json({ message: 'Logout successful' });
      res.end();
    } catch (error) {
        const result = new ResponseObject(
            false,
            ERR_MESSAGES.GENERAL.INTERNAL_SERVER_ERR,
        );
        res.status(500).json(result);
    }
});


module.exports = {
  authRouter,
};
