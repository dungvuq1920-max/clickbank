import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

function unauthorized(message = 'Authentication required.') {
  return new NextResponse(message, {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Site Admin"' },
  });
}

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/api/subscribers') return NextResponse.next();
  const password = process.env.ADMIN_PASSWORD;

  if (!password) {
    if (process.env.NODE_ENV === 'production') {
      return new NextResponse('ADMIN_PASSWORD is required in production.', { status: 503 });
    }
    return NextResponse.next();
  }

  const header = request.headers.get('authorization');
  if (!header?.startsWith('Basic ')) return unauthorized();

  try {
    const credentials = atob(header.slice(6));
    const separator = credentials.indexOf(':');
    if (separator < 0 || credentials.slice(separator + 1) !== password) return unauthorized('Invalid credentials.');
  } catch {
    return unauthorized('Invalid credentials.');
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/:path*'],
};
