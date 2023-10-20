import axios from "axios";

const googleOAuthApi = axios.create({
  baseURL: process.env.VITE_GOOGLE_BASE_URL,
});

export default googleOAuthApi;
