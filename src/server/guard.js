import { parseCookie, verifyToken } from "./auth.js";

export function requireAuth(request) {
  const token = parseCookie(request, "auth");
  const payload = token && verifyToken(token);
  return !!payload;
}
