import { clearCookie } from "../../../server/auth.js";

export const POST = async () => {
  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Set-Cookie": clearCookie("auth"),
    },
  });
};
