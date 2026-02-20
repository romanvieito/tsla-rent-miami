#!/usr/bin/env node
/**
 * Create a one-time Stripe Payment Link.
 * Usage: node scripts/create-payment-link.js [amount] [description]
 * Example: node scripts/create-payment-link.js 390 "Tesla rental - Miami"
 *
 * Requires STRIPE_SECRET_KEY in .env.local or environment.
 */

const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
function loadEnv(file) {
  const p = path.join(root, file);
  if (!fs.existsSync(p)) return;
  fs.readFileSync(p, 'utf8').split('\n').forEach((line) => {
    const m = line.match(/^([^#=]+)=(.*)$/);
    if (m) process.env[m[1].trim()] = m[2].trim().replace(/^["']|["']$/g, '');
  });
}
// Load .env.local first, then .env.vercel so production (pulled) vars take precedence
loadEnv('.env.local');
loadEnv('.env.vercel');
try { require('dotenv').config({ path: path.join(root, '.env.local') }); } catch (_) {}
// .env.vercel again so production overwrites any dotenv .env.local
loadEnv('.env.vercel');

const amount = parseFloat(process.argv[2] || '390');
const description = process.argv[3] || 'One-time payment';

async function main() {
  const key = process.env.STRIPE_SECRET_KEY?.trim().replace(/^["']|["']$/g, '');
  if (!key || !key.startsWith('sk_')) {
    console.error('Missing or invalid STRIPE_SECRET_KEY. Set it in .env.local or run:');
    console.error('  STRIPE_SECRET_KEY=sk_xxx node scripts/create-payment-link.js 390');
    process.exit(1);
  }

  const Stripe = (await import('stripe')).default;
  const stripe = new Stripe(key, { apiVersion: '2025-12-15.clover' });

  const amountCents = Math.round(amount * 100);
  const amountFormatted = amount % 1 === 0 ? amount.toFixed(0) : amount.toFixed(2);

  const link = await stripe.paymentLinks.create({
    line_items: [
      {
        price_data: {
          currency: 'usd',
          unit_amount: amountCents,
          product_data: {
            name: description,
            description: `One-time payment of $${amountFormatted}`,
          },
        },
        quantity: 1,
      },
    ],
    metadata: { type: 'one-time-client' },
  });

  console.log('\nPayment link created:\n');
  console.log(link.url);
  console.log('\nAmount: $%s USD | Description: %s\n', amountFormatted, description);
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
