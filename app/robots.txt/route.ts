import { getRequestOriginFromHeaders } from '../../src/data/request-origin';

export const dynamic = 'force-dynamic';

export function GET(request: Request) {
  const origin = getRequestOriginFromHeaders(request.headers);
  const host = new URL(origin).host;

  return new Response(
    [
      'User-Agent: *',
      'Allow: /',
      'Disallow: /order',
      'Disallow: /user',
      '',
      `Host: ${host}`,
      `Sitemap: ${new URL('/sitemap.xml', origin).toString()}`,
      '',
    ].join('\n'),
    {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    },
  );
}
