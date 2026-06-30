"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import { SidebarLeft } from "@/components/layout/sidebar-left"
import { Topbar } from "@/components/layout/topbar"
import { SidebarRight } from "@/components/layout/sidebar-right"
import { Menu, X } from "lucide-react"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true)
  const [mobileMenu, setMobileMenu] = useState(false)
  const [mobileChat, setMobileChat] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) router.push("/login")
      else setLoading(false)
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
      {/* Mobile menu button */}
      <button onClick={() => setMobileMenu(!mobileMenu)} className="lg:hidden fixed top-4 left-4 z-50 bg-white dark:bg-slate-800 p-2 rounded-xl shadow-lg border border-slate-200">
        {mobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile chat button */}
      <button onClick={() => setMobileChat(!mobileChat)} className="lg:hidden fixed top-4 right-4 z-50 bg-[#7C4DFF] text-white p-2 rounded-xl shadow-lg">
        💬
      </button>

      {/* Sidebar - hidden on mobile, shown on desktop */}
      <div className={`${mobileMenu ? "block" : "hidden"} lg:block fixed lg:relative z-40`}>
        <SidebarLeft />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden w-full lg:ml-0">
        <Topbar />
        <div className="flex-1 overflow-y-auto p-4 lg:p-8 pt-16 lg:pt-0">
          {children}
        </div>
      </div>

      {/* Chat - hidden on mobile unless toggled */}
      <div className={`${mobileChat ? "block" : "hidden"} lg:block fixed lg:relative right-0 z-40`}>
        <SidebarRight />
      </div>

      {/* Overlay for mobile */}
      {(mobileMenu || mobileChat) && (
        <div onClick={() => { setMobileMenu(false); setMobileChat(false) }} className="lg:hidden fixed inset-0 bg-black/50 z-30" />
      )}
    </div>
  )
}