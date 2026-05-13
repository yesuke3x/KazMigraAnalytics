// Custom build for Onspace: bypass Vite, copy all static files to dist/
import fs from 'node:fs';
import path from 'node:path';

const DIST = 'dist';
const ROOT_FILES = [
  'index.html',
  'about.html',
  'analysis.html',
  'ai-assistant.html',
  'visualization.html',
  'style.css',
];

fs.rmSync(DIST, { recursive: true, force: true });
fs.mkdirSync(DIST, { recursive: true });

for (const f of ROOT_FILES) {
  if (fs.existsSync(f)) {
    fs.copyFileSync(f, path.join(DIST, f));
    console.log('copied', f);
  } else {
    console.warn('missing', f);
  }
}

function copyDir(src, dst) {
  fs.mkdirSync(dst, { recursive: true });
  for (const item of fs.readdirSync(src)) {
    const s = path.join(src, item);
    const d = path.join(dst, item);
    const stat = fs.statSync(s);
    if (stat.isDirectory()) copyDir(s, d);
    else fs.copyFileSync(s, d);
  }
}

if (fs.existsSync('public')) {
  for (const item of fs.readdirSync('public')) {
    const s = path.join('public', item);
    const d = path.join(DIST, item);
    if (fs.statSync(s).isDirectory()) copyDir(s, d);
    else fs.copyFileSync(s, d);
  }
  console.log('copied public/* into dist/');
}

console.log('Build complete:', DIST);
