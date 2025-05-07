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
      <AppSidebar variant="inset" />
      <SidebarInset>
        <Header />
        <div className="container mx-auto py-10 max-w-5xl animate-in fade-in-50 duration-300">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
