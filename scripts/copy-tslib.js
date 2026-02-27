import { copyFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');
const sourceDir = join(rootDir, 'node_modules', 'tslib', 'modules');
const targetDir = join(rootDir, 'dist', 'analog', 'server', 'node_modules', 'tslib', 'modules');

// Create target directory if it doesn't exist
if (!existsSync(targetDir)) {
    mkdirSync(targetDir, { recursive: true });
}

// Copy files from source to target
const filesToCopy = ['index.js', 'index.d.ts', 'package.json'];
for (const file of filesToCopy) {
    const sourceFile = join(sourceDir, file);
    const targetFile = join(targetDir, file);

    if (existsSync(sourceFile)) {
        copyFileSync(sourceFile, targetFile);
        console.log(`Copied ${file} to ${targetDir}`);
    } else {
        console.warn(`Source file not found: ${sourceFile}`);
    }
}

console.log('tslib modules copied successfully');
