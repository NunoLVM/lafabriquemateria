// src/pages/api/auth/debug.js
import { ENV } from "../../../server/env.js";
export const GET = async () =>
  new Response(
    JSON.stringify({
      hasEmail: !!ENV.EMAIL,
      hasHash: !!ENV.HASH,
      hasSecret: !!ENV.SECRET,
    }),
    { headers: { "Content-Type": "application/json" } }
  );
