import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Suporte para ESModules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Caminho para o banco SQLite
const dbPath = path.join(__dirname, "../../db/dev.sqlite3");

console.log("Caminho do banco:", dbPath);

export default dbPath;
