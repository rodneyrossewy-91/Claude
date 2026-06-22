const fs = require("fs");
const path = require("path");

const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, "..", "data");
const FILE = path.join(DATA_DIR, "store.json");
const SEED_FILE = path.join(__dirname, "..", "data", "store.json");

fs.mkdirSync(DATA_DIR, { recursive: true });
if (!fs.existsSync(FILE)) {
  fs.copyFileSync(SEED_FILE, FILE);
}

function read() {
  return JSON.parse(fs.readFileSync(FILE, "utf8"));
}

function write(data) {
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
}

module.exports = { read, write };
