"use client"

import { useState, useEffect } from "react"
import { Trophy, Star, Zap, Target, BookOpen, Users, MessageSquare, Calendar, Shield, Crown, Award, Sparkles } from "lucide-react"
import { supabase } from "@/lib/supabase"

const logrosBase = [
  { id: "primer_protocolo", icon: Star, title: "Primer Protocolo", desc: "Creaste tu primer protocolo de investigación", color: "amber", condition: (p: any) => p.length >= 1 },
  { id: "protocolo_completo", icon: Trophy, title: "Protocolo Completo", desc: "Completaste todas las etapas de un protocolo", color: "violet", condition: (p: any) => p.some((x: any) => x.etapa >= 10) },
  { id: "tres_protocolos", icon: Award, title: "Investigador Activo", desc: "Creaste 3 protocolos de investigación", color: "emerald", condition: (p: any) => p.length >= 3 },
  { id: "lector_avido", icon: BookOpen, title: "Lector Ávido", desc: "Leíste 50 artículos científicos", color: "sky", condition: (p: any, a: number) => a >= 50 },
  { id: "racha_7", icon: Zap, title: "Racha de 7 días", desc: "7 días consecutivos de estudio", color: "orange", condition: (p: any, a: number, r: number) => r >= 7 },
  { id: "colaborador", icon: Users, title: "Colaborador", desc: "Participaste en 10 debates de la comunidad", color: "rose", condition: (p: any, a: number, r: number, c: number) => c >= 10 },
  { id: "mentor", icon: MessageSquare, title: "Mentor", desc: "Ayudaste a 5 compañeros con sus dudas", color: "indigo", condition: () => false },
  { id: "asistente", icon: Calendar, title: "Asistente Perfecto", desc: "Asististe a 20 eventos académicos", color: "teal", condition: () => false },
  { id: "experto_etica", icon: Shield, title: "Experto en Ética", desc: "Completaste el módulo de ética", color: "slate", condition: () => false },
  { id: "excelencia", icon: Star, title: "Excelencia Académica", desc: "Calificación perfecta en 5 cursos", color: "yellow", condition: () => false },
  { id: "investigador_elite", icon: Crown, title: "Investigador Elite", desc: "Publicaste tu primer artículo", color: "purple", condition: () => false },
]

const coloresLogro: Record<string, string> = {
  amber: "bg-amber-50 text-amber-600 border-amber-200",
  violet: "bg-violet-50 text-violet-600 border-violet-200",
  emerald: "bg-emerald-50 text-emerald-600 border-emerald-200",
  sky: "bg-sky-50 text-sky-600 border-sky-200",
  orange: "bg-orange-50 text-orange-600 border-orange-200",
  rose: "bg-rose-50 text-rose-600 border-rose-200",
  indigo: "bg-indigo-50 text-indigo-600 border-indigo-200",
  teal: "bg-teal-50 text-teal-600 border-teal-200",
  slate: "bg-slate-50 text-slate-600 border-slate-200",
  yellow: "bg-yellow-50 text-yellow-600 border-yellow-200",
  purple: "bg-purple-50 text-purple-600 border-purple-200",
}

const avatares = [
  { nivel: 1, emoji: "🌱", titulo: "Semilla", color: "from-green-400 to-emerald-500" },
  { nivel: 5, emoji: "🌿", titulo: "Brote", color: "from-emerald-400 to-teal-500" },
  { nivel: 10, emoji: "🔬", titulo: "Investigador Junior", color: "from-sky-400 to-blue-500" },
  { nivel: 15, emoji: "🧬", titulo: "Investigador Senior", color: "from-violet-400 to-purple-500" },
  { nivel: 25, emoji: "🏆", titulo: "Investigador Elite", color: "from-amber-400 to-orange-500" },
  { nivel: 50, emoji: "👑", titulo: "Leyenda Científica", color: "from-yellow-400 to-red-500" },
]

