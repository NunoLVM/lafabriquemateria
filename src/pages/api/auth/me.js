import { parseCookie, verifyToken } from "../../../server/auth.js";

export const GET = async ({ request }) => {
  const token = parseCookie(request, "auth");
  if (!token)
    return new Response(JSON.stringify({ ok: false }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });

  const payload = verifyToken(token);
  if (!payload)
    return new Response(JSON.stringify({ ok: false }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });

  return new Response(JSON.stringify({ ok: true, user: { email: payload.email } }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
