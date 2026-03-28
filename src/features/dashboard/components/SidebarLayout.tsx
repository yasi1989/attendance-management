'use client';

import dynamic from 'next/dynamic';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { Role } from '@/lib/actionTypes';

const AppSidebarClient = dynamic(() => import('./AppSidebar').then((mod) => mod.AppSidebar), { ssr: false });

type SidebarLayoutProps = {
  children: React.ReactNode;
  userRole: Role;
};

export const SidebarLayout = ({ children, userRole }: SidebarLayoutProps) => {
  return (
    <SidebarProvider>
      <AppSidebarClient userRole={userRole} />
      <SidebarInset className="m-0! p-0!">{children}</SidebarInset>
    </SidebarProvider>
  );
};
