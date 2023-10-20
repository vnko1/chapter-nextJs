"use client";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { BlockAuth } from "@/components";
import { links } from "@/utils";

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

  return (
    <BlockAuth
      showBottomText={showBottomText}
      heading={heading}
      typePageText={typePageText}
    >
      {children}
    </BlockAuth>
  );
}
