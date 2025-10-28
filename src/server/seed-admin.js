import { db } from "./db.js";

// substitui pelo hash gerado com bcrypt
const email = "admin@lafabriquemateria.com";
const hash = "HASH_DA_TUA_PASSWORD";

db.prepare("INSERT INTO admins (email, password_hash) VALUES (?, ?)").run(email, hash);

console.log("✅ Admin inserido:", email);
