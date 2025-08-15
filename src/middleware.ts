import { auth } from '@/auth';
import { NextResponse } from 'next/server';
import { URLS } from '@/consts/urls';
import { NextAuthRequest } from 'next-auth';

export default auth((req: NextAuthRequest) => {
  const reqUrl = new URL(req.url);

  if (reqUrl.pathname === URLS.ROOT) {
    const redirectPath = req.auth ? URLS.ATTENDANCE_CALENDAR : URLS.LOGIN;
    return NextResponse.redirect(new URL(redirectPath, req.url));
  }

  const publicPaths = [URLS.LOGIN, URLS.API_AUTH];
  const isPublicPath = publicPaths.some((path) => reqUrl.pathname === path || reqUrl.pathname.startsWith(path));
  if (!req.auth && !isPublicPath) {
    return NextResponse.redirect(new URL(URLS.LOGIN, req.url));
  }
  if (req.auth && reqUrl.pathname === URLS.LOGIN) {
    return NextResponse.redirect(new URL(URLS.ATTENDANCE_CALENDAR, req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
