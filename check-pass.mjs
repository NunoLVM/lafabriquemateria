import "dotenv/config";
import bcrypt from "bcrypt";
const ok = await bcrypt.compare("Lafabriquemateria", process.env.ADMIN_PASSWORD_HASH);
console.log("match =", ok);
