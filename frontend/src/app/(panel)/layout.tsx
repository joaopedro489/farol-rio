import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { PanelSidebar } from './components/PanelSidebar'
import { PanelNavbar } from './components/PanelNavbar'

export const PanelLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <PanelSidebar />
      <SidebarInset className='bg-background'>
        <PanelNavbar />
        <main className='flex-1'>{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
