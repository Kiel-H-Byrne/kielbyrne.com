/**
 * Persona Dropzone & Manifest Synchronization Tool
 *
 * Usage:
 *   node scripts/sync-personas.mjs
 *
 * Behavior:
 *   1. Scans `public/img/personas/dropzone/` for image files (.png, .jpg, .jpeg, .webp, .svg).
 *   2. If a matching `.json` exists (e.g. `cyber-samurai.json` alongside `cyber-samurai.png`),
 *      its fields (name, hat, role, source, tagline, realWorldHat, etc.) are used.
 *   3. If no JSON exists, smart defaults are inferred from the filename.
 *   4. Moves processed images into `public/img/personas/` and updates `data/personas.json`.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_DIR = path.resolve(__dirname, "..");
const PERSONAS_DIR = path.join(ROOT_DIR, "public", "img", "personas");
const DROPZONE_DIR = path.join(PERSONAS_DIR, "dropzone");
const MANIFEST_PATH = path.join(ROOT_DIR, "data", "personas.json");

const SUPPORTED_EXTS = new Set([".png", ".jpg", ".jpeg", ".webp", ".svg"]);

const COLOR_PALETTES = [
  {
    tagBg: "bg-cyan-950/80 border-cyan-800/80 text-cyan-300",
    accentColor: "text-cyan-400",
    glowColor: "from-cyan-500/40 via-blue-500/30 to-purple-600/40",
    borderColor: "border-cyan-500/40",
  },
  {
    tagBg: "bg-emerald-950/80 border-emerald-800/80 text-emerald-300",
    accentColor: "text-emerald-400",
    glowColor: "from-emerald-500/40 via-teal-500/30 to-blue-600/40",
    borderColor: "border-emerald-500/40",
  },
  {
    tagBg: "bg-purple-950/80 border-purple-800/80 text-purple-300",
    accentColor: "text-purple-400",
    glowColor: "from-purple-500/40 via-fuchsia-500/30 to-indigo-600/40",
    borderColor: "border-purple-500/40",
  },
  {
    tagBg: "bg-amber-950/80 border-amber-800/80 text-amber-300",
    accentColor: "text-amber-400",
    glowColor: "from-amber-500/40 via-orange-500/30 to-yellow-600/40",
    borderColor: "border-amber-500/40",
  },
  {
    tagBg: "bg-rose-950/80 border-rose-800/80 text-rose-300",
    accentColor: "text-rose-400",
    glowColor: "from-rose-500/40 via-pink-500/30 to-amber-600/40",
    borderColor: "border-rose-500/40",
  },
  {
    tagBg: "bg-fuchsia-950/80 border-fuchsia-800/80 text-fuchsia-300",
    accentColor: "text-fuchsia-400",
    glowColor: "from-fuchsia-500/40 via-purple-500/30 to-cyan-600/40",
    borderColor: "border-fuchsia-500/40",
  },
];

function titleCase(str) {
  return str.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

async function run() {
  if (!fs.existsSync(DROPZONE_DIR)) {
    fs.mkdirSync(DROPZONE_DIR, { recursive: true });
  }

  let personas = [];
  if (fs.existsSync(MANIFEST_PATH)) {
    try {
      personas = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf-8"));
    } catch (err) {
      console.error(
        "Failed to parse personas.json, starting empty:",
        err.message
      );
      personas = [];
    }
  }

  const dropzoneFiles = fs.readdirSync(DROPZONE_DIR);
  const imageFiles = dropzoneFiles.filter((file) =>
    SUPPORTED_EXTS.has(path.extname(file).toLowerCase())
  );

  if (imageFiles.length === 0) {
    console.log("No new images in dropzone (public/img/personas/dropzone/).");
    console.log(`Current personas in carousel: ${personas.length}`);
    return;
  }

  console.log(`Found ${imageFiles.length} new image(s) in dropzone...`);

  let addedCount = 0;

  for (const file of imageFiles) {
    const ext = path.extname(file);
    const basename = path.basename(file, ext);
    const id = basename.toLowerCase().replace(/[^a-z0-9_-]/g, "-");

    const sourceImagePath = path.join(DROPZONE_DIR, file);
    const targetImagePath = path.join(PERSONAS_DIR, file);

    // Check for sidecar JSON
    const sidecarJsonPath = path.join(DROPZONE_DIR, `${basename}.json`);
    let metadata = {};
    if (fs.existsSync(sidecarJsonPath)) {
      try {
        metadata = JSON.parse(fs.readFileSync(sidecarJsonPath, "utf-8"));
      } catch (e) {
        console.warn(`Could not parse sidecar JSON for ${file}:`, e.message);
      }
    }

    // Pick a palette deterministically or from metadata
    const paletteIndex = personas.length % COLOR_PALETTES.length;
    const defaultPalette = COLOR_PALETTES[paletteIndex];

    const newPersona = {
      id: metadata.id || id,
      name: metadata.name || `The ${titleCase(basename)}`,
      hat: metadata.hat || "Persona Dimension",
      role: metadata.role || "Multidisciplinary Explorer",
      source: metadata.source || "AI Character Rendition",
      image: `/img/personas/${file}`,
      tagBg: metadata.tagBg || defaultPalette.tagBg,
      accentColor: metadata.accentColor || defaultPalette.accentColor,
      glowColor: metadata.glowColor || defaultPalette.glowColor,
      borderColor: metadata.borderColor || defaultPalette.borderColor,
      tagline:
        metadata.tagline ||
        `Representing another creative and technical hat in the journey.`,
      realWorldHat:
        metadata.realWorldHat ||
        `Exploration of systems, craft, and multidisciplinary skills.`,
      ...(metadata.dateAdded
        ? { dateAdded: metadata.dateAdded }
        : { dateAdded: new Date().toISOString() }),
    };

    // Move file to personas folder
    fs.copyFileSync(sourceImagePath, targetImagePath);
    fs.unlinkSync(sourceImagePath);

    // Clean up sidecar JSON if present
    if (fs.existsSync(sidecarJsonPath)) {
      fs.unlinkSync(sidecarJsonPath);
    }

    // Upsert into personas array
    const existingIndex = personas.findIndex((p) => p.id === newPersona.id);
    if (existingIndex >= 0) {
      personas[existingIndex] = { ...personas[existingIndex], ...newPersona };
      console.log(
        `Updated existing persona: "${newPersona.name}" (${newPersona.id})`
      );
    } else {
      personas.push(newPersona);
      console.log(`Added new persona: "${newPersona.name}" (${newPersona.id})`);
    }

    addedCount++;
  }

  // Write updated manifest
  fs.writeFileSync(
    MANIFEST_PATH,
    JSON.stringify(personas, null, 2) + "\n",
    "utf-8"
  );
  console.log(
    `Successfully synced ${addedCount} persona(s). Total: ${personas.length}`
  );
}

run().catch((err) => {
  console.error("Sync error:", err);
  process.exit(1);
});
