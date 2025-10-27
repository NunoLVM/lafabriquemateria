export const prerender = false;

import { clearCookie, AUTH_COOKIE } from "../../../server/auth.js";

export const POST = async () => {
  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Set-Cookie": clearCookie(AUTH_COOKIE),
    },
  });
};
