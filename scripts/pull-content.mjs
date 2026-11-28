// Build step on Cloudflare Pages: overwrite content/*.json with the latest data from D1.
// Without CF_ACCOUNT_ID / CF_API_TOKEN / D1_DATABASE_ID (local dev) it does nothing and the committed JSON is used.
import fs from 'node:fs';

const { CF_ACCOUNT_ID, CF_API_TOKEN, D1_DATABASE_ID } = process.env;
if (!CF_ACCOUNT_ID || !CF_API_TOKEN || !D1_DATABASE_ID) {
  console.log('pull-content: no D1 credentials, using committed content/*.json');
  process.exit(0);
}

async function query(sql) {
  const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${CF_ACCOUNT_ID}/d1/database/${D1_DATABASE_ID}/query`, {
    method: 'POST',
    headers: { authorization: `Bearer ${CF_API_TOKEN}`, 'content-type': 'application/json' },
    body: JSON.stringify({ sql }),
  });
  const body = await response.json();
  if (!response.ok || !body.success) throw new Error(`D1 query failed: ${JSON.stringify(body.errors ?? body)}`);
  return body.result[0].results;
}

const rows = await query('SELECT slug, vi, en FROM products ORDER BY sort');
const texts = Object.fromEntries((await query("SELECT key, json FROM texts WHERE key IN ('strings-vi', 'strings-en')")).map(row => [row.key, row.json]));
// An empty DB would silently wipe the site: refuse instead.
if (!rows.length || !texts['strings-vi'] || !texts['strings-en']) throw new Error('pull-content: D1 is empty or incomplete, aborting build');

const write = (file, value) => fs.writeFileSync(new URL(`../content/${file}`, import.meta.url), JSON.stringify(value, null, 2) + '\n');
write('products.json', rows.map(row => JSON.parse(row.vi)));
write('products-en.json', Object.fromEntries(rows.map(row => [row.slug, JSON.parse(row.en)])));
write('strings-vi.json', JSON.parse(texts['strings-vi']));
write('strings-en.json', JSON.parse(texts['strings-en']));
console.log(`pull-content: ${rows.length} products from D1`);
