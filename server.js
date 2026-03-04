import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { CMBRdb } from './cmbr-db.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: './.env' });

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files from the current directory
app.use(express.static(__dirname));

/**
 * API endpoint to fetch blog data
 * GET /api/blog
 */
app.get('/api/blog', async (req, res) => {
  try {
    const data = await CMBRdb.CMBRdbSelect('*');
    res.json(data);
  } catch (error) {
    console.error('Error fetching blog data:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * Health check endpoint
 */
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

const PORT = process.env.SUPABASE_DB_PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
