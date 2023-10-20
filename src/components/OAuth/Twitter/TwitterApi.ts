import OAuthApi from "../OAuthApi";
import { OAuthApiArgs } from "../OAuth.type";

const {
  VITE_TWITTER_STATE,
  VITE_TWITTER_CLIENT_ID,
  VITE_TWITTER_CODE_VERIFIER,
} = process.env;

class TwitterApi extends OAuthApi {
  static createRedirectUrl(redirectUri: string, stateId: string) {
    const rootUrl = process.env.VITE_TWITTER_AUTH_CODE_BASE_URL;
    const options = {
      redirect_uri: redirectUri,
      client_id: VITE_TWITTER_CLIENT_ID as string,
      state: VITE_TWITTER_STATE + stateId,
      response_type: "code",
      code_challenge: VITE_TWITTER_CODE_VERIFIER as string,
      code_challenge_method: "plain",
      scope: ["users.read", "offline.access"].join(" "),
    };
    const qs = new URLSearchParams(options).toString();
    return `${rootUrl}?${qs}`;
  }
  constructor({ token, navigate, setIsLoading, dispatch }: OAuthApiArgs) {
    super(token, navigate, dispatch, setIsLoading);

    this.login();
  }

  private login() {
    console.log("POST auth/twitter/login => ", this.token);
  }
}

export default TwitterApi;
