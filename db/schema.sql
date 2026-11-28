-- vi = Product JSON (lib/product-schema.ts), en = TranslatedProduct JSON. sort = order on the site.
CREATE TABLE IF NOT EXISTS products (slug TEXT PRIMARY KEY, sort INTEGER NOT NULL, vi TEXT NOT NULL, en TEXT NOT NULL, updated_at TEXT, updated_by TEXT);
-- key: strings-vi | strings-en | meta (published_at)
CREATE TABLE IF NOT EXISTS texts (key TEXT PRIMARY KEY, json TEXT NOT NULL, updated_at TEXT, updated_by TEXT);
CREATE TABLE IF NOT EXISTS users (email TEXT PRIMARY KEY, role TEXT NOT NULL CHECK (role IN ('admin', 'editor')));
