'use client';

import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { data } from '../const/sideMenuItems';
import { NavMain } from './NavMain';
import { NavUser } from './NavUser';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props} className="bg-sidebar-gradient">
      <SidebarHeader className="sidebar-header-gradient">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:p-1.5!">
              <Link href="#">
                <Image src="/clock-icon.svg" alt="Clock Icon" width={34} height={34} />
                <div className="flex flex-col">
                  <span className="text-base font-semibold">Yasm</span>
                  <span className="text-xs text-muted-foreground">Attendance System</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter className="sidebar-footer-gradient">
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
