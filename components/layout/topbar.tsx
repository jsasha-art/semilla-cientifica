"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Bell, MessageCircle, ChevronDown, User, Settings, LogOut, Command } from "lucide-react"
import { cn } from "@/lib/utils"
import { supabase } from "@/lib/supabase"

export function Topbar() {
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const router = useRouter()
  const [userName, setUserName] = useState("Usuario")
  const [userEmail, setUserEmail] = useState("")

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setUserName(user.email?.split("@")[0] || "Usuario")
        setUserEmail(user.email || "")
      }
    }
    getUser()
  }, [])

  const cerrarSesion = async () => {
    await supabase.auth.signOut()
    router.push("/login")
  }

  return (
    <header className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl border-b border-slate-200/60 dark:border-slate-700 px-6 py-3 z-20">
      <div className="flex items-center justify-between gap-6">
        <div className="flex-1 max-w-2xl">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500 group-focus-within:text-[#7C4DFF] transition-colors" />
            <input
              type="text"
              placeholder="¿Qué quieres aprender hoy?"
              className="w-full pl-11 pr-20 py-2.5 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-sm text-slate-700 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-[#7C4DFF]/40 focus:ring-3 focus:ring-[#7C4DFF]/8 focus:bg-white dark:focus:bg-slate-800 transition-all"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500 bg-white dark:bg-slate-700 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-600 shadow-sm">
              <Command className="w-3 h-3" />
              <span>K</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="relative p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
            <Bell className="w-5 h-5 text-slate-500 dark:text-slate-400" />
            <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white dark:ring-slate-800" />
          </button>

          <button className="p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
            <MessageCircle className="w-5 h-5 text-slate-500 dark:text-slate-400" />
          </button>

          <div className="relative">
            <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-slate-800 dark:text-white leading-tight">{userName}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{userEmail}</p>
              </div>
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#7C4DFF] to-[#4D9FFF] flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-[#7C4DFF]/20">
                {userName?.slice(0,2).toUpperCase()}
              </div>
              <ChevronDown className={cn("w-4 h-4 text-slate-400 dark:text-slate-500 transition-transform", isProfileOpen && "rotate-180")} />
            </button>

            <AnimatePresence>
              {isProfileOpen && (
                <motion.div initial={{ opacity: 0, y: -8, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8, scale: 0.96 }}
                  className="absolute right-0 mt-3 w-60 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200/60 dark:border-slate-700 py-2 backdrop-blur-xl">
                  <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-700">
                    <p className="text-sm font-semibold text-slate-800 dark:text-white">{userName}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{userEmail}</p>
                  </div>
                  <div className="py-1">
                    <button onClick={() => router.push("/perfil")} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"><User className="w-4 h-4 text-slate-400" /> Mi Perfil</button>
                    <button onClick={() => router.push("/configuracion")} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"><Settings className="w-4 h-4 text-slate-400" /> Configuración</button>
                  </div>
                  <div className="border-t border-slate-100 dark:border-slate-700 pt-1 mt-1">
                    <button onClick={cerrarSesion} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"><LogOut className="w-4 h-4" /> Cerrar Sesión</button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  )
}