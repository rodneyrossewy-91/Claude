const path = require("path");
const fs = require("fs");
const express = require("express");
const session = require("express-session");
const bcrypt = require("bcryptjs");
const multer = require("multer");

const db = require("./lib/db");
const { requireAuth } = require("./middleware/auth");

const SITE_ROOT = path.join(__dirname, "..");
const UPLOADS_DIR = process.env.DATA_DIR
  ? path.join(process.env.DATA_DIR, "uploads")
  : path.join(__dirname, "uploads");
fs.mkdirSync(UPLOADS_DIR, { recursive: true });

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET || "rossewij-dev-secret-change-me",
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true, maxAge: 8 * 60 * 60 * 1000 },
  })
);

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => cb(null, UPLOADS_DIR),
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname) || "";
      cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`);
    },
  }),
  limits: { fileSize: 8 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!/^image\/(jpeg|png|webp|gif)$/.test(file.mimetype)) {
      return cb(new Error("Alleen afbeeldingen (jpg, png, webp, gif) zijn toegestaan."));
    }
    cb(null, true);
  },
});

app.use("/uploads", express.static(UPLOADS_DIR));

/* ---------- Auth ---------- */

app.post("/api/login", (req, res) => {
  const { username, password } = req.body || {};
  const data = db.read();
  const user = data.users.find((u) => u.username === username);
  if (!user || !bcrypt.compareSync(password || "", user.passwordHash)) {
    return res.status(401).json({ error: "Onjuiste gebruikersnaam of wachtwoord." });
  }
  req.session.userId = user.id;
  req.session.username = user.username;
  res.json({ username: user.username });
});

app.post("/api/logout", (req, res) => {
  req.session.destroy(() => res.json({ ok: true }));
});

app.get("/api/session", (req, res) => {
  if (!req.session.userId) return res.json({ loggedIn: false });
  res.json({ loggedIn: true, username: req.session.username });
});

/* ---------- Projects ---------- */

app.get("/api/projects", (req, res) => {
  const data = db.read();
  res.json(data.projects.sort((a, b) => b.id - a.id));
});

app.post(
  "/api/projects",
  requireAuth,
  upload.fields([{ name: "beforeImage", maxCount: 1 }, { name: "afterImage", maxCount: 1 }]),
  (req, res) => {
    const { title, location, category, description } = req.body || {};
    if (!title || !location || !category) {
      return res.status(400).json({ error: "Titel, locatie en categorie zijn verplicht." });
    }
    const data = db.read();
    const id = data.nextProjectId++;
    const beforeImage = req.files?.beforeImage?.[0];
    const afterImage = req.files?.afterImage?.[0];
    const project = {
      id,
      title,
      location,
      category,
      description: description || "",
      beforeImageUrl: beforeImage ? `/uploads/${beforeImage.filename}` : null,
      afterImageUrl: afterImage ? `/uploads/${afterImage.filename}` : null,
      createdAt: new Date().toISOString(),
    };
    data.projects.push(project);
    db.write(data);
    res.status(201).json(project);
  }
);

app.delete("/api/projects/:id", requireAuth, (req, res) => {
  const data = db.read();
  const id = Number(req.params.id);
  const project = data.projects.find((p) => p.id === id);
  if (!project) return res.status(404).json({ error: "Project niet gevonden." });
  [project.beforeImageUrl, project.afterImageUrl].forEach((url) => {
    if (!url) return;
    const filePath = path.join(UPLOADS_DIR, path.basename(url));
    fs.unlink(filePath, () => {});
  });
  data.projects = data.projects.filter((p) => p.id !== id);
  db.write(data);
  res.json({ ok: true });
});

/* ---------- Offerte calculaties ---------- */

app.get("/api/offers", requireAuth, (req, res) => {
  const data = db.read();
  res.json(data.offers.sort((a, b) => b.id - a.id));
});

app.post("/api/offers", requireAuth, (req, res) => {
  const { klantNaam, adres, items, materiaalkosten, reiskosten } = req.body || {};
  if (!klantNaam || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: "Klantnaam en minimaal 1 oppervlakte-regel zijn verplicht." });
  }
  const cleanItems = items.map((it) => ({
    omschrijving: String(it.omschrijving || "").slice(0, 200),
    m2: Number(it.m2) || 0,
    prijsPerM2: Number(it.prijsPerM2) || 0,
  }));
  const arbeidstotaal = cleanItems.reduce((sum, it) => sum + it.m2 * it.prijsPerM2, 0);
  const materiaal = Number(materiaalkosten) || 0;
  const reis = Number(reiskosten) || 0;
  const totaal = arbeidstotaal + materiaal + reis;

  const data = db.read();
  const id = data.nextOfferId++;
  const offer = {
    id,
    klantNaam,
    adres: adres || "",
    items: cleanItems,
    arbeidstotaal,
    materiaalkosten: materiaal,
    reiskosten: reis,
    totaal,
    createdAt: new Date().toISOString(),
  };
  data.offers.push(offer);
  db.write(data);
  res.status(201).json(offer);
});

app.delete("/api/offers/:id", requireAuth, (req, res) => {
  const data = db.read();
  const id = Number(req.params.id);
  data.offers = data.offers.filter((o) => o.id !== id);
  db.write(data);
  res.json({ ok: true });
});

/* ---------- Static site ---------- */

app.use(express.static(SITE_ROOT, { extensions: ["html"] }));

app.use((err, req, res, next) => {
  if (req.path.startsWith("/api/")) {
    return res.status(400).json({ error: err.message || "Er ging iets mis." });
  }
  next(err);
});

app.listen(PORT, () => {
  console.log(`Rossewij site + admin draait op http://localhost:${PORT}`);
});
