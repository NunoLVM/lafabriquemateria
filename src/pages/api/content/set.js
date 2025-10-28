export const prerender = false;

import { setBlock } from "../../../server/content.js";
import { requireAuth } from "../../../server/guard.js";

export const POST = async ({ request }) => {
  if (!requireAuth(request)) {
    return new Response(JSON.stringify({ ok: false, error: "unauthorized" }), { status: 401 });
  }

  let body = {};
  try {
    body = await request.json();
  } catch {}
  const { key, value } = body;

  if (!key) {
    return new Response(JSON.stringify({ ok: false, error: "missing_key" }), { status: 400 });
  }

  // aceita string ou objeto
  setBlock(key, typeof value === "string" ? value : JSON.stringify(value));

  return new Response(JSON.stringify({ ok: true }), {
    headers: { "Content-Type": "application/json" },
  });
};
