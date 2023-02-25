const { ROUTES } = require("../constants/route-constants");
const { Router } = require("express");
const { ResponseObject } = require('../Interfaces/ResponseObjects');
const { ERR_MESSAGES } = require('../constants/app-constants');
const { SignIn, GetChallenge } = require("../services/UserSignIn");

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
            ERR_MESSAGES.GENERAL.INTERNAL_SERVER_ERR
        );
        res.status(500).json(result);
    }
});

authRouter.post(ROUTES.AUTH.SIGN_IN, async (req, res) => {
  const { response, signature } = req.body;
    try {
        const result = await SignIn(response, signature);
        res.status(200).json(result);
    } catch (error) {
        const result = new ResponseObject(
            false,
            ERR_MESSAGES.GENERAL.INTERNAL_SERVER_ERR
        );
        res.status(500).json(result);
    }
});

module.exports = {
  authRouter,
};
