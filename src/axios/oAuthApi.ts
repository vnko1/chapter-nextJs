import axios from "axios";

const googleOAuthApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_GOOGLE_BASE_URL,
});

export default googleOAuthApi;
