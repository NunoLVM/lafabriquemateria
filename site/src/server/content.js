import { db } from "./db.js";

// blocks
export function getBlock(key) {
  const row = db.prepare("SELECT value FROM content_blocks WHERE key = ?").get(key);
  return row ? row.value : null;
}
export function setBlock(key, value) {
  db.prepare(
    `
    INSERT INTO content_blocks (key, value, updated_at)
    VALUES (?, ?, datetime('now'))
    ON CONFLICT(key) DO UPDATE SET value=excluded.value, updated_at=excluded.updated_at
  `
  ).run(key, value);
}

// media
export function listMedia() {
  return db.prepare("SELECT id, filename, url, alt, created_at FROM media ORDER BY id DESC").all();
}
export function addMedia(filename, url, alt = "") {
  db.prepare("INSERT INTO media (filename, url, alt) VALUES (?, ?, ?)").run(filename, url, alt);
}
