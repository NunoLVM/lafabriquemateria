export const prerender = false;

import { getBlock } from "../../../server/content.js";

export const GET = async ({ request }) => {
  const url = new URL(request.url);
  const keys = (url.searchParams.get("keys") || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const out = {};
  for (const k of keys) out[k] = getBlock(k); // pode ser string ou null

  return new Response(JSON.stringify({ ok: true, data: out }), {
    headers: { "Content-Type": "application/json" },
  });
};
