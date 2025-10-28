export const prerender = false;

import { requireAuth } from "../../../server/guard.js";
import { addMedia } from "../../../server/content.js";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../../../../", import.meta.url));
const uploadDir = path.join(root, "public", "uploads");
const MAX_BYTES = 5 * 1024 * 1024; // 5MB

export const POST = async ({ request }) => {
  if (!requireAuth(request)) {
    return new Response(JSON.stringify({ ok: false, error: "unauthorized" }), { status: 401 });
  }

  const ct = request.headers.get("content-type") || "";
  if (!ct.startsWith("multipart/form-data")) {
    return new Response(JSON.stringify({ ok: false, error: "expected_multipart" }), { status: 400 });
  }

  const form = await request.formData();
  const file = form.get("file");
  const alt = String(form.get("alt") || "");

  if (!file || typeof file === "string") {
    return new Response(JSON.stringify({ ok: false, error: "missing_file" }), { status: 400 });
  }

  const type = file.type || "";
  if (!/^image\/(png|jpeg|webp|gif|avif)$/.test(type)) {
    return new Response(JSON.stringify({ ok: false, error: "invalid_type" }), { status: 400 });
  }

  const buf = Buffer.from(await file.arrayBuffer());
  if (buf.length > MAX_BYTES) {
    return new Response(JSON.stringify({ ok: false, error: "file_too_large" }), { status: 413 });
  }

  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
  const ext = type.split("/")[1] || "bin";
  const name = `img_${Date.now()}.${ext}`;
  fs.writeFileSync(path.join(uploadDir, name), buf);

  const url = `/uploads/${name}`;
  addMedia(name, url, alt);

  return new Response(JSON.stringify({ ok: true, url }), {
    headers: { "Content-Type": "application/json" },
  });
};
