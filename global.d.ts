import { z } from "zod";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      API_KEY: string;
      AUTH_DOMAIN: string;
      PROJECT_ID: string;
      STORAGE_BUCKET: string;
      MESSAGE_SENDER_ID: string;
      APP_ID: string;
      MEASUREMENT_ID: string;
    }
  }
}
