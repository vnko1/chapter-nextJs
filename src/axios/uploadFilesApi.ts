import axios from "axios";

const uploadFilesApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_CLOUDINARY_API_BASE_URL,
  headers: { "Content-Type": "multipart/form-data" },
});

export default uploadFilesApi;
