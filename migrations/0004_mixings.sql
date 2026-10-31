-- Cloudflare D1 Migration for Mixings & Formulas
CREATE TABLE IF NOT EXISTS mixings (
  id TEXT PRIMARY KEY NOT NULL,
  batch_number TEXT,
  perfume_name TEXT NOT NULL,
  sales_man_id TEXT,
  sales_man_name TEXT,
  total_oil_grams REAL,
  total_volume REAL,
  price REAL,
  payload TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT
);

CREATE INDEX IF NOT EXISTS idx_mixings_created ON mixings(created_at);
CREATE INDEX IF NOT EXISTS idx_mixings_batch ON mixings(batch_number);
