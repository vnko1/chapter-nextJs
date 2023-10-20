"use client";
import { ReactNode } from "react";
import { PublicHeader } from "@/components";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <PublicHeader />
      <main>{children}</main>
    </>
  );
}
