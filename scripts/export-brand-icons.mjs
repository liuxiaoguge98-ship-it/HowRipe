// Uses Sharp already bundled with Next.js; no extra dependency or build hook.
import fs from 'node:fs/promises';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const sharp = createRequire(import.meta.resolve('next'))('sharp');
const publicDir = fileURLToPath(new URL('../public/', import.meta.url));
const mark = await fs.readFile(`${publicDir}brand/howripe-mark.svg`, 'utf8');
const drawing = mark.slice(mark.indexOf('>') + 1, mark.lastIndexOf('</svg>'));
const icon = `<svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 72 72"><rect width="72" height="72" fill="#F5F2E9"/><g transform="translate(4 0)">${drawing}</g></svg>\n`;
await fs.writeFile(`${publicDir}favicon.svg`, icon);
for (const [file, size] of [
  ['favicon-16x16.png', 16], ['favicon-32x32.png', 32],
  ['apple-touch-icon.png', 180], ['icon-192.png', 192], ['icon-512.png', 512],
]) {
  await sharp(Buffer.from(icon), { density: 768 }).resize(size, size).png().toFile(publicDir + file);
}

// ICO directory with standard PNG-encoded 16/32/48px frames.
const sizes = [16, 32, 48];
const frames = await Promise.all(sizes.map(size => sharp(Buffer.from(icon), { density: 768 }).resize(size, size).png().toBuffer()));
const directory = Buffer.alloc(6 + 16 * sizes.length);
directory.writeUInt16LE(1, 2);
directory.writeUInt16LE(sizes.length, 4);
let offset = directory.length;
frames.forEach((frame, index) => {
  const entry = 6 + 16 * index;
  directory[entry] = directory[entry + 1] = sizes[index];
  directory.writeUInt16LE(1, entry + 4);
  directory.writeUInt16LE(32, entry + 6);
  directory.writeUInt32LE(frame.length, entry + 8);
  directory.writeUInt32LE(offset, entry + 12);
  offset += frame.length;
});
await fs.writeFile(`${publicDir}favicon.ico`, Buffer.concat([directory, ...frames]));
for (const asset of ['howripe-mark', 'howripe-logo']) {
  const svg = await fs.readFile(`${publicDir}brand/${asset}.svg`, 'utf8');
  await fs.writeFile(`${publicDir}brand/${asset}-reverse.svg`, svg.replaceAll('#2F3B27', '#F5F2E9'));
}
console.log('Exported HowRipe A1 icons and reverse SVGs.');