export default function LogrosPage() {
  const [protocols, setProtocols] = useState<any[]>([])
  const [logrosDesbloqueados, setLogrosDesbloqueados] = useState<string[]>([])
  const [articulos, setArticulos] = useState(0)
  const [racha, setRacha] = useState(5)
  const [comentarios, setComentarios] = useState(3)
  const [avatarActual, setAvatarActual] = useState(avatares[0])

  useEffect(() => {
    cargarDatos()
  }, [])

  useEffect(() => {
    const totalXP = protocols.length * 200 + protocols.filter(p => p.etapa >= 10).length * 500
    const nivel = Math.floor(totalXP / 1000) + 1
    const nuevoAvatar = avatares.filter(a => nivel >= a.nivel).pop() || avatares[0]
    setAvatarActual(nuevoAvatar)
  }, [protocols])

  const cargarDatos = async () => {
    const { data } = await supabase.from("protocols").select("*")
    if (data) {
      setProtocols(data)
      const desbloqueados = logrosBase.filter(l => l.condition(data, articulos, racha, comentarios)).map(l => l.id)
      setLogrosDesbloqueados(desbloqueados)
    }
  }

  const desbloqueados = logrosBase.filter(l => logrosDesbloqueados.includes(l.id))
  const bloqueados = logrosBase.filter(l => !logrosDesbloqueados.includes(l.id))
  const pct = Math.round((desbloqueados.length / logrosBase.length) * 100)

  const totalXP = protocols.length * 200 + protocols.filter(p => p.etapa >= 10).length * 500
  const nivel = Math.floor(totalXP / 1000) + 1
  const xpActual = totalXP % 1000
  const xpParaSubir = nivel * 1000

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 font-display">🏆 Logros</h1>
        <p className="text-sm text-slate-500 mt-1">Insignias y reconocimientos por tu dedicación</p>
      </div>

      {/* Avatar y nivel */}
      <div className={`bg-gradient-to-r ${avatarActual.color} rounded-2xl p-6 text-white relative overflow-hidden`}>
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/4" />
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <p className="text-white/70 text-sm mb-1">Tu Avatar</p>
            <div className="flex items-center gap-4">
              <span className="text-6xl">{avatarActual.emoji}</span>
              <div>
                <p className="text-2xl font-bold">{avatarActual.titulo}</p>
                <p className="text-white/70 text-sm">Nivel {nivel}</p>
              </div>
            </div>
            <div className="mt-3 h-2 bg-white/20 rounded-full overflow-hidden w-64">
              <div className="h-full bg-white rounded-full" style={{width: `${(xpActual/xpParaSubir)*100}%`}} />
            </div>
            <p className="text-xs text-white/60 mt-1">{xpActual}/{xpParaSubir} XP para siguiente nivel</p>
          </div>
          <div className="text-center">
            <Sparkles className="w-10 h-10 text-yellow-300 mx-auto animate-pulse" />
            <p className="text-3xl font-bold mt-2">{totalXP}</p>
            <p className="text-xs text-white/70">XP Total</p>
          </div>
        </div>
      </div>

      {/* Resumen */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-5 border border-amber-200">
          <Trophy className="w-8 h-8 text-amber-600 mb-2" />
          <p className="text-3xl font-bold text-amber-800">{desbloqueados.length}</p>
          <p className="text-sm text-amber-700">Logros desbloqueados</p>
        </div>
        <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-5 border border-slate-200">
          <Shield className="w-8 h-8 text-slate-600 mb-2" />
          <p className="text-3xl font-bold text-slate-800">{bloqueados.length}</p>
          <p className="text-sm text-slate-700">Por desbloquear</p>
        </div>
        <div className="bg-gradient-to-br from-violet-50 to-violet-100 rounded-2xl p-5 border border-violet-200">
          <Crown className="w-8 h-8 text-violet-600 mb-2" />
          <p className="text-3xl font-bold text-violet-800">{pct}%</p>
          <p className="text-sm text-violet-700">Completado</p>
        </div>
      </div>

      {/* Grid de logros */}
      <div>
        <h2 className="text-lg font-bold text-slate-800 mb-3">🏅 Todos los Logros</h2>
        <div className="grid grid-cols-2 gap-3">
          {desbloqueados.map(logro => (
            <div key={logro.id} className={`bg-white rounded-2xl p-5 border shadow-sm hover:shadow-md transition-all ${coloresLogro[logro.color]}`}>
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${coloresLogro[logro.color]}`}>
                  <logro.icon className="w-7 h-7" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-slate-800">{logro.title}</h3>
                    <span className="text-lg">✅</span>
                  </div>
                  <p className="text-sm text-slate-500 mt-0.5">{logro.desc}</p>
                  <p className="text-xs text-emerald-600 font-medium mt-1">¡Desbloqueado!</p>
                </div>
              </div>
            </div>
          ))}
          {bloqueados.map(logro => (
            <div key={logro.id} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm opacity-60 hover:opacity-80 transition-all">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-slate-100 text-slate-400">
                  <logro.icon className="w-7 h-7" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-slate-600">{logro.title}</h3>
                    <span className="text-lg">🔒</span>
                  </div>
                  <p className="text-sm text-slate-400 mt-0.5">{logro.desc}</p>
                  <div className="mt-2 h-1.5 bg-slate-100 rounded-full w-32">
                    <div className="h-full bg-slate-300 rounded-full" style={{width: "25%"}} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}