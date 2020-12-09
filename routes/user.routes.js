const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");
const { verifySignUp } = require("../middlewares");


module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess);

  app.get(
    "/api/test/user",
    [authJwt.verifyToken],
    controller.userBoard
  );

  app.get(
    "/api/test/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
  app.get("/api/users", controller.findAll);
  app.get("/api/user/user_id/:id", controller.findByUserID);
  app.put("/api/user/:id", controller.update);

  app.delete("/api/users/:id", controller.delete);

  
};