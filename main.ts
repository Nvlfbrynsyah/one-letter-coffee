import * as fs from 'fs';
import * as path from 'path';

// Program writes exactly one byte ('A') with no trailing newline,
// because the sealed gate requires entry.txt to be exactly 1 character.
const LETTER: string = 'A';

// Validate letter constant is exactly one uppercase A-Z letter
if (!/^[A-Z]$/.test(LETTER)) {
  console.error(`Error: Invalid letter constant "${LETTER}". Must be a single uppercase letter A-Z.`);
  process.exit(1);
}

const args: string[] = process.argv.slice(2);

if (args.includes('--help') || args.includes('-h')) {
  console.log('Usage: node main.ts [--help] [--version]');
  process.exit(0);
}

if (args.includes('--version') || args.includes('-v')) {
  console.log('one-letter-coffee A v1');
  process.exit(0);
}

const outputDir: string = process.env.MAKEFUN_OUTPUT_DIR || '/output';

try {
  fs.mkdirSync(outputDir, { recursive: true });
  const entryPath = path.join(outputDir, 'entry.txt');
  fs.writeFileSync(entryPath, LETTER, { encoding: 'utf8' });
  process.stderr.write(`Wrote letter ${LETTER} to ${entryPath}\n`);
} catch (err: any) {
  console.error(`Error writing entry.txt: ${err.message}`);
  process.exit(1);
}
