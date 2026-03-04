import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files from the current directory
app.use(express.static(__dirname));

const PORT = 4265;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
