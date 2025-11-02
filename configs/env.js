import dotenv from "dotenv";
dotenv.config();

const numberFromEnv = (value, fallback) => {
  const parsed = Number.parseInt(value, 10);
  return Number.isNaN(parsed) ? fallback : parsed;
};

export const env = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || "development",
  corsOrigins: process.env.CORS_ORIGINS || "http://localhost",
  
  brand: {
    name: process.env.BRAND_NAME || "SmartBiz AI Labs",
  },

};
