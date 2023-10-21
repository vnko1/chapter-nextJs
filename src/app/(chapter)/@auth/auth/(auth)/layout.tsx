"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { BlockAuth } from "@/components";
import { links } from "@/utils";
import { Delimiter } from "@/components/Delimiter";
import { AuthBy } from "@/components/AuthBy";
import { AuthLink } from "@/components/AuthLink";
import styles from "./authPage.module.scss";

function getTextValue(value: string) {
  if (value === links.SIGN_UP)
    return { heading: "Sign up", typePageText: "Create account" };

  if (value === links.LOG_IN)
    return { heading: "Log in", typePageText: "Log in" };

  return { heading: "Create account", typePageText: "" };
}

export default function AuthLayout({ children }: { children: ReactNode }) {
  const pathName = usePathname();
  const showBottomText =
    pathName === links.LOG_IN || pathName === links.SIGN_UP;
  const { heading, typePageText } = getTextValue(pathName);
  const isLogin = pathName === links.LOG_IN;
  const textMsg = !isLogin
    ? "Already have an account ?"
    : "You don`t have an account ?";
  const linkMsg = !isLogin ? "Log in" : "Sign up";
  const link = isLogin ? links.SIGN_UP : links.LOG_IN;
  return (
    <BlockAuth
      showBottomText={showBottomText}
      heading={heading}
      typePageText={typePageText}
    >
      <div className={styles["register-page"]}>
        {children}
        <Delimiter />
        <AuthBy />
        <AuthLink textMsg={textMsg} linkMsg={linkMsg} link={link} />
      </div>
    </BlockAuth>
  );
}
