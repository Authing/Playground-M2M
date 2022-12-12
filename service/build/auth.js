"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Auth = void 0;
var _authingNodeSdk = require("authing-node-sdk");
class Auth {
  constructor() {}
  authAccount(accesstoken) {
    let authenticationClient = new _authingNodeSdk.AuthenticationClient({
      appId: "637c7118432f13b6e6738ea7",
      appSecret: "4022a6299068d158a4f12389ed9cf318",
      appHost: "https://qd-awesome-app-demo.authing.cn",
      redirectUri: "http://localhost:5000/auth/callback",
      protocol: "oidc"
    });
    var result = authenticationClient.introspectToken(accesstoken);
  }
}
exports.Auth = Auth;
//# sourceMappingURL=auth.js.map