// Build script: copies web assets into the www/ folder for Capacitor
const fs   = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const WWW  = path.join(ROOT, 'www');

if (!fs.existsSync(WWW)) fs.mkdirSync(WWW);

// Only the app ships to iOS/Android. The pitch page in schools/ is a
// public web page for institutions and is deliberately left out.
const files = ['index.html', 'manifest.json', 'sw.js'];
files.forEach(f => {
  const src  = path.join(ROOT, f);
  const dest = path.join(WWW, f);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`✓ Copied ${f}`);
  } else {
    console.warn(`⚠ Skipped ${f} (not found)`);
  }
});

console.log('\n✅ Build complete → www/');
