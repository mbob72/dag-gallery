import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { basename, join } from 'node:path';

const paintingSourceDir = 'images/painting/images';
const graphicsSourceDir = 'images/graphics/artworks';
const publicRoot = 'public/artworks';

const painting = JSON.parse(readFileSync('images/painting/manifest.json', 'utf8'));
const graphics = JSON.parse(readFileSync('images/graphics/manifest.json', 'utf8'));
const categories = JSON.parse(readFileSync('images/categories.json', 'utf8'));
const supercategories = JSON.parse(readFileSync('images/supercategories.json', 'utf8'));
const categoryIds = new Set(categories.map((category) => category.id));

const translitMap = new Map(Object.entries({
  а: 'a',
  б: 'b',
  в: 'v',
  г: 'g',
  д: 'd',
  е: 'e',
  ё: 'e',
  ж: 'zh',
  з: 'z',
  и: 'i',
  й: 'y',
  к: 'k',
  л: 'l',
  м: 'm',
  н: 'n',
  о: 'o',
  п: 'p',
  р: 'r',
  с: 's',
  т: 't',
  у: 'u',
  ф: 'f',
  х: 'h',
  ц: 'ts',
  ч: 'ch',
  ш: 'sh',
  щ: 'sch',
  ъ: '',
  ы: 'y',
  ь: '',
  э: 'e',
  ю: 'yu',
  я: 'ya',
}));

function slugify(value) {
  return value
    .toLowerCase()
    .split('')
    .map((char) => translitMap.get(char) ?? char)
    .join('')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function normalizePainting(item) {
  const filename = basename(item.file);
  return {
    id: item.slug,
    source_id: `painting-${item.index}`,
    title: item.title,
    slug: item.slug,
    category: normalizeCategory(item.category),
    collection: 'painting',
    series: item.series,
    medium: item.medium,
    dimensions: item.dimensions,
    year: item.year,
    price_rub: item.price_rub,
    image: `/artworks/painting/${filename}`,
    original_file: `images/painting/${item.file}`,
    pdf_page: item.pdf_page,
    printed_page: null,
    width_px: item.width_px,
    height_px: item.height_px,
    format: item.format,
  };
}

function normalizeGraphics(item) {
  const title = item.visible_title || `Без названия ${item.id}`;
  const slugBase = item.visible_title ? slugify(item.visible_title) : `bez-nazvaniya-${item.id}`;
  return {
    id: `graphics-${slugBase}`,
    source_id: `graphics-${item.id}`,
    title,
    slug: `graphics-${slugBase}`,
    category: normalizeCategory(item.category || ['graphics']),
    collection: 'graphics',
    series: '',
    medium: '',
    dimensions: '',
    year: null,
    price_rub: null,
    image: `/artworks/graphics/${item.filename}`,
    original_file: `images/graphics/artworks/${item.filename}`,
    pdf_page: item.pdf_page,
    printed_page: item.printed_page,
    width_px: item.width_px,
    height_px: item.height_px,
    format: item.format,
  };
}

function normalizeCategory(value) {
  const ids = Array.isArray(value) ? value : [value];
  for (const id of ids) {
    if (!categoryIds.has(id)) {
      throw new Error(`Unknown category id: ${id}`);
    }
  }

  return ids;
}

function csvValue(value) {
  if (value === null || value === undefined) {
    return '';
  }

  const normalized = Array.isArray(value) ? value.join(';') : String(value);
  if (/[",\n]/.test(normalized)) {
    return `"${normalized.replace(/"/g, '""')}"`;
  }

  return normalized;
}

mkdirSync(join(publicRoot, 'painting'), { recursive: true });
mkdirSync(join(publicRoot, 'graphics'), { recursive: true });

for (const item of painting) {
  copyFileSync(join(paintingSourceDir, basename(item.file)), join(publicRoot, 'painting', basename(item.file)));
}

for (const item of graphics) {
  copyFileSync(join(graphicsSourceDir, item.filename), join(publicRoot, 'graphics', item.filename));
}

const artworks = [...painting.map(normalizePainting), ...graphics.map(normalizeGraphics)];
for (const supercategory of supercategories) {
  normalizeCategory(supercategory.category);
}

const columns = [
  'id',
  'source_id',
  'title',
  'slug',
  'category',
  'collection',
  'series',
  'medium',
  'dimensions',
  'year',
  'price_rub',
  'image',
  'original_file',
  'pdf_page',
  'printed_page',
  'width_px',
  'height_px',
  'format',
];

writeFileSync(join(publicRoot, 'manifest.json'), `${JSON.stringify(artworks, null, 2)}\n`);
writeFileSync(join(publicRoot, 'categories.json'), `${JSON.stringify(categories, null, 2)}\n`);
writeFileSync(join(publicRoot, 'supercategories.json'), `${JSON.stringify(supercategories, null, 2)}\n`);
writeFileSync(
  join(publicRoot, 'manifest.csv'),
  `${columns.join(',')}\n${artworks.map((item) => columns.map((column) => csvValue(item[column])).join(',')).join('\n')}\n`,
);
