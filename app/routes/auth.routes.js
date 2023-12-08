import middleware from "../middleware/index.js";
const { verifySignUp } = middleware;

import * as controller from "../controllers/auth.controller.js";

export default function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Authorization, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signUp",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted,
    ],
    controller.signUp
  );

  app.post("/api/auth/signIn", controller.signIn);
}
