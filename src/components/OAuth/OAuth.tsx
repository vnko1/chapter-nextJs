"use client";
import { FC, useEffect } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { nanoid } from "@reduxjs/toolkit";

import { getCookie, setCookie } from "@/utils";
import { OAuthProps, OAuthVariant } from "./OAuth.type";

import Twitter from "./Twitter/Twitter";
import Facebook from "./Facebook/Facebook";
import Google from "./Google/Google";

const {
  VITE_BASE_OAUTH_STATE,
  VITE_STATE_ID_COOKIE_LIFETIME,
  VITE_GOOGLE_CLIENT_ID,
} = process.env;

const OAuth: FC<OAuthProps> = (props) => {
  const stateId = getCookie("stateId")
    ? getCookie("stateId")
    : VITE_BASE_OAUTH_STATE;
  console.log(VITE_BASE_OAUTH_STATE);
  useEffect(() => {
    if (!getCookie("stateId")) {
      setCookie({ stateId: nanoid() }, "/", VITE_STATE_ID_COOKIE_LIFETIME);
    }
  }, []);

  // if (props.oAuthVariant === OAuthVariant.GOOGLE)
  //   return (
  //     <GoogleOAuthProvider clientId={VITE_GOOGLE_CLIENT_ID}>
  //       <Google stateId={stateId as string} {...props} />
  //     </GoogleOAuthProvider>
  //   );

  if (props.oAuthVariant === OAuthVariant.FACEBOOK)
    return <Facebook stateId={stateId as string} {...props} />;

  if (props.oAuthVariant === OAuthVariant.TWITTER)
    return <Twitter stateId={stateId as string} {...props} />;
};

export default OAuth;
