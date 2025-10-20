'use client';
import { ChevronRight, type LucideIcon } from 'lucide-react';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  const pathname = usePathname();

  const [openStates, setOpenStates] = useState<Record<string, boolean>>(
    items.reduce(
      (acc, item) => {
        const isCurrentPath = pathname === item.url || item.items?.some((subItem) => pathname === subItem.url);
        acc[item.title] = isCurrentPath || false;
        return acc;
      },
      {} as Record<string, boolean>,
    ),
  );

  const toggleOpen = (title: string) => {
    setOpenStates((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const isItemActive = (item: { url: string; items?: { url: string }[] }) => {
    return pathname === item.url || item.items?.some((subItem) => pathname === subItem.url);
  };

  const isSubItemActive = (subItem: { url: string }) => {
    return pathname === subItem.url;
  };

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            open={openStates[item.title]}
            onOpenChange={() => toggleOpen(item.title)}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton
                  tooltip={item.title}
                  className={`sidebar-menu-item cursor-pointer ${isItemActive(item) ? 'sidebar-menu-active' : ''}`}
                  isActive={isItemActive(item)}
                >
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton
                        asChild
                        isActive={isSubItemActive(subItem)}
                        className={`sidebar-menu-item cursor-pointer ${
                          isSubItemActive(subItem) ? 'sidebar-menu-active' : ''
                        }`}
                        data-level="sub"
                      >
                        <a href={subItem.url}>
                          <span>{subItem.title}</span>
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
