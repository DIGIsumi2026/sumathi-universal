/**
 * optimize-images.mjs
 *
 * Build-time image optimization script using Sharp.
 * Converts large raster images to AVIF for better compression.
 * Also converts the one remaining PNG (company-logo.png) to WebP + AVIF.
 *
 * Run:  npm run optimize-images
 *
 * This script NEVER runs in the browser. It is a Node.js dev/build tool only.
 * Original source files are preserved untouched.
 * Optimized output is placed alongside the originals with an .avif extension.
 *
 * Widths generated per image:
 *   - Only sizes that are ≤ the source image width (no upscaling)
 *   - Sizes: 480, 768, 1024, 1440, 1920
 *
 * Quality settings (conservative — visually equivalent to originals):
 *   - AVIF: quality 72, effort 6
 *   - WebP:  quality 82
 */

import sharp from 'sharp';
import { readdir, stat, mkdir } from 'node:fs/promises';
import { join, dirname, basename, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const IMAGES_DIR = join(__dirname, '../src/assets/images');
const AVIF_QUALITY = 72;
const AVIF_EFFORT = 6;
const WEBP_QUALITY = 82;
const RESPONSIVE_WIDTHS = [480, 768, 1024, 1440, 1920];

// ------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------

async function* walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walk(fullPath);
    } else {
      yield fullPath;
    }
  }
}

function formatKB(bytes) {
  return `${(bytes / 1024).toFixed(1)} KB`;
}

// ------------------------------------------------------------------
// Main
// ------------------------------------------------------------------

async function optimizeImages() {
  let totalOriginalBytes = 0;
  let totalAvifBytes = 0;
  let totalWebpBytes = 0;
  let filesProcessed = 0;
  const results = [];

  for await (const filePath of walk(IMAGES_DIR)) {
    const ext = extname(filePath).toLowerCase();

    // Only handle raster images we can usefully convert
    if (!['.webp', '.jpg', '.jpeg', '.png'].includes(ext)) continue;

    const originalStat = await stat(filePath);
    const originalBytes = originalStat.size;
    const base = basename(filePath, ext);
    const dir = dirname(filePath);

    // Get source dimensions to avoid upscaling
    let meta;
    try {
      meta = await sharp(filePath).metadata();
    } catch {
      console.warn(`  ⚠  Skipping (could not read): ${filePath}`);
      continue;
    }

    const srcWidth = meta.width || 0;

    // Skip very small images (logos, small icons) — not worth multi-size AVIF
    if (srcWidth < 400) {
      // Still convert PNG to AVIF/WebP as single file for the logo
      if (ext === '.png') {
        const avifOut = join(dir, `${base}.avif`);
        const webpOut = join(dir, `${base}.webp`);

        const avifBuf = await sharp(filePath)
          .avif({ quality: AVIF_QUALITY, effort: AVIF_EFFORT })
          .toBuffer();

        const webpBuf = await sharp(filePath)
          .webp({ quality: WEBP_QUALITY })
          .toBuffer();

        await sharp(filePath).avif({ quality: AVIF_QUALITY, effort: AVIF_EFFORT }).toFile(avifOut);
        await sharp(filePath).webp({ quality: WEBP_QUALITY }).toFile(webpOut);

        results.push({
          file: basename(filePath),
          original: formatKB(originalBytes),
          avif: formatKB(avifBuf.byteLength),
          webp: formatKB(webpBuf.byteLength),
        });

        totalOriginalBytes += originalBytes;
        totalAvifBytes += avifBuf.byteLength;
        totalWebpBytes += webpBuf.byteLength;
        filesProcessed++;
      }
      continue;
    }

    totalOriginalBytes += originalBytes;
    filesProcessed++;

    const widthsToGenerate = RESPONSIVE_WIDTHS.filter((w) => w <= srcWidth);
    // Always include the original width if not already in the list
    if (!widthsToGenerate.includes(srcWidth) && srcWidth <= RESPONSIVE_WIDTHS[RESPONSIVE_WIDTHS.length - 1]) {
      widthsToGenerate.push(srcWidth);
      widthsToGenerate.sort((a, b) => a - b);
    }

    // If source is smaller than our smallest breakpoint, just do a single optimized file
    if (widthsToGenerate.length === 0) {
      widthsToGenerate.push(srcWidth);
    }

    let firstAvifBytes = 0;

    for (const targetWidth of widthsToGenerate) {
      const suffix = targetWidth === srcWidth ? '' : `-${targetWidth}`;
      const avifOut = join(dir, `${base}${suffix}.avif`);

      try {
        const avifBuf = await sharp(filePath)
          .resize({ width: targetWidth, withoutEnlargement: true })
          .avif({ quality: AVIF_QUALITY, effort: AVIF_EFFORT })
          .toBuffer();

        await sharp(filePath)
          .resize({ width: targetWidth, withoutEnlargement: true })
          .avif({ quality: AVIF_QUALITY, effort: AVIF_EFFORT })
          .toFile(avifOut);

        totalAvifBytes += avifBuf.byteLength;
        if (firstAvifBytes === 0) firstAvifBytes = avifBuf.byteLength;
      } catch (err) {
        console.warn(`  ⚠  Failed for ${avifOut}: ${err.message}`);
      }
    }

    // For PNG sources also generate WebP at full size
    if (ext === '.png') {
      const webpOut = join(dir, `${base}.webp`);
      const webpBuf = await sharp(filePath)
        .webp({ quality: WEBP_QUALITY })
        .toBuffer();
      await sharp(filePath).webp({ quality: WEBP_QUALITY }).toFile(webpOut);
      totalWebpBytes += webpBuf.byteLength;

      results.push({
        file: basename(filePath),
        original: formatKB(originalBytes),
        avif: formatKB(firstAvifBytes) + ` (+ ${widthsToGenerate.length - 1} responsive)`,
        webp: formatKB(webpBuf.byteLength),
      });
    } else {
      results.push({
        file: basename(filePath),
        original: formatKB(originalBytes),
        avif: formatKB(firstAvifBytes) + ` (${widthsToGenerate.length} sizes)`,
        webp: '—',
      });
    }
  }

  // ------------------------------------------------------------------
  // Report
  // ------------------------------------------------------------------
  console.log('\n' + '─'.repeat(72));
  console.log('  Sharp Image Optimization Results');
  console.log('─'.repeat(72));
  console.log(`${'File'.padEnd(45)} ${'Original'.padStart(10)} ${'AVIF'.padStart(12)}`);
  console.log('─'.repeat(72));

  for (const r of results) {
    console.log(
      `${r.file.padEnd(45)} ${r.original.padStart(10)} ${r.avif.padStart(12)}`
    );
  }

  console.log('─'.repeat(72));
  console.log(`\n  Files processed : ${filesProcessed}`);
  console.log(`  Total original  : ${formatKB(totalOriginalBytes)}`);
  console.log(`  Total AVIF      : ${formatKB(totalAvifBytes)}`);
  if (totalWebpBytes > 0) {
    console.log(`  Total WebP      : ${formatKB(totalWebpBytes)}`);
  }
  const pct = ((1 - totalAvifBytes / totalOriginalBytes) * 100).toFixed(1);
  console.log(`  AVIF reduction  : ~${pct}% smaller than originals`);
  console.log('\n  ✓ Originals preserved. Optimized files placed alongside originals.\n');
}

optimizeImages().catch((err) => {
  console.error('Image optimization failed:', err);
  process.exit(1);
});
