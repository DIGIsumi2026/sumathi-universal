/**
 * generate-favicons.mjs
 * Uses the existing public/favicon.svg to produce
 * favicon-16x16.png, favicon-32x32.png, and apple-touch-icon.png
 * in the public/ directory.
 *
 * Run: node scripts/generate-favicons.mjs
 */
import sharp from 'sharp';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = resolve(__dirname, '../public');
const svgInput  = resolve(publicDir, 'favicon.svg');

const targets = [
  { file: 'favicon-16x16.png',   size: 16 },
  { file: 'favicon-32x32.png',   size: 32 },
  { file: 'apple-touch-icon.png',size: 180 },
];

for (const { file, size } of targets) {
  const out = resolve(publicDir, file);
  await sharp(svgInput)
    .resize(size, size)
    .png()
    .toFile(out);
  console.log(`✓ ${file} (${size}×${size})`);
}
