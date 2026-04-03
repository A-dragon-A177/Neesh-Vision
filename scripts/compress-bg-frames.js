const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const INPUT_DIR = path.join(__dirname, '..', 'artifacts', 'background');
const OUTPUT_DIR = path.join(__dirname, '..', 'artifacts', 'neesh-ai', 'public', 'bg-frames');
const SAMPLE_EVERY = 4; // Take every 4th frame
const WEBP_QUALITY = 72;
const TARGET_WIDTH = 1920;
const TARGET_HEIGHT = 1080;

async function main() {
  // Create output directory
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Get all PNG files sorted
  const files = fs.readdirSync(INPUT_DIR)
    .filter(f => f.endsWith('.png'))
    .sort();

  console.log(`Found ${files.length} PNG files in source directory`);

  // Sample every Nth frame
  const sampled = files.filter((_, i) => i % SAMPLE_EVERY === 0);
  console.log(`Sampling every ${SAMPLE_EVERY}th frame: ${sampled.length} frames to process`);

  let totalInputSize = 0;
  let totalOutputSize = 0;
  let processed = 0;

  for (const file of sampled) {
    const inputPath = path.join(INPUT_DIR, file);
    const frameNum = String(processed + 1).padStart(4, '0');
    const outputPath = path.join(OUTPUT_DIR, `frame-${frameNum}.webp`);

    const inputStats = fs.statSync(inputPath);
    totalInputSize += inputStats.size;

    await sharp(inputPath)
      .resize(TARGET_WIDTH, TARGET_HEIGHT, {
        fit: 'cover',
        position: 'center',
      })
      .webp({ quality: WEBP_QUALITY, effort: 4 })
      .toFile(outputPath);

    const outputStats = fs.statSync(outputPath);
    totalOutputSize += outputStats.size;

    processed++;
    if (processed % 20 === 0 || processed === sampled.length) {
      console.log(`  Processed ${processed}/${sampled.length} frames...`);
    }
  }

  console.log('\n=== Compression Complete ===');
  console.log(`Input:  ${sampled.length} frames, ${(totalInputSize / 1024 / 1024).toFixed(1)} MB total`);
  console.log(`Output: ${processed} frames, ${(totalOutputSize / 1024 / 1024).toFixed(1)} MB total`);
  console.log(`Compression ratio: ${(totalInputSize / totalOutputSize).toFixed(1)}x`);
  console.log(`Average frame size: ${(totalOutputSize / processed / 1024).toFixed(1)} KB`);
  console.log(`Output directory: ${OUTPUT_DIR}`);
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
