const ROUTES = {
  BASE: "/api",
  AUTH: {
    BASE: "/auth",
    SIGN_UP: "/sign-up",
    SIGN_IN: "/sign-in",
  },
  USER: {
    BASE: "/user",
    CREATE_USER: "/create-user",
    CHECK_USERNAME: "/check-username",
    UPDATE_USER: "/update-user",
    DELETE_USER: "/delete-user",
  },
};

const API_ROUTES = {
  AUTH: `${ROUTES.BASE}${ROUTES.AUTH.BASE}`,
  USER: `${ROUTES.BASE}${ROUTES.USER.BASE}`,
};

module.exports = {
  ROUTES,
  API_ROUTES,
};