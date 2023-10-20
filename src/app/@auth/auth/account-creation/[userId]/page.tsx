"use client";

export default function CreateAccount({
  params,
}: {
  params: { userId: string };
}) {
  return <div>User id: {params.userId}</div>;
}
