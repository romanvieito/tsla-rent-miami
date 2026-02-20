#!/usr/bin/env node
/**
 * Download guest images from Turo review JSON for local use.
 *
 * Usage:
 *   node scripts/download-review-images.js [path-to-reviews.json]
 *   cat reviews.json | node scripts/download-review-images.js
 *
 * - Downloads only images.turo.com URLs (skips empty-profile placeholders)
 * - Skips .heic files (browser compatibility); downloads .jpg only
 * - Saves to public/reviews/{SanitizedName}{Date}.jpg
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const PUBLIC_REVIEWS = path.join(__dirname, '..', 'public', 'reviews');

function sanitizeName(name) {
  return String(name)
    .replace(/\s+/g, '')
    .replace(/[^a-zA-Z0-9\u00C0-\u024F\-]/g, '');
}

function shouldDownload(url) {
  if (!url || typeof url !== 'string') return false;
  if (url.includes('empty-profile')) return false;
  if (!url.includes('images.turo.com')) return false;
  if (url.endsWith('.heic')) return false; // Skip HEIC for now
  return true;
}

function download(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    client
      .get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return download(res.headers.location).then(resolve).catch(reject);
        }
        if (res.statusCode !== 200) {
          reject(new Error(`HTTP ${res.statusCode} for ${url}`));
          return;
        }
        const chunks = [];
        res.on('data', (chunk) => chunks.push(chunk));
        res.on('end', () => resolve(Buffer.concat(chunks)));
        res.on('error', reject);
      })
      .on('error', reject);
  });
}

async function main() {
  let raw = '';
  const input = process.argv[2];

  if (input) {
    raw = fs.readFileSync(path.resolve(input), 'utf8');
  } else {
    raw = await new Promise((resolve, reject) => {
      let data = '';
      process.stdin.setEncoding('utf8');
      process.stdin.on('data', (chunk) => (data += chunk));
      process.stdin.on('end', () => resolve(data));
      process.stdin.on('error', reject);
    });
  }

  const reviews = JSON.parse(raw);
  if (!Array.isArray(reviews)) {
    console.error('Expected JSON array of reviews');
    process.exit(1);
  }

  if (!fs.existsSync(PUBLIC_REVIEWS)) {
    fs.mkdirSync(PUBLIC_REVIEWS, { recursive: true });
    console.log('Created', PUBLIC_REVIEWS);
  }

  let downloaded = 0;
  let skipped = 0;

  for (const r of reviews) {
    const url = r.guestImageUrl;
    const name = r.name;
    const date = r.date;

    if (!shouldDownload(url)) {
      skipped++;
      continue;
    }

    const safeName = sanitizeName(name) || 'Guest';
    const filename = `${safeName}${date}.jpg`;
    const filepath = path.join(PUBLIC_REVIEWS, filename);

    try {
      const buf = await download(url);
      fs.writeFileSync(filepath, buf);
      console.log('Saved:', filename);
      downloaded++;
    } catch (err) {
      console.error('Failed', name, date, err.message);
    }
  }

  console.log(`\nDone: ${downloaded} downloaded, ${skipped} skipped`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
