"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Auth = void 0;
require("core-js/modules/es.promise.js");
var _authingNodeSdk = require("authing-node-sdk");
const config = require('./config/index');
class Auth {
  constructor() {
    console.log(config.appId);
  }
  async authAccount(accesstoken) {
    let authenticationClient = new _authingNodeSdk.AuthenticationClient({
      appId: config.appId,
      appSecret: config.appSecret,
      appHost: config.appHost,
      redirectUri: config.redirectUri,
      protocol: "oidc"
    });
    var token = accesstoken.split(" ")[1];
    console.log(token);
    if (token != null) {
      var result = await authenticationClient.introspectToken(token);
      return result;
    } else {
      return "";
    }
  }
}
exports.Auth = Auth;
//# sourceMappingURL=auth.js.map