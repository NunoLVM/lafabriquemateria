import "dotenv/config";

export const ENV = {
  EMAIL: process.env.ADMIN_EMAIL || "",
  HASH: process.env.ADMIN_PASSWORD_HASH || "",
  SECRET: process.env.JWT_SECRET || "",
};
