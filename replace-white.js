const fs = require('fs');
const path = require('path');

function replaceInDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      replaceInDir(fullPath);
    } else if (fullPath.endsWith('.tsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      content = content.replace(/bg-white\/5/g, 'bg-surface-border');
      content = content.replace(/hover:bg-white/g, 'hover:bg-foreground hover:text-background-dark');
      fs.writeFileSync(fullPath, content);
    }
  }
}

replaceInDir('./app');
replaceInDir('./components');
