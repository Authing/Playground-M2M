"use strict";

var _auth = require("./auth.js");
const express = require("express");
const app = express();
var quertstring = require("querystring");
var {
  expressjwt: jwt
} = require("express-jwt");
const auth = new _auth.Auth();
var jwks = require("jwks-rsa");
var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://qd-awesome-app-demo.authing.cn/oidc/.well-known/jwks.json"
  }),
  audience: "637f3469b33a8ef36d2b03c5",
  issuer: "https://qd-awesome-app-demo.authing.cn/oidc",
  algorithms: ["RS256"]
}).unless({
  path: [/^\/api\//]
});
app.use(jwtCheck);
app.post("/api/login", (req, res) => {
  var result = auth.authAccount(req.headers.authorization);
  console.log(quertstring.stringify(result));
  res.send(result);
});
app.get("/article", (req, res) => {
  var ss = quertstring.stringify(req);
  console.log(ss);
  if (req.auth.scope.split(" ").includes("disk:call")) {
    res.send("disk info");
  } else {
    res.send("not authorized api");
  }
});
app.listen(3000, () => {
  console.log("app listening on port 3000");
});
//# sourceMappingURL=app.js.map