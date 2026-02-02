import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { URLS } from '@/consts/urls';

export default auth((req) => {
  const reqUrl = new URL(req.url);

  if (reqUrl.pathname === URLS.ROOT) {
    const redirectPath = req.auth ? URLS.ATTENDANCE_CALENDAR : URLS.LOGIN;
    return NextResponse.redirect(new URL(redirectPath, req.url));
  }

  const publicPaths = [URLS.LOGIN, URLS.API_AUTH, URLS.AUTH_ERROR];
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
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
