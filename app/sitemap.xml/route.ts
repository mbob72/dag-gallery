import { artworks, categories, supercategories } from '../../src/data/artworks';
import { getRequestOriginFromHeaders } from '../../src/data/request-origin';

export const dynamic = 'force-dynamic';

function escapeXml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function url(origin: string, path: string) {
  return new URL(path, origin).toString();
}

function renderUrl({
  loc,
  lastModified,
  changeFrequency,
  priority,
  images = [],
}: {
  loc: string;
  lastModified: Date;
  changeFrequency: 'weekly' | 'monthly';
  priority: number;
  images?: string[];
}) {
  return [
    '<url>',
    `<loc>${escapeXml(loc)}</loc>`,
    ...images.flatMap((image) => [
      '<image:image>',
      `<image:loc>${escapeXml(image)}</image:loc>`,
      '</image:image>',
    ]),
    `<lastmod>${lastModified.toISOString()}</lastmod>`,
    `<changefreq>${changeFrequency}</changefreq>`,
    `<priority>${priority}</priority>`,
    '</url>',
  ].join('\n');
}

export function GET(request: Request) {
  const origin = getRequestOriginFromHeaders(request.headers);
  const now = new Date();
  const entries = [
    renderUrl({
      loc: url(origin, '/'),
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    }),
    ...supercategories.map((supercategory) =>
      renderUrl({
        loc: url(origin, `/supercategory/${supercategory.id}`),
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.8,
      }),
    ),
    ...categories.map((category) =>
      renderUrl({
        loc: url(origin, `/category/${category.id}`),
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.75,
      }),
    ),
    ...artworks.map((artwork) =>
      renderUrl({
        loc: url(origin, `/poster/${artwork.id}`),
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.65,
        images: [url(origin, artwork.image)],
      }),
    ),
  ];

  return new Response(
    [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">',
      entries.join('\n'),
      '</urlset>',
      '',
    ].join('\n'),
    {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
      },
    },
  );
}
