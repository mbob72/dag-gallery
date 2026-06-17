export function getRequestOriginFromHeaders(headersList: Headers) {
  const forwardedHost = headersList.get('x-forwarded-host')?.split(',')[0]?.trim();
  const host = forwardedHost || headersList.get('host');

  if (!host) {
    throw new Error('Request host header is required to build absolute URLs.');
  }

  const forwardedProto = headersList.get('x-forwarded-proto')?.split(',')[0]?.trim();
  const proto = forwardedProto || 'https';

  return `${proto}://${host}`;
}
