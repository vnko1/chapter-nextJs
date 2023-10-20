import { usePathname, useSearchParams, useRouter } from "next/navigation";

const useGetUrlParams = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams()!;
  const router = useRouter();
  console.log(router);

  const currentLocation = window.location.origin + pathname;
  const state = searchParams.get("state");
  const code = searchParams.get("code");
  const error_message = searchParams.get("error_message");

  return {
    state,
    code,
    error_message,
    currentLocation,
    pathname,
  };
};

export default useGetUrlParams;
