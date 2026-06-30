"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Bell, ChevronDown, User, Settings, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"
import { supabase } from "@/lib/supabase"

export function Topbar() {
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [showNotif, setShowNotif] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const router = useRouter()
  const [userName, setUserName] = useState("Usuario")
  const [userEmail, setUserEmail] = useState("")
  const [notificaciones, setNotificaciones] = useState([
    { id: 1, titulo: "Nuevo curso disponible", desc: "Se publicó 'Bioestadística Avanzada'", hora: "Hace 2 horas", leida: false },
    { id: 2, titulo: "Protocolo completado", desc: "¡Felicitaciones! Tu protocolo está listo", hora: "Hace 5 horas", leida: false },
    { id: 3, titulo: "Mentoría agendada", desc: "Dr. Ricardo Palma confirmó tu sesión", hora: "Ayer", leida: true },
    { id: 4, titulo: "Evento próximo", desc: "Taller de SPSS mañana a las 10:00", hora: "Ayer", leida: false },
  ])

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

  const marcarLeida = (id: number) => {
    setNotificaciones(prev => prev.map(n => n.id === id ? { ...n, leida: true } : n))
  }

  const buscar = () => {
    if (!searchTerm.trim()) return
    const term = searchTerm.toLowerCase()
    if (term.includes("curso") || term.includes("investigación") || term.includes("bioestadística") || term.includes("bibliogr")) router.push("/cursos")
    else if (term.includes("recurso") || term.includes("apa") || term.includes("vancouver") || term.includes("spss") || term.includes("pubmed") || term.includes("scopus")) router.push("/recursos")
    else if (term.includes("protocolo") || term.includes("tesis")) router.push("/protocolos")
    else if (term.includes("biblioteca") || term.includes("artículo") || term.includes("paper")) router.push("/biblioteca")
    else if (term.includes("laboratorio") || term.includes("idea")) router.push("/laboratorio")
    else if (term.includes("comunidad") || term.includes("foro")) router.push("/comunidad")
    else if (term.includes("evento") || term.includes("taller") || term.includes("conferencia")) router.push("/eventos")
    else if (term.includes("progreso") || term.includes("estadística")) router.push("/progreso")
    else if (term.includes("logro") || term.includes("insignia")) router.push("/logros")
    else if (term.includes("ranking") || term.includes("competencia")) router.push("/ranking")
    else if (term.includes("mentor") || term.includes("asesor")) router.push("/mentorias")
    else if (term.includes("perfil") || term.includes("cuenta")) router.push("/perfil")
    else if (term.includes("config") || term.includes("ajuste") || term.includes("oscuro")) router.push("/configuracion")
    else router.push("/cursos")
    setSearchTerm("")
  }

  const noLeidas = notificaciones.filter(n => !n.leida).length

  return (
    <header className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl border-b border-slate-200/60 dark:border-slate-700 px-6 py-3 z-20">
      <div className="flex items-center justify-between gap-6">
        {/* Buscador */}
        <div className="flex-1 max-w-2xl">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
            <input type="text" placeholder="¿Qué quieres aprender hoy?" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") buscar() }}
              className="w-full pl-11 pr-4 py-2.5 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-sm text-slate-700 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:border-[#7C4DFF]/40 transition-all" />
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Notificaciones */}
          <div className="relative">
            <button onClick={() => setShowNotif(!showNotif)} className="relative p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
              <Bell className="w-5 h-5 text-slate-500 dark:text-slate-400" />
              {noLeidas > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white dark:ring-slate-800">{noLeidas}</span>
              )}
            </button>
            <AnimatePresence>
              {showNotif && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-3 w-80 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200/60 dark:border-slate-700 py-2 z-50">
                  <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
                    <p className="font-semibold text-slate-800 dark:text-white text-sm">Notificaciones</p>
                    {noLeidas > 0 && <span className="text-xs text-[#7C4DFF] font-medium">{noLeidas} nuevas</span>}
                  </div>
                  <div className="max-h-72 overflow-y-auto">
                    {notificaciones.map(n => (
                      <div key={n.id} onClick={() => marcarLeida(n.id)}
                        className={`px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer transition-colors ${!n.leida ? "bg-violet-50/30 dark:bg-violet-900/10 border-l-2 border-l-[#7C4DFF]" : ""}`}>
                        <div className="flex items-start gap-2">
                          {!n.leida && <div className="w-2 h-2 bg-[#7C4DFF] rounded-full mt-1.5 flex-shrink-0" />}
                          <div>
                            <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{n.titulo}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{n.desc}</p>
                            <p className="text-xs text-slate-400 mt-1">{n.hora}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Perfil */}
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
                <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                  className="absolute right-0 mt-3 w-60 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200/60 dark:border-slate-700 py-2 z-50">
                  <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-700">
                    <p className="text-sm font-semibold text-slate-800 dark:text-white">{userName}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{userEmail}</p>
                  </div>
                  <button onClick={() => router.push("/perfil")} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"><User className="w-4 h-4" /> Mi Perfil</button>
                  <button onClick={() => router.push("/configuracion")} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"><Settings className="w-4 h-4" /> Configuración</button>
                  <div className="border-t border-slate-100 dark:border-slate-700 pt-1 mt-1">
                    <button onClick={cerrarSesion} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"><LogOut className="w-4 h-4" /> Cerrar Sesión</button>
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