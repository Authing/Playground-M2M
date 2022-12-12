import { AuthenticationClient } from "authing-node-sdk";

export class Auth {
  constructor() {}

  async authAccount(accesstoken) {
    let authenticationClient = new AuthenticationClient({
      appId: "637c7118432f13b6e6738ea7",
      appSecret: "4022a6299068d158a4f12389ed9cf318",
      appHost: "https://qd-awesome-app-demo.authing.cn",
      redirectUri: "http://localhost:5000/auth/callback",
      protocol: "oidc",
    });
    var token = accesstoken.split(" ")[1];
    console.log(token);
    if (token!=null) {
      var result = await authenticationClient.introspectToken(token);
      return result;
    } else {
      return "";
    }
  }
}
