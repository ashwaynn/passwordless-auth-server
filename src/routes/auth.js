const { ROUTES } = require("../constants/route-constants");
const { Router } = require("express");
const { ResponseObject } = require('../Interfaces/ResponseObjects');
const { ERR_MESSAGES } = require('../constants/app-constants');
const { SignIn, GetChallenge } = require("../services/UserSignIn");
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
            ERR_MESSAGES.GENERAL.INTERNAL_SERVER_ERR,
        );
        res.status(500).json(result);
    }
});

authRouter.post(ROUTES.AUTH.SIGN_IN, async (req, res) => {
  const { response, signature, challenge } = req.body;
    try {
        const result = await SignIn(response, signature, challenge);
        console.log(result.payload.token);
        res.cookie('token', `${result.payload.token}`, { httpOnly: true, path: '/' }).status(200).json(result.payload.metaData);
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

module.exports = {
  authRouter,
};
