import { createServer } from 'http';
import { readFile } from 'fs/promises';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const PORT = 3000;

const mime = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.mjs': 'application/javascript',
};

createServer(async (req, res) => {
  const url = req.url === '/' ? '/index.html' : req.url;
  const filePath = join(__dirname, url);
  try {
    const data = await readFile(filePath);
    const ct = mime[extname(filePath).toLowerCase()] ?? 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': ct });
    res.end(data);
  } catch {
    res.writeHead(404);
    res.end('Not found');
  }
}).listen(PORT, () => console.log(`http://localhost:${PORT}`));
