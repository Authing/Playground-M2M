"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Auth = void 0;
require("core-js/modules/es.promise.js");
var _authingNodeSdk = require("authing-node-sdk");
var _dev = require("./dev.js");
class Auth {
  constructor() {}
  async authAccount(accesstoken) {
    let authenticationClient = new _authingNodeSdk.AuthenticationClient({
      appId: _dev.config.appId,
      appSecret: _dev.config.appSecret,
      appHost: _dev.config.appHost,
      redirectUri: _dev.config.redirectUri,
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