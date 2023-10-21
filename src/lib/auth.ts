import { EndpointsEnum, api } from "@/axios";

export const getUser = async () => {
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_API_BASE_URL + EndpointsEnum.PROFILE
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};
