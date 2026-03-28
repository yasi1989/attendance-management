'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { Role } from '@/lib/actionTypes';
import { SidebarSkeleton } from './SidebarSkeleton';

const AppSidebar = dynamic(() => import('./AppSidebar').then((mod) => mod.AppSidebar), {
  ssr: false,
  loading: () => <SidebarSkeleton />,
});

type SidebarLayoutProps = {
  userRole: Role;
  children: React.ReactNode;
};

export const SidebarLayout = ({ userRole, children }: SidebarLayoutProps) => {
  return (
    <SidebarProvider>
      <AppSidebar userRole={userRole} />
      <SidebarInset className="m-0! p-0!">
        <Suspense>{children}</Suspense>
      </SidebarInset>
    </SidebarProvider>
  );
};
