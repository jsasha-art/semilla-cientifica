"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Home, BookOpen, FolderOpen, FileText, Library, Users, Calendar, TrendingUp, Trophy, Award, MessageSquare, User, Settings, FlaskConical, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

const menuItems = [
  { icon: Home, label: "Inicio", href: "/" },
  { icon: BookOpen, label: "Cursos", href: "/cursos" },
  { icon: FolderOpen, label: "Recursos", href: "/recursos" },
  { icon: FileText, label: "Protocolos", href: "/protocolos" },
  { icon: Library, label: "Biblioteca", href: "/biblioteca" },
  { icon: FlaskConical, label: "Laboratorio", href: "/laboratorio" },
  { icon: Users, label: "Comunidad", href: "/comunidad" },
  { icon: Calendar, label: "Eventos", href: "/eventos" },
  { icon: TrendingUp, label: "Mi progreso", href: "/progreso" },
  { icon: Award, label: "Logros", href: "/logros" },
  { icon: Trophy, label: "Ranking", href: "/ranking" },
  { icon: MessageSquare, label: "Mentorías", href: "/mentorias" },
]

const bottomMenu = [
  { icon: User, label: "Perfil", href: "/perfil" },
  { icon: Settings, label: "Configuración", href: "/configuracion" },
]

export function SidebarLeft() {
  const pathname = usePathname()

  return (
    <aside className="h-screen w-[260px] bg-white dark:bg-slate-800 border-r border-slate-200/60 dark:border-slate-700 flex flex-col flex-shrink-0">
      <div className="px-5 py-5 border-b border-slate-100 dark:border-slate-700">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-gradient-to-br from-[#7C4DFF] to-[#6A3DE8] rounded-xl flex items-center justify-center shadow-lg shadow-[#7C4DFF]/25 group-hover:scale-105 transition-transform">
            <FlaskConical className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-900 dark:text-white leading-tight tracking-tight">SEMILLA</p>
            <p className="text-sm font-bold text-[#7C4DFF] leading-tight tracking-tight">CIENTÍFICA</p>
          </div>
        </Link>
        <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-2 italic tracking-wide">Inspira. Investiga. Impacta.</p>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-0.5">
        {menuItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link key={item.href} href={item.href}>
              <div className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer group",
                isActive ? "bg-[#7C4DFF]/8 text-[#7C4DFF]" : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-700"
              )}>
                <item.icon className={cn("w-5 h-5 flex-shrink-0 transition-colors", isActive ? "text-[#7C4DFF]" : "text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300")} />
                <span className="flex-1">{item.label}</span>
                {isActive && <ChevronRight className="w-4 h-4 text-[#7C4DFF]" />}
              </div>
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-slate-100 dark:border-slate-700 px-3 py-3 space-y-0.5">
        {bottomMenu.map((item) => (
          <Link key={item.href} href={item.href}>
            <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-200 cursor-pointer">
              <item.icon className="w-5 h-5 text-slate-400 dark:text-slate-500" />
              <span>{item.label}</span>
            </div>
          </Link>
        ))}
      </div>

      <div className="p-3">
        <div className="bg-gradient-to-br from-[#7C4DFF]/5 to-indigo-50 dark:from-[#7C4DFF]/10 dark:to-slate-700 rounded-2xl p-4 border border-[#7C4DFF]/10 dark:border-[#7C4DFF]/20">
          <p className="text-2xl mb-2">🌱</p>
          <p className="text-xs font-semibold text-slate-800 dark:text-white mb-1">Sigue cultivando tu curiosidad</p>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-3">Cada pregunta es una semilla de conocimiento</p>
          <Link href="/progreso">
            <button className="w-full text-xs font-semibold bg-[#7C4DFF] text-white rounded-lg py-2.5 hover:bg-[#6A3DE8] transition-colors">
              Ver mi progreso
            </button>
          </Link>
        </div>
      </div>
    </aside>
  )
}