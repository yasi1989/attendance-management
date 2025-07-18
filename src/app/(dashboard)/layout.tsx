import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/features/dashboard/components/AppSidebar';
import Header from '@/features/dashboard/components/Header';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar/>
      <SidebarInset className='!m-0 !p-0'>
        <Header />
        <main className="flex-1 bg-app-gradient" style={{ minHeight: 'calc(100svh - 4rem)' }}>
          <div className="container mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8 max-w-7xl">
            <div className="animate-in fade-in-0 duration-500 ease-out">
              {children}
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}