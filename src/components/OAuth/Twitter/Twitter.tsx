import { FC, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import TwitterApi from "./TwitterApi";
import { useGetUrlParams } from "../hooks";
import { useAppDispatch } from "@/redux/hooks";
import { SocialsProps, OAuthVariant } from "../OAuth.type";
import styles from "../OAuth.module.scss";

import { Icon, IconEnum } from "../../Icon";
import { UIbutton } from "@/components/Buttons";

const Twitter: FC<SocialsProps> = ({
  stateId,
  oAuthVariant,
  text = "Enter with",
  iconSize = 24,
  buttonSize = "small",
  buttonColor = "secondary",
  buttonVariant = "outlined",
  dataAutomation = "oAuthButton",
  className,
}) => {
  const { state, code, currentLocation, pathname } = useGetUrlParams();
  const [twitterAuthCode, setTwitterAuthCode] = useState(code);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useRouter();
  const dispatch = useAppDispatch();

  const twitterRedirectUrl = TwitterApi.createRedirectUrl(
    currentLocation,
    stateId
  );

  useEffect(() => {
    if (
      oAuthVariant === OAuthVariant.TWITTER &&
      twitterAuthCode &&
      (state === process.env.NEXT_PUBLIC_TWITTER_STATE + stateId ||
        state ===
          process.env.NEXT_PUBLIC_TWITTER_STATE +
            process.env.NEXT_PUBLIC_BASE_OAUTH_STATE)
    ) {
      new TwitterApi({
        token: twitterAuthCode,
        navigate,
        setIsLoading,
        dispatch,
      });

      navigate.replace(pathname);
      setTwitterAuthCode("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, stateId, twitterAuthCode, oAuthVariant]);

  return (
    <UIbutton
      className={`${styles["oauth-btn"]} ${className}`}
      onClick={() => window.location.replace(twitterRedirectUrl)}
      dataAutomation={dataAutomation}
      fullWidth
      variant={buttonVariant}
      color={buttonColor}
      isLoading={isLoading}
      disabled={isLoading}
      size={buttonSize}
    >
      <Icon icon={IconEnum.Twitter} size={iconSize} />
      <span>
        {text} {oAuthVariant}
      </span>
    </UIbutton>
  );
};

export default Twitter;
