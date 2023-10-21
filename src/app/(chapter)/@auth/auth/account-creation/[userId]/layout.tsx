import { BlockAuth } from "@/components";
import { ReactNode } from "react";

export default function AccountCreateLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <BlockAuth heading="Create account">{children}</BlockAuth>;
}
