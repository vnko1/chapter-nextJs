import { EndpointsEnum, api } from "@/axios";
import { getUser } from "@/lib/auth";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchIsAuthUser } from "@/redux/slices";
import { getTokenFromLC, links } from "@/utils";
import { redirect, useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

export default function AppLayout({
  auth,
  dashboard,
}: {
  auth: ReactNode;
  dashboard: ReactNode;
}) {
  const res = getUser();
  return auth;
}
