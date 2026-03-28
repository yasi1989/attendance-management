import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSkeleton,
} from '@/components/ui/sidebar';

const SKELETON_KEYS = ['sk-1', 'sk-2', 'sk-3', 'sk-4', 'sk-5', 'sk-6'] as const;

export const SidebarSkeleton = () => (
  <Sidebar>
    <SidebarContent>
      <SidebarGroup>
        <SidebarMenu>
          {SKELETON_KEYS.map((key) => (
            <SidebarMenuItem key={key}>
              <SidebarMenuSkeleton showIcon />
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
  </Sidebar>
);
