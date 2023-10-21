import { FC, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGoogleLogin } from "@react-oauth/google";

import GoogleApi from "./GoogleApi";
import { useGetUrlParams } from "../hooks";
import { useAppDispatch } from "@/redux/hooks";
import { SocialsProps, OAuthVariant } from "../OAuth.type";
import styles from "../OAuth.module.scss";

import { UIbutton } from "../../Buttons";

import { Icon, IconEnum } from "../../Icon";

const Google: FC<SocialsProps> = ({
  stateId,
  oAuthVariant,
  googlePopupMode = false,
  text = "Enter with",
  iconSize = 24,
  buttonSize = "small",
  buttonColor = "secondary",
  buttonVariant = "outlined",
  dataAutomation = "oAuthButton",
  className,
}) => {
  const { state, code, currentLocation, pathname } = useGetUrlParams();
  const [googleAuthCode, setGoogleAuthCode] = useState(code);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useRouter();

  useEffect(() => {
    if (
      oAuthVariant === OAuthVariant.GOOGLE &&
      googleAuthCode &&
      (state === process.env.NEXT_PUBLIC_GOOGLE_STATE + stateId ||
        state ===
          process.env.NEXT_PUBLIC_GOOGLE_STATE +
            process.env.NEXT_PUBLIC_BASE_OAUTH_STATE)
    ) {
      new GoogleApi({
        token: googleAuthCode,
        redirectUri: currentLocation,
        navigate,
        setIsLoading,
        dispatch,
      });

      setGoogleAuthCode("");
      navigate.replace(pathname);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLocation, googleAuthCode, oAuthVariant, stateId, state]);

  const googleOAuthLogin = useGoogleLogin({
    flow: "auth-code",
    ux_mode: googlePopupMode ? "popup" : "redirect",
    redirect_uri: currentLocation,
    state: process.env.NEXT_PUBLIC_GOOGLE_STATE + stateId,
    onSuccess: async (codeResponse) => {
      if (
        codeResponse.state === process.env.NEXT_PUBLIC_GOOGLE_STATE + stateId ||
        codeResponse.state ===
          process.env.NEXT_PUBLIC_GOOGLE_STATE +
            process.env.NEXT_PUBLIC_BASE_OAUTH_STATE
      ) {
        new GoogleApi({
          token: codeResponse.code,
          redirectUri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI,
          navigate,
          setIsLoading,
          dispatch,
        });
      }
    },
    onError: (error) => {
      console.log("Google Login Failed!", error);
    },
  });

  return (
    <UIbutton
      className={`${styles["oauth-btn"]} ${className}`}
      onClick={() => googleOAuthLogin()}
      dataAutomation={dataAutomation}
      fullWidth
      variant={buttonVariant}
      isLoading={isLoading}
      disabled={isLoading}
      color={buttonColor}
      size={buttonSize}
    >
      <Icon icon={IconEnum.Google} size={iconSize} />
      <span>
        {text} {oAuthVariant}
      </span>
    </UIbutton>
  );
};

export default Google;
