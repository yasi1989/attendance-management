import Header from '@/features/dashboard/components/Header';
import { SidebarLayout } from '@/features/dashboard/components/SidebarLayout';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarLayout>
      <Header />
      <main className="flex-1 bg-app-gradient" style={{ minHeight: 'calc(100svh - 4rem)' }}>
        <div className="container mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8 max-w-7xl">
          <div className="animate-in fade-in-0 duration-500 ease-out">{children}</div>
        </div>
      </main>
    </SidebarLayout>
  );
}
