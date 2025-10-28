import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ENV } from "./env.js";

const COOKIE = "auth";
const MAX_AGE_S = 60 * 60 * 24 * 7;

export function signToken(p) {
  return jwt.sign(p, ENV.SECRET, { expiresIn: `${MAX_AGE_S}s` });
}
export function verifyToken(t) {
  try {
    return jwt.verify(t, ENV.SECRET);
  } catch {
    return null;
  }
}
export async function validateLogin(email, password) {
  if (!ENV.EMAIL || !ENV.HASH || !ENV.SECRET) return { ok: false, code: "env_missing" };
  if (email !== ENV.EMAIL) return { ok: false, code: "invalid" };
  const match = await bcrypt.compare(password, ENV.HASH);
  return { ok: match, code: match ? "ok" : "invalid" };
}
export function makeCookie(name, value, { maxAge = MAX_AGE_S } = {}) {
  const isProd = process.env.NODE_ENV === "production";
  return [`${name}=${value}`, `Max-Age=${maxAge}`, "Path=/", "HttpOnly", "SameSite=Lax", isProd ? "Secure" : null]
    .filter(Boolean)
    .join("; ");
}
export function parseCookie(req, name) {
  const raw = req.headers.get("cookie") || "";
  return (
    raw
      .split(";")
      .map((s) => s.trim())
      .find((s) => s.startsWith(name + "="))
      ?.split("=")
      .slice(1)
      .join("=") || ""
  );
}
export function clearCookie(name) {
  const isProd = process.env.NODE_ENV === "production";
  return `${name}=; Max-Age=0; Path=/; HttpOnly; SameSite=Lax; ${isProd ? "Secure" : ""}`;
}
export const AUTH_COOKIE = COOKIE;
