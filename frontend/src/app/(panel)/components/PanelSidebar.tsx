'use client'

import { ChartNoAxesColumn, Users } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar'
import { Logo } from '@/components/logo'
import { ROUTES } from '@/constants/routes'

const MENU_ITEMS = [
  {
    title: 'Painel',
    url: ROUTES.AUTHENTICATED.DASHBOARD.path,
    icon: ChartNoAxesColumn
  },
  { title: 'Crianças', url: ROUTES.AUTHENTICATED.CHILDREN.path, icon: Users }
]

export const PanelSidebar = () => {
  const pathname = usePathname()

  return (
    <Sidebar>
      <SidebarHeader className='p-4'>
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Painel</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {MENU_ITEMS.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname.startsWith(item.url)}>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
