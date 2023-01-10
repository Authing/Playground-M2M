import { AuthenticationClient } from "authing-node-sdk";
const config=require('./config/index');

export class Auth {

  constructor() {
    this.authenticationClient= new AuthenticationClient({
      appId: config.appId,
      appSecret: config.appSecret,
      appHost: config.appHost,
      redirectUri: config.redirectUri,
      protocol: "oidc",
    });
    console.log(config.appId);
  }

  async authAccount(accesstoken) {
  
    var token = accesstoken.split(" ")[1];
    console.log(token);
    if (token!=null) {
      var result = await this.authenticationClient.introspectToken(token);
      return result;
    } else {
      return "";
    }
  }

  async getUserInfo(accesstoken){
    var token = accesstoken.split(" ")[1];
    this.authenticationClient.setAccessToken(token);
    var result= await this.authenticationClient.getProfile({withCustomData:false,withIdentities:false,withDepartmentIds:false});

    return result;
  }

  async logout(accesstoken){
    var token=accesstoken.split(" ")[1];
    const success= this.authenticationClient.revokeToken(token);
    return success;
  }
}
