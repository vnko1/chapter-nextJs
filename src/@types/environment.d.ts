declare namespace NodeJS {
  interface ProcessEnv {
    VITE_BASE_OAUTH_STATE: string;
    VITE_API_BASE_URL: string;
    VITE_STATE_ID_COOKIE_LIFETIME: number;
    VITE_GOOGLE_BASE_URL: string;
    VITE_GOOGLE_CLIENT_ID: string;
    VITE_GOOGLE_CLIENT_SECRET: string;
    VITE_GOOGLE_STATE: string;
    VITE_FACEBOOK_APP_ID: string;
    VITE_FACEBOOK_STATE: string;
    VITE_CLOUDINARY_API_BASE_URL: string;
    VITE_CLOUDINARY_CLOUD_NAME: string;
    VITE_CLOUDINARY_API_KEY: string;
    VITE_CLOUDINARY_API_SECRET: string;
  }
}
