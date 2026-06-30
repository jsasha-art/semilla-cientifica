"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import { SidebarLeft } from "@/components/layout/sidebar-left"
import { Topbar } from "@/components/layout/topbar"
import { SidebarRight } from "@/components/layout/sidebar-right"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push("/login")
      } else {
        setLoading(false)
      }
    }
    checkUser()
  }, [])

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="animate-spin w-8 h-8 border-4 border-[#7C4DFF] border-t-transparent rounded-full" />
      </div>
    )
  }

  return (
    <div className="h-screen flex overflow-hidden bg-[#F8FAFC] dark:bg-slate-900">
      <SidebarLeft />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar />
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
      <SidebarRight />
    </div>
  )
}