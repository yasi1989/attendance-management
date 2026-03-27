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
import { RoleCodeType } from '@/consts/role';
import { Role } from '@/lib/actionTypes';
import { data } from '../const/sideMenuItems';
import { filterNavByRole } from '../lib/nav';
import { NavMain } from './NavMain';
import { NavUser } from './NavUser';

export function AppSidebar({ userRole, ...props }: React.ComponentProps<typeof Sidebar> & { userRole: Role }) {
  const filterNav = filterNavByRole(data.navMain, userRole.roleCode as RoleCodeType);
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
        <NavMain items={filterNav} />
      </SidebarContent>
      <SidebarFooter className="sidebar-footer-gradient">
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
