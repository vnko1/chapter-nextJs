"use client";
import { FC, useEffect, useState } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { nanoid } from "@reduxjs/toolkit";

import { getCookie, setCookie } from "@/utils";
import { OAuthProps, OAuthVariant } from "./OAuth.type";

import Twitter from "./Twitter/Twitter";
import Facebook from "./Facebook/Facebook";
import Google from "./Google/Google";

const OAuth: FC<OAuthProps> = (props) => {
  const [stateId, setStateId] = useState(
    process.env.NEXT_PUBLIC_BASE_OAUTH_STATE
  );

  useEffect(() => {
    if (getCookie("stateId")) setStateId(getCookie("stateId"));
    if (!getCookie("stateId")) {
      setCookie(
        { stateId: nanoid() },
        "/",
        process.env.NEXT_PUBLIC_STATE_ID_COOKIE_LIFETIME
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (props.oAuthVariant === OAuthVariant.GOOGLE)
    return (
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
        <Google stateId={stateId as string} {...props} />
      </GoogleOAuthProvider>
    );

  if (props.oAuthVariant === OAuthVariant.FACEBOOK)
    return <Facebook stateId={stateId as string} {...props} />;

  if (props.oAuthVariant === OAuthVariant.TWITTER)
    return <Twitter stateId={stateId as string} {...props} />;
};

export default OAuth;
