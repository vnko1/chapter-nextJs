import OAuthApi from "../OAuthApi";
import { OAuthApiArgs, OAuthApiEndPoints } from "../OAuth.type";
import { googleOAuthApi, api, EndpointsEnum } from "@/axios";

class GoogleApi extends OAuthApi {
  private redirectUri: string | undefined;
  private googleOAuthGrandType = "authorization_code";
  private googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  private googleClientSecret = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET;

  constructor({
    token,
    redirectUri,
    navigate,
    setIsLoading,
    dispatch,
  }: OAuthApiArgs) {
    super(token, navigate, dispatch, setIsLoading);
    this.redirectUri = redirectUri;

    this.login();
  }

  private async google(googleIdToken: string) {
    return api.post(EndpointsEnum.GOOGLE_LOGIN, {
      idToken: googleIdToken,
    });
  }

  private async getGoogleAuthCode() {
    // console.log({
    //   a: this.googleOAuthGrandType,
    //   b: this.googleClientId,
    //   c: this.googleClientSecret,
    //   d: this.redirectUri,
    //   e: this.token,
    // });
    return googleOAuthApi.post(OAuthApiEndPoints.GOOGLE_TOKEN, null, {
      params: {
        grant_type: this.googleOAuthGrandType,
        client_id: this.googleClientId,
        client_secret: this.googleClientSecret,
        redirect_uri: this.redirectUri,
        code: this.token,
      },
    });
  }

  private login = this.tryCatchWrapper(async () => {
    const cred = await this.getGoogleAuthCode();
    const res = await this.google(cred.data.id_token);

    const { token, user } = res.data;

    user.nickName && this.handleData(user, { token });

    !user.nickName && this.redirect(user);

    return res;
  });
}

export default GoogleApi;
