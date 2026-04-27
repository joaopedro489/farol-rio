import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { PanelSidebar } from './components/PanelSidebar'
import { PanelNavbar } from './components/PanelNavbar'
import { AuthGuard } from './components/AuthGuard'

export default function PanelLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <PanelSidebar />
      <SidebarInset className='bg-background'>
        <PanelNavbar />
        <main className='flex-1'>
          <AuthGuard>{children}</AuthGuard>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
