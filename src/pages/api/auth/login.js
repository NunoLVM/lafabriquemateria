import { validateLogin, signToken, makeCookie, AUTH_COOKIE } from "../../../server/auth.js";

export const POST = async ({ request }) => {
  try {
    let body = {};
    try {
      body = await request.json();
    } catch {} // Corriger
    const { email = "", password = "" } = body;

    const res = await validateLogin(email, password);
    if (!res.ok) {
      const status = res.code === "env_missing" ? 500 : 401;
      return new Response(JSON.stringify({ ok: false, error: res.code }), {
        status,
        headers: { "Content-Type": "application/json" },
      });
    }

    const token = signToken({ email });
    const cookie = makeCookie(AUTH_COOKIE, token);

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", "Set-Cookie": cookie },
    });
  } catch (err) {
    console.error("[auth/login] error:", err);
    return new Response(JSON.stringify({ ok: false, error: "server_error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
