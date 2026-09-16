/**
 * Automated Multi-Source Persona Generator Pipeline
 *
 * Usage:
 *   node scripts/generate-ai-persona.mjs
 *
 * Pipeline Concept:
 *   1. Scans `public/img/personas/sources/` to sample real-world reference photos
 *      (e.g. iPhone, Google Photos, Amazon Photos) capturing authentic, evolving visage.
 *   2. Selects a dimension/hat and pairs it with a distinct artistic medium (e.g.
 *      editorial portraiture, watercolor wash, architectural vector, neo-noir, 3D clay)
 *      to eliminate clone syndrome.
 *   3. Prepares a multi-source blending manifest in `public/img/personas/dropzone/`.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");
const SOURCES_DIR = path.join(ROOT_DIR, "public", "img", "personas", "sources");
const DROPZONE_DIR = path.join(
  ROOT_DIR,
  "public",
  "img",
  "personas",
  "dropzone"
);

const SUPPORTED_EXTS = new Set([".png", ".jpg", ".jpeg", ".webp"]);

// Diverse creative archetypes across varied artistic mediums
const PERSONA_TEMPLATES = [
  {
    idPrefix: "editorial-systems-consultant",
    name: "The Systems Architect",
    hat: "Enterprise & Advisory",
    role: "Founder @ TenK Solutions • IT Board Member",
    source: "Multi-Source Visage Blend",
    styleMedium: "Cinematic Editorial Portraiture",
    tagline: "Quiet mastery of complex enterprise topologies and data flow.",
    realWorldHat:
      "Enterprise asset telemetry, zero-trust infrastructure, and fractional systems leadership.",
    promptTemplate: (sources) =>
      `Cinematic editorial portrait of the subject based on facial references (${sources.join(
        ", "
      )}): a distinguished Black man in an architectural loft studio overlooking the city skyline. Moody chiaroscuro key lighting, high dynamic range 35mm film grain, modern bespoke navy blazer, subtle holographic network topologies reflected in the glass window. Realistic, authentic expression, 1:1 square portrait.`,
  },
  {
    idPrefix: "analog-sound-producer",
    name: "The Sound Alchemist",
    hat: "Voiceover & Audio",
    role: "Voice Actor • Producer • Sound Designer",
    source: "Multi-Source Visage Blend",
    styleMedium: "Atmospheric Neo-Soul / Risograph Print",
    tagline:
      "Carving frequencies that move the soul and bring characters to life.",
    realWorldHat:
      "Voiceover for NORTA/New Orleans, commercial voice acting, and beat production in Logic Pro.",
    promptTemplate: (sources) =>
      `Atmospheric stylized portrait blending real facial likeness from (${sources.join(
        ", "
      )}): the subject in a warm, dimly lit audio lab with headphones draped around his neck. Vintage ribbon microphone in front, warm amber lamps and deep violet studio acoustics. Textured risograph / fine-art screenprint styling with warm soul vibrations. 1:1 square portrait.`,
  },
  {
    idPrefix: "physical-cad-designer",
    name: "The Physical Craftsman",
    hat: "Mechanical Systems",
    role: "B.S. Mechanical Engineering (UMBC)",
    source: "Multi-Source Visage Blend",
    styleMedium: "Technical Drafting & Watercolor Wash",
    tagline:
      "Respect for fluid mechanics, physical tolerances, and structural integrity.",
    realWorldHat:
      "Plumbing systems design (NYU), AutoCAD/SolidWorks modeling, and 3D additive manufacturing.",
    promptTemplate: (sources) =>
      `Concept illustration blending subject's authentic features from (${sources.join(
        ", "
      )}): focused in an engineering studio examining physical piping schematics and mechanical gear assemblies. Blueprint cyan lines and warm sepia watercolor wash, drafting pencil in hand. Tactile, organic, master craftsman feel, 1:1 square portrait.`,
  },
  {
    idPrefix: "community-mural-mentor",
    name: "The Diaspora Builder",
    hat: "Community & Ethos",
    role: "Creator of The MOBB • Youth AI Mentor",
    source: "Multi-Source Visage Blend",
    styleMedium: "Vibrant Contemporary Street Mural",
    tagline:
      "Connecting culture, moral craftsmanship, and generational empowerment.",
    realWorldHat:
      "The MOBB (Map of Black Businesses), youth AI authorship mentorship, and Freemasonry.",
    promptTemplate: (sources) =>
      `Contemporary cultural street mural portrait blending likeness from (${sources.join(
        ", "
      )}): warm, beaming smile of the subject against an uplifting urban cityscape backdrop with geometric cultural motifs and glowing community map constellations. Rich earth tones, sun-drenched gold and terracotta palette, expressive brushstrokes. 1:1 square portrait.`,
  },
];

async function generate() {
  if (!fs.existsSync(DROPZONE_DIR)) {
    fs.mkdirSync(DROPZONE_DIR, { recursive: true });
  }

  // Scan source pool
  let sourcePhotos = [];
  if (fs.existsSync(SOURCES_DIR)) {
    sourcePhotos = fs
      .readdirSync(SOURCES_DIR)
      .filter((f) => SUPPORTED_EXTS.has(path.extname(f).toLowerCase()));
  }

  console.log(`\n=== Persona Multi-Source Generation Pipeline ===`);
  console.log(
    `Source Visage Pool: ${sourcePhotos.length} photo(s) found in public/img/personas/sources/`
  );

  if (sourcePhotos.length === 0) {
    console.log(
      `⚠️ Tip: Drop 3-5 real photos from your iPhone or Google/Amazon Photos into 'public/img/personas/sources/' for maximum fidelity and to evolve with your real visage!`
    );
  } else {
    console.log(
      `Active source references: ${sourcePhotos.slice(0, 4).join(", ")}`
    );
  }

  // Pick a template
  const index = Math.floor(Math.random() * PERSONA_TEMPLATES.length);
  const template = PERSONA_TEMPLATES[index];
  const timestamp = Date.now();
  const filename = `${template.idPrefix}-${timestamp}`;

  const sampledSources =
    sourcePhotos.length > 0
      ? sourcePhotos.slice(0, 3)
      : ["kiel_classic_bw.jpg"];

  const prompt = template.promptTemplate(sampledSources);

  console.log(`\nTarget Concept: "${template.name}" (${template.hat})`);
  console.log(`Artistic Medium: ${template.styleMedium}`);
  console.log(`Prompt: ${prompt}\n`);

  // Stage dropzone metadata
  const metadata = {
    id: `${template.idPrefix}-${timestamp}`,
    name: template.name,
    hat: template.hat,
    role: template.role,
    source: template.source,
    styleMedium: template.styleMedium,
    tagline: template.tagline,
    realWorldHat: template.realWorldHat,
    sourceReferencesUsed: sampledSources,
    generatedPrompt: prompt,
    dateAdded: new Date().toISOString(),
  };

  const metadataPath = path.join(DROPZONE_DIR, `${filename}.json`);
  fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2), "utf-8");

  console.log(`Staged generation metadata in: ${metadataPath}`);
  console.log(
    `When rendered image is saved as ${filename}.png in dropzone, run 'npm run personas:sync' to publish.`
  );
}

generate().catch(console.error);
