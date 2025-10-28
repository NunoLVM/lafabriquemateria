import { db } from "./db.js";

// Ler bloco de conteúdo por chave
export function getBlock(key) {
  const row = db.prepare("SELECT value FROM content_blocks WHERE key = ?").get(key);
  return row ? row.value : null;
}

// Gravar/atualizar bloco
export function setBlock(key, value) {
  db.prepare(
    `
    INSERT INTO content_blocks (key, value, updated_at)
    VALUES (?, ?, datetime('now'))
    ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at
  `
  ).run(key, value);
}
