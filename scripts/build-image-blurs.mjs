import { readdirSync, statSync, writeFileSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import sharp from 'sharp';

const publicRoot = 'public';
const outputFile = 'src/data/image-blurs.ts';
const imageExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp']);

function getExtension(path) {
  const index = path.lastIndexOf('.');
  return index === -1 ? '' : path.slice(index).toLowerCase();
}

function listImages(dir) {
  return readdirSync(dir)
    .flatMap((entry) => {
      const path = join(dir, entry);
      const stats = statSync(path);

      if (stats.isDirectory()) {
        return listImages(path);
      }

      return imageExtensions.has(getExtension(path)) ? [path] : [];
    })
    .sort();
}

async function createBlurDataUrl(filePath) {
  const buffer = await sharp(filePath)
    .rotate()
    .resize({ width: 16, height: 16, fit: 'inside' })
    .webp({ quality: 35 })
    .toBuffer();

  return `data:image/webp;base64,${buffer.toString('base64')}`;
}

const entries = await Promise.all(
  listImages(publicRoot).map(async (filePath) => {
    const publicPath = `/${relative(publicRoot, filePath).split(sep).join('/')}`;

    return [publicPath, await createBlurDataUrl(filePath)];
  }),
);

const lines = entries
  .map(([path, blurDataURL]) => `  ${JSON.stringify(path)}: ${JSON.stringify(blurDataURL)},`)
  .join('\n');

writeFileSync(
  outputFile,
  `export const IMAGE_BLURS: Record<string, string> = {\n${lines}\n};\n`,
);
