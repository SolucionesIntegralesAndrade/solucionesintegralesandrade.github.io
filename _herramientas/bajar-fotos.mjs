// Baja las fotos libres que pide cada demo (archivo <demo>/fotos.json) a <demo>/fotos/.
// Corre en GitHub Actions, que tiene internet. No baja de nuevo lo que ya está.
// fotos.json: [{ "archivo": "hero.jpg", "url": "https://images.pexels.com/...", "fuente": "https://www.pexels.com/photo/...", "credito": "Nombre en Pexels" }]
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";

const informe = {};
for (const demo of readdirSync(".", { withFileTypes: true }).filter((d) => d.isDirectory() && !d.name.startsWith(".") && !d.name.startsWith("_")).map((d) => d.name)) {
  if (!existsSync(`${demo}/fotos.json`)) continue;
  const lista = JSON.parse(readFileSync(`${demo}/fotos.json`, "utf8"));
  mkdirSync(`${demo}/fotos`, { recursive: true });
  informe[demo] = { bajadas: [], ya_estaban: [], fallidas: [] };
  for (const f of lista) {
    const destino = `${demo}/fotos/${f.archivo}`;
    if (existsSync(destino)) { informe[demo].ya_estaban.push(f.archivo); continue; }
    try {
      const r = await fetch(f.url, { redirect: "follow", headers: { "user-agent": "Mozilla/5.0 (demos Andrade Solutions)" } });
      const tipo = r.headers.get("content-type") || "";
      if (!r.ok || !tipo.startsWith("image/")) throw new Error(`HTTP ${r.status} ${tipo}`);
      const buf = Buffer.from(await r.arrayBuffer());
      if (buf.length < 5000) throw new Error(`muy chica (${buf.length} bytes)`);
      writeFileSync(destino, buf);
      informe[demo].bajadas.push(`${f.archivo} (${Math.round(buf.length / 1024)} KB)`);
    } catch (e) {
      informe[demo].fallidas.push(`${f.archivo}: ${f.url} → ${e.message}`);
    }
  }
}
mkdirSync("_capturas", { recursive: true });
writeFileSync("_capturas/fotos.json", JSON.stringify(informe, null, 2));
console.log(JSON.stringify(informe, null, 2));
