import { isRedirectError } from 'next/dist/client/components/redirect-error';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import { auth } from '@/auth';
import { HeaderStatusBadgeSkeleton } from '@/components/layout/HeaderStatusBadgeSkeleton';
import { URLS } from '@/consts/urls';
import { ClockSection } from '@/features/attendance/clock/components/ClockSection';
import Header from '@/features/dashboard/components/Header';
import { SidebarLayout } from '@/features/dashboard/components/SidebarLayout';
import { getUser } from '@/lib/user';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user?.id) redirect(URLS.LOGIN);

  const userResult = await getUser(session.user.id);
  if (!userResult.success) {
    console.error('[DashboardLayout]', userResult.error);
    redirect(URLS.LOGIN);
  }

  const { data: user } = userResult;

  try {
    return (
      <SidebarLayout
        userRole={user.role}
        navUser={{
          name: user.name,
          email: user.email,
          avatar: user.image ?? '',
        }}
      >
        <Header
          clockSection={
            <Suspense fallback={<HeaderStatusBadgeSkeleton />}>
              <ClockSection />
            </Suspense>
          }
        />
        <main className="flex-1 bg-app-gradient" style={{ minHeight: 'calc(100svh - 4rem)' }}>
          <div className="container mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8 max-w-7xl">
            <div className="animate-in fade-in-0 duration-500 ease-out">{children}</div>
          </div>
        </main>
      </SidebarLayout>
    );
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.error('[DashboardLayout] Render error:', error);
    redirect(URLS.LOGIN);
  }
}
