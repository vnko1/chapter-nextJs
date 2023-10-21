"use client";

import { FormCreateAccount } from "./_components/accountCreate";

export default function CreateAccount({
  params,
}: {
  params: { userId: string };
}) {
  return <FormCreateAccount userId={params.userId} />;
}
