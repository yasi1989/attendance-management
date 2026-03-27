import { LucideIcon } from 'lucide-react';
import { RoleCodeType } from '@/consts/role';

export type NavItem = {
  title: string;
  url: string;
};

export type NavGroup = {
  title: string;
  url: string;
  icon: LucideIcon;
  items: NavItem[];
  roles: RoleCodeType[];
};

export type SidebarData = {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
  navMain: NavGroup[];
};
