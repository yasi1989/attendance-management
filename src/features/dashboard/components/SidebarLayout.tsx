'use client';

import dynamic from 'next/dynamic';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

const AppSidebarClient = dynamic(() => import('./AppSidebar').then((mod) => mod.AppSidebar), { ssr: false });

type SidebarLayoutProps = {
  children: React.ReactNode;
};

export const SidebarLayout = ({ children }: SidebarLayoutProps) => {
  return (
    <SidebarProvider>
      <AppSidebarClient />
      <SidebarInset className="m-0! p-0!">{children}</SidebarInset>
    </SidebarProvider>
  );
};
