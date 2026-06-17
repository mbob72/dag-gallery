import { SITE_URL } from '../../src/data/content';

export const dynamic = 'force-dynamic';

function getOrigin(request: Request) {
  const forwardedHost = request.headers.get('x-forwarded-host')?.split(',')[0]?.trim();
  const host = forwardedHost || request.headers.get('host');

  if (host) {
    const forwardedProto = request.headers.get('x-forwarded-proto')?.split(',')[0]?.trim();
    let fallbackProto = 'https';

    try {
      fallbackProto = new URL(request.url).protocol.replace(':', '');
    } catch {
      fallbackProto = 'https';
    }

    const proto = forwardedProto || fallbackProto || 'https';

    return `${proto}://${host}`;
  }

  try {
    return new URL(request.url).origin;
  } catch {
    return SITE_URL;
  }
}

export function GET(request: Request) {
  const origin = getOrigin(request);

  return new Response(
    [
      'User-Agent: *',
      'Allow: /',
      'Disallow: /order',
      'Disallow: /user',
      '',
      `Host: ${origin}`,
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
