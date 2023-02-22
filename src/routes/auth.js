const { ROUTES } = require("../constants/route-constants");

const { Router } = require("express");

const authRouter = Router();

authRouter.get(ROUTES.AUTH.SIGN_UP, (req, res) => {
  res.send("Hello");
});

authRouter.post(ROUTES.AUTH.SIGN_IN, (req, res) => {
  res.send("Hello");
});

module.exports = {
  authRouter,
};
