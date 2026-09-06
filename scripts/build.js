// Build script: copies web assets into the www/ folder for Capacitor
const fs   = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const APP  = path.join(ROOT, 'app');
const WWW  = path.join(ROOT, 'www');

if (!fs.existsSync(WWW)) fs.mkdirSync(WWW);

// The native app ships the app/ folder only — the root index.html is the
// public pitch page for schools and is not bundled into the iOS/Android build.
const files = ['index.html', 'manifest.json', 'sw.js'];
files.forEach(f => {
  const src  = path.join(APP, f);
  const dest = path.join(WWW, f);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`✓ Copied ${f}`);
  } else {
    console.warn(`⚠ Skipped ${f} (not found)`);
  }
});

console.log('\n✅ Build complete → www/');
