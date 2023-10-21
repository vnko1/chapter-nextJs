import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const useGetUrlParams = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams()!;
  const [currentLocation, setCurrentLocation] = useState("");
  const state = searchParams.get("state");
  const code = searchParams.get("code");
  const error_message = searchParams.get("error_message");

  useEffect(() => {
    setCurrentLocation(window.location.origin + pathname);
  }, [pathname]);

  return {
    state,
    code,
    error_message,
    currentLocation,
    pathname,
  };
};

export default useGetUrlParams;
