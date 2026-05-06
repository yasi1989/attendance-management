import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { Role } from '@/lib/actionTypes';
import { NavUser } from '../types/type';
import { AppSidebar } from './AppSidebar';

type SidebarLayoutProps = {
  userRole: Role;
  navUser: NavUser;
  children: React.ReactNode;
};

export const SidebarLayout = ({ userRole, navUser, children }: SidebarLayoutProps) => {
  return (
    <SidebarProvider>
      <AppSidebar userRole={userRole} navUser={navUser} />
      <SidebarInset className="m-0! p-0!">{children}</SidebarInset>
    </SidebarProvider>
  );
};
