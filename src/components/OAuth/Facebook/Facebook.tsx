import { FC, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import FacebookLogin, {
  SuccessResponse,
  FailResponse,
  ProfileSuccessResponse,
} from "@greatsumini/react-facebook-login";

import FacebookApi from "./FacebookApi";
import { useGetUrlParams } from "../hooks";
import { getUrlParams } from "../helpers";
import { useAppDispatch } from "@/redux/hooks";
import { SocialsProps, OAuthVariant } from "../OAuth.type";
import styles from "../OAuth.module.scss";

import { Icon, IconEnum } from "../../Icon";
import { UIbutton } from "@/components/Buttons";

const Facebook: FC<SocialsProps> = ({
  stateId,
  oAuthVariant,
  facebookPopupMode = false,
  text = "Enter with",
  iconSize = 24,
  buttonSize = "small",
  buttonColor = "secondary",
  buttonVariant = "outlined",
  dataAutomation = "oAuthButton",
  className,
}) => {
  const { currentLocation, error_message, pathname } = useGetUrlParams();
  const [facebookErrorMessage, setFacebookErrorMessage] = useState<
    string | null
  >(null);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useRouter();

  const [facebookCode, faceBookState] = getUrlParams(
    location.hash.slice(1),
    "access_token",
    "state"
  );
  const [facebookAuthCode, setFacebookAuthCode] = useState(facebookCode);

  console.log(facebookErrorMessage);

  useEffect(() => {
    if (error_message) {
      setFacebookErrorMessage(error_message);
      navigate.replace(pathname);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error_message]);

  useEffect(() => {
    if (
      oAuthVariant === OAuthVariant.FACEBOOK &&
      facebookAuthCode &&
      (faceBookState === process.env.NEXT_PUBLIC_FACEBOOK_STATE + stateId ||
        faceBookState ===
          process.env.NEXT_PUBLIC_FACEBOOK_STATE +
            process.env.NEXT_PUBLIC_BASE_OAUTH_STATE)
    ) {
      new FacebookApi({
        token: facebookAuthCode,
        navigate,
        setIsLoading,
        dispatch,
      });
      navigate.replace(pathname);
      setFacebookAuthCode("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [faceBookState, facebookAuthCode, oAuthVariant, stateId]);

  const onFacebookOauthSuccess = async (codeResponse: SuccessResponse) => {
    new FacebookApi({
      token: codeResponse.accessToken,
      navigate,
      setIsLoading,
      dispatch,
    });
  };

  const onFacebookOauthFail = (error: FailResponse) => {
    setFacebookErrorMessage(error.status);
  };

  const onFacebookOauthProfileSuccess = (response: ProfileSuccessResponse) => {
    console.log("Get Facebook Profile Success!", response);
  };
  return (
    <FacebookLogin
      appId={process.env.NEXT_PUBLIC_FACEBOOK_APP_ID}
      autoLoad={false}
      useRedirect={!facebookPopupMode}
      fields="name,email,picture"
      onSuccess={onFacebookOauthSuccess}
      onFail={onFacebookOauthFail}
      onProfileSuccess={onFacebookOauthProfileSuccess}
      dialogParams={{
        state: process.env.NEXT_PUBLIC_FACEBOOK_STATE + stateId,
        redirect_uri: currentLocation,
        response_type: "token",
      }}
      render={(renderProps) => (
        <UIbutton
          className={`${styles["oauth-btn"]} ${className}`}
          onClick={renderProps.onClick}
          dataAutomation={dataAutomation}
          fullWidth
          variant={buttonVariant}
          color={buttonColor}
          isLoading={isLoading}
          disabled={isLoading}
          size={buttonSize}
        >
          <Icon icon={IconEnum.Facebook} size={iconSize} />
          <span>
            {text} {oAuthVariant}
          </span>
        </UIbutton>
      )}
    />
  );
};

export default Facebook;
