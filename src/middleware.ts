import { auth } from '@/auth';
import { NextResponse } from 'next/server';

export default auth((req) => {
  const reqUrl = new URL(req.url);
  
  const publicPaths = ['/', '/login', '/api/auth'];
  
  const isPublicPath = publicPaths.some(path => 
    reqUrl.pathname === path || reqUrl.pathname.startsWith(path + '/')
  );
  
  if (!req.auth && !isPublicPath) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
  
  if (req.auth && reqUrl.pathname === '/login') {
    return NextResponse.redirect(new URL('/attendance/calendar', req.url));
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
