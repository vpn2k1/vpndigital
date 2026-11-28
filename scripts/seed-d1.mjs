// Writes db/seed.sql from the committed content/*.json. Usage: node scripts/seed-d1.mjs admin@example.com
// then: npx wrangler d1 execute vpndigital --remote --file db/schema.sql && npx wrangler d1 execute vpndigital --remote --file db/seed.sql
import fs from 'node:fs';

const admin = process.argv[2]?.trim().toLowerCase();
if (!admin?.includes('@')) throw new Error('Usage: node scripts/seed-d1.mjs <admin-email>');
const read = file => JSON.parse(fs.readFileSync(new URL(`../content/${file}`, import.meta.url), 'utf8'));
const q = value => `'${String(value).replaceAll("'", "''")}'`;
const products = read('products.json');
const english = read('products-en.json');
const time = new Date().toISOString();

const sql = [
  ...products.map((product, sort) => {
    if (!english[product.slug]) throw new Error(`Missing English for ${product.slug}`);
    return `INSERT OR REPLACE INTO products (slug, sort, vi, en, updated_at, updated_by) VALUES (${q(product.slug)}, ${sort}, ${q(JSON.stringify(product))}, ${q(JSON.stringify(english[product.slug]))}, ${q(time)}, 'seed');`;
  }),
  ...['strings-vi', 'strings-en'].map(key => `INSERT OR REPLACE INTO texts (key, json, updated_at, updated_by) VALUES (${q(key)}, ${q(JSON.stringify(read(`${key}.json`)))}, ${q(time)}, 'seed');`),
  `INSERT OR REPLACE INTO texts (key, json, updated_at, updated_by) VALUES ('meta', ${q(JSON.stringify({ publishedAt: time, by: 'seed' }))}, NULL, 'seed');`,
  `INSERT OR REPLACE INTO users (email, role) VALUES (${q(admin)}, 'admin');`,
];
fs.writeFileSync(new URL('../db/seed.sql', import.meta.url), sql.join('\n') + '\n');
console.log(`db/seed.sql: ${products.length} products, 2 texts, admin ${admin}`);
