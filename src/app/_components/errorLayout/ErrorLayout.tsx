"use client";
import { FC } from "react";

import { ErrorLayoutProps } from "./ErrorLayout.type";

import { PublicHeader } from "@/components";

const ErrorLayout: FC<ErrorLayoutProps> = ({ children }) => (
  <>
    <PublicHeader />
    <main>{children}</main>
  </>
);

export default ErrorLayout;
