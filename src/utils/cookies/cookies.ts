"use client";
import { CookieValue } from "./cookies.type";

export const getCookie = (key: string) => {
  const res = document.cookie
    .split("; ")
    .find((item) => item.startsWith(`${key}=`))
    ?.split("=")[1];
  if (res) return res;
  return "";
};

export const setCookie = (
  cookieValue: CookieValue,
  cookiePath: string | undefined = undefined,
  cookieExpirationValue: number | undefined = undefined
) => {
  const path = cookiePath ? "path=" + cookiePath + ";" : "path=/;";
  const expires = cookieExpirationValue
    ? "max-age=" + cookieExpirationValue
    : "";

  Object.keys(cookieValue).forEach(
    (i: keyof CookieValue) =>
      (document.cookie = `${i}=${cookieValue[i]}; ${path}; ${expires}`)
  );
};

export const deleteCookie = (...args: string[]) =>
  args.forEach((item) => setCookie({ [item]: "" }, undefined, -1));
