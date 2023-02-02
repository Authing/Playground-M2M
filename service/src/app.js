import { Auth } from "./auth.js";

const express = require("express");
const app = express();

const cors=require("cors");

var quertstring = require("querystring");

var { expressjwt: jwt } = require("express-jwt");

const auth = new Auth();



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
  if (result.scope.split(" ").includes("FACE:call")) {
    res.status(200).send("FACE");
  } else {
    res.status(200).send("not authorize");
  }
});

app.get("/hello",(req,res)=>{
  res.status(200).send("hello");
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

  if (result.scope.split(" ").includes("GENDER:call")) {
    res.status(200).send("GENDER");
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

  if (result.scope.split(" ").includes("OBJECT:call")) {
    res.status(200).send("OBJECT");
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

  if (result.scope.split(" ").includes("ACTION:call")) {
    res.status(200).send("ACTION");
  } else {
    res.status(200).send("not authorize");
  }
});

app.listen(3001, () => {
  console.log("app listening on port 3001");
});
