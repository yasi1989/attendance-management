import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { Role } from '@/lib/actionTypes';
import { AppSidebar } from './AppSidebar';

type SidebarLayoutProps = {
  userRole: Role;
  children: React.ReactNode;
};

export const SidebarLayout = ({ userRole, children }: SidebarLayoutProps) => {
  return (
    <SidebarProvider>
      <AppSidebar userRole={userRole} />
      <SidebarInset className="m-0! p-0!">
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
};
