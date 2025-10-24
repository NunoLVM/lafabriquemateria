import { getBlock, setBlock } from "./src/server/content.js";

setBlock("hero-text", "Novo título para a página inicial");
console.log("Hero text:", getBlock("hero-text"));
