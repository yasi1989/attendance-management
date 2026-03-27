import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { URLS } from '@/consts/urls';
import { ClockSection } from '@/features/attendance/clock/components/ClockSection';
import { AppSidebar } from '@/features/dashboard/components/AppSidebar';
import Header from '@/features/dashboard/components/Header';
import { getUser } from '@/lib/user';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user?.id) redirect(URLS.LOGIN);
  try {
    const user = await getUser(session.user.id);
    if (!user?.role) redirect(URLS.LOGIN);

    return (
      <SidebarProvider>
        <AppSidebar userRole={user.role} />
        <SidebarInset className="m-0! p-0!">
          <Header clockSection={<ClockSection />} />
          <main className="flex-1 bg-app-gradient" style={{ minHeight: 'calc(100svh - 4rem)' }}>
            <div className="container mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8 max-w-7xl">
              <div className="animate-in fade-in-0 duration-500 ease-out">{children}</div>
            </div>
          </main>
        </SidebarInset>
      </SidebarProvider>
    );
  } catch (error) {
    console.error(error);
    redirect(URLS.LOGIN);
  }
}
