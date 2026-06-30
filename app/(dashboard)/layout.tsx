import { SidebarLeft } from "@/components/layout/sidebar-left"
import { Topbar } from "@/components/layout/topbar"
import { SidebarRight } from "@/components/layout/sidebar-right"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen flex overflow-hidden bg-[#F8FAFC] dark:bg-slate-900">
      <SidebarLeft />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar />
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </div>
      <SidebarRight />
    </div>
  )
}