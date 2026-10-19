// Abre cada demo con internet real (en GitHub Actions), revisa fotos y videos rotos,
// saca capturas de compu y celu y graba un video con scroll suave (horizontal y vertical).
// Uso: node _herramientas/capturar.mjs <carpeta-demo> [<carpeta-demo> ...]
// Necesita un servidor estático en http://localhost:8080 sirviendo la raíz del repo.
import { chromium } from "playwright";
import { mkdirSync, writeFileSync, readdirSync, rmSync } from "node:fs";
import { execFileSync } from "node:child_process";

const demos = process.argv.slice(2);
const base = "http://localhost:8080";
mkdirSync("_capturas", { recursive: true });
mkdirSync("videos", { recursive: true });
const informe = {};

async function recorrer(page, ms) {
  const alto = await page.evaluate(() => document.documentElement.scrollHeight - innerHeight);
  const pasos = Math.max(1, Math.round(ms / 16));
  for (let i = 0; i <= pasos; i++) {
    const t = i / pasos;
    const e = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    await page.evaluate((y) => window.scrollTo(0, y), Math.round(alto * e));
    await page.waitForTimeout(16);
  }
}

const browser = await chromium.launch();
for (const demo of demos) {
  const url = `${base}/${demo}/`;
  const r = { url, errores: [], fotos_rotas: [], videos_rotos: [], pedidos_fallidos: [] };
  // Capturas y revisión
  for (const [nombre, viewport, movil] of [["compu", { width: 1440, height: 900 }, false], ["celu", { width: 390, height: 844 }, true]]) {
    const ctx = await browser.newContext({ viewport, deviceScaleFactor: movil ? 2 : 1, isMobile: movil, hasTouch: movil });
    const page = await ctx.newPage();
    page.on("pageerror", (e) => r.errores.push(`${nombre}: ${e.message}`));
    page.on("requestfailed", (q) => r.pedidos_fallidos.push(`${nombre}: ${q.url()} (${q.failure()?.errorText})`));
    page.on("response", (s) => { if (s.status() >= 400) r.pedidos_fallidos.push(`${nombre}: ${s.url()} (${s.status()})`); });
    await page.goto(url, { waitUntil: "networkidle", timeout: 60000 }).catch((e) => r.errores.push(`${nombre}: goto ${e.message}`));
    await page.waitForTimeout(2500);
    await page.screenshot({ path: `_capturas/${demo}-${nombre}-arriba.png` });
    await recorrer(page, 4000);
    await page.waitForTimeout(1500);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(800);
    await page.screenshot({ path: `_capturas/${demo}-${nombre}-completa.png`, fullPage: true });
    const rotas = await page.evaluate(() => [...document.images].filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.currentSrc || i.src));
    r.fotos_rotas.push(...rotas.map((s) => `${nombre}: ${s}`));
    const vrotos = await page.evaluate(() => [...document.querySelectorAll("video")].filter((v) => v.error || v.readyState === 0).map((v) => v.currentSrc || v.src));
    r.videos_rotos.push(...vrotos.map((s) => `${nombre}: ${s}`));
    r[`alto_${nombre}`] = await page.evaluate(() => document.documentElement.scrollHeight);
    r[`scroll_horizontal_${nombre}`] = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1);
    await ctx.close();
  }
  // Videos: horizontal 1280x720 y vertical 720x1280 (para Instagram y WhatsApp)
  for (const [tipo, size, movil] of [["horizontal", { width: 1280, height: 720 }, false], ["vertical", { width: 405, height: 720 }, true]]) {
    const dir = `/tmp/video-${demo}-${tipo}`;
    rmSync(dir, { recursive: true, force: true });
    const ctx = await browser.newContext({ viewport: size, isMobile: movil, hasTouch: movil, deviceScaleFactor: 1, recordVideo: { dir, size: tipo === "vertical" ? { width: 720, height: 1280 } : size } });
    const page = await ctx.newPage();
    await page.goto(url, { waitUntil: "networkidle", timeout: 60000 }).catch(() => {});
    await page.waitForTimeout(3000);
    await recorrer(page, 18000);
    await page.waitForTimeout(1500);
    await ctx.close();
    const webm = readdirSync(dir).find((f) => f.endsWith(".webm"));
    const salida = `videos/${demo}-${tipo}.mp4`;
    execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-i", `${dir}/${webm}`, "-ss", "1.2", "-vf", tipo === "vertical" ? "scale=720:1280" : "scale=1280:720", "-c:v", "libx264", "-pix_fmt", "yuv420p", "-preset", "slow", "-crf", "26", "-movflags", "+faststart", "-an", salida]);
  }
  informe[demo] = r;
  console.log(demo, JSON.stringify(r, null, 2));
}
await browser.close();
writeFileSync("_capturas/informe.json", JSON.stringify(informe, null, 2));
