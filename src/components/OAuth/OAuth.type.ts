import { AppDispatch } from "@/redux/store";
import { IUserStore } from "@/redux/types/user";
import {
  ButtonColorType,
  ButtonVariantType,
  ButtonSizeType,
} from "../Buttons/UIbutton/UIbutton.type";
import { Dispatch, SetStateAction } from "react";

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export enum OAuthApiEndPoints {
  GOOGLE_TOKEN = "/token",
}

export enum OAuthVariant {
  FACEBOOK = "facebook",
  GOOGLE = "google",
  TWITTER = "twitter",
}

export type OAuthProps = {
  className?: string;
  text?: string;
  buttonColor?: ButtonColorType;
  buttonVariant?: ButtonVariantType;
  buttonSize?: ButtonSizeType;
  iconSize?: number;
  facebookPopupMode?: boolean;
  googlePopupMode?: boolean;
  oAuthVariant: "facebook" | "google" | "twitter";
  dataAutomation?: string;
};

export type SocialsProps = { stateId: string } & OAuthProps;

export type SetIsLoadingType = Dispatch<SetStateAction<boolean>>;

export type OAuthApiArgs = {
  navigate: AppRouterInstance;
  dispatch: AppDispatch;
  setIsLoading: SetIsLoadingType;
  redirectUri?: string;
  token?: string;
};

export type UserData = IUserStore;
