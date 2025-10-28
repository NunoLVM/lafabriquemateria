// gen-hash.js
const bcrypt = require("bcrypt");
const pass = process.argv[2] || "minhaSenhaSecreta";
bcrypt
  .hash(pass, 12)
  .then((h) => {
    console.log(h);
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
