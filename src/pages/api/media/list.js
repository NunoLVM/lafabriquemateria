export const prerender = false;

import { listMedia } from "../../../server/content.js";

export const GET = async () => {
  return new Response(JSON.stringify({ ok: true, data: listMedia() }), {
    headers: { "Content-Type": "application/json" },
  });
};
