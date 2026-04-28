import { get } from '@vercel/blob';
import { type NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';

export async function GET(request: NextRequest) {
  const session = await auth();
  if (!session) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const pathname = request.nextUrl.searchParams.get('pathname');
  if (!pathname) {
    return new NextResponse('Missing pathname', { status: 400 });
  }

  const result = await get(pathname, { access: 'private' });
  if (!result) {
    return new NextResponse('Not found', { status: 404 });
  }
  return new NextResponse(result.stream, {
    headers: {
      'Content-Type': result.blob.contentType ?? 'application/octet-stream',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}
