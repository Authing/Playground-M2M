"use strict";

require("core-js/modules/es.promise.js");
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.string.includes.js");
var _auth = require("./auth.js");
var _dev = require("./dev.js");
const express = require("express");
const app = express();
const cors = require("cors");
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
    jwksUri: _dev.config.jwks
  }),
  audience: _dev.config.audience,
  issuer: _dev.config.issuer,
  algorithms: ["RS256"]
}).unless({
  path: [/^\/api\//]
});

//app.use(jwtCheck);
app.use(cors());
app.get("/api/face", async (req, res) => {
  var result = await auth.authAccount(req.headers.authorization);
  if (!result.active) {
    //accesstoken 已经过期
    res.status(200).send("accesstoken expired");
    return;
  }
  if (result.scope == "") {
    res.status(200).send("not authorize");
    return;
  }
  console.log(result.scope.split(' ').includes('face:call'));
  if (result.scope.split(" ").includes("face:call")) {
    res.status(200).send("face");
  } else {
    res.status(200).send("not authorize");
  }
});
app.get("/api/gender", async (req, res) => {
  var result = await auth.authAccount(req.headers.authorization);
  if (!result.active) {
    //accesstoken 已经过期
    res.status(200).send("accesstoken expired");
    return;
  }
  if (result.scope == "") {
    res.status(200).send("not authorize");
    return;
  }
  if (result.scope.split(" ").includes("gender:call")) {
    res.status(200).send("gender");
  } else {
    res.status(200).send("not authorize");
  }
});
app.get("/api/object", async (req, res) => {
  var result = await auth.authAccount(req.headers.authorization);
  if (!result.active) {
    //accesstoken 已经过期
    res.status(200).send("accesstoken expired");
    return;
  }
  if (result.scope == "") {
    res.status(200).send("not authorize");
    return;
  }
  if (result.scope.split(" ").includes("object:call")) {
    res.status(200).send("object");
  } else {
    res.status(200).send("not authorize");
  }
});
app.get("/api/action", async (req, res) => {
  var result = await auth.authAccount(req.headers.authorization);
  if (!result.active) {
    //accesstoken 已经过期
    res.status(200).send("accesstoken expired");
    return;
  }
  if (result.scope == "") {
    res.status(200).send("not authorize");
    return;
  }
  if (result.scope.split(" ").includes("action:call")) {
    res.status(200).send("action");
  } else {
    res.status(200).send("not authorize");
  }
});
app.listen(3000, () => {
  console.log("app listening on port 3000");
});
//# sourceMappingURL=app.js.map