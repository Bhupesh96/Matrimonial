/**
 * One-off generator: reads public/favicon.svg and produces:
 *   public/favicon.ico  (multi-size 16/32/48 ICO)
 *   public/favicon-16.png
 *   public/favicon-32.png
 *   public/apple-touch-icon.png   (180x180)
 *   public/logo192.png
 *   public/logo512.png
 *
 * Run with:  node scripts/gen-favicon.js
 */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const pngToIcoMod = require("png-to-ico");
const pngToIco =
  typeof pngToIcoMod === "function" ? pngToIcoMod : pngToIcoMod.default;

const PUBLIC_DIR = path.join(__dirname, "..", "public");
const SVG_PATH = path.join(PUBLIC_DIR, "favicon.svg");

(async () => {
  if (!fs.existsSync(SVG_PATH)) {
    console.error("Cannot find", SVG_PATH);
    process.exit(1);
  }
  const svg = fs.readFileSync(SVG_PATH);

  const sizes = [
    { size: 16, name: "favicon-16.png" },
    { size: 32, name: "favicon-32.png" },
    { size: 48, name: "favicon-48.png" },
    { size: 64, name: "favicon-64.png" },
    { size: 180, name: "apple-touch-icon.png" },
    { size: 192, name: "logo192.png" },
    { size: 512, name: "logo512.png" },
  ];

  for (const { size, name } of sizes) {
    const out = path.join(PUBLIC_DIR, name);
    await sharp(svg, { density: 384 })
      .resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png({ compressionLevel: 9 })
      .toFile(out);
    console.log("  +", name, `(${size}x${size})`);
  }

  // Build a multi-size favicon.ico from 16/32/48/64 PNGs
  const icoBuffer = await pngToIco([
    path.join(PUBLIC_DIR, "favicon-16.png"),
    path.join(PUBLIC_DIR, "favicon-32.png"),
    path.join(PUBLIC_DIR, "favicon-48.png"),
    path.join(PUBLIC_DIR, "favicon-64.png"),
  ]);
  fs.writeFileSync(path.join(PUBLIC_DIR, "favicon.ico"), icoBuffer);
  console.log("  +", "favicon.ico  (multi: 16/32/48/64)");

  // tidy: remove the temp 48 + 64 PNGs we only needed for the ICO
  fs.unlinkSync(path.join(PUBLIC_DIR, "favicon-48.png"));
  fs.unlinkSync(path.join(PUBLIC_DIR, "favicon-64.png"));

  console.log("Done.");
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
