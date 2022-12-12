import { AuthenticationClient } from "authing-node-sdk";
const config=require('./config/index');

export class Auth {
  constructor() {
  
    console.log(config.appId);
  }

  async authAccount(accesstoken) {
    let authenticationClient = new AuthenticationClient({
      appId: config.appId,
      appSecret: config.appSecret,
      appHost: config.appHost,
      redirectUri: config.redirectUri,
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
