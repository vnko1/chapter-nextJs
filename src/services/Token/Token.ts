import axios from "axios";
import { EndpointsEnum } from "@/axios";

class TokenService {
  static async refreshToken() {
    const response = await axios.post(
      `${process.env.VITE_API_BASE_URL}${EndpointsEnum.REFRESH}`
    );
    return response;
  }
}

export default TokenService;
