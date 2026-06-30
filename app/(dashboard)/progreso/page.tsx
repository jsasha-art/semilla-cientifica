"use client"

import { useState, useEffect } from "react"
import { TrendingUp, Clock, BookOpen, Award, Target, Zap, Trophy, Star, ArrowRight } from "lucide-react"
import { supabase } from "@/lib/supabase"
import Link from "next/link"

export default function ProgresoPage() {
  const [protocols, setProtocols] = useState<any[]>([])
  const [cursosActivos, setCursosActivos] = useState<any[]>([])

  useEffect(() => {
    cargarDatos()
  }, [])

  const cargarDatos = async () => {
    const { data: prot } = await supabase.from("protocols").select("*").order("created_at", { ascending: false })
    if (prot) setProtocols(prot)

    setCursosActivos([
      { title: "Introducción a la Investigación Científica", progress: 65, link: "/cursos", color: "violet" },
      { title: "Bioestadística para Principiantes", progress: 30, link: "/cursos", color: "emerald" },
      { title: "Cómo elaborar un Protocolo de Investigación", progress: 15, link: "/cursos", color: "sky" },
      { title: "Búsqueda Bibliográfica Efectiva", progress: 80, link: "/cursos", color: "orange" },
    ])
  }

  const protocolosCompletados = protocols.filter(p => p.etapa >= 10).length
  const protocolosEnProgreso = protocols.filter(p => p.etapa > 1 && p.etapa < 10).length
  const horasEstudio = Math.round(protocols.length * 4)
  const xp = protocols.length * 200 + protocolosCompletados * 500
  const nivel = Math.floor(xp / 1000) + 1
  const xpParaSubir = nivel * 1000
  const xpActual = xp % 1000
  const metaMensual = Math.round((protocolosEnProgreso / Math.max(protocols.length, 1)) * 100)

  const cursosCompletados = 3
  const insignias = protocolosCompletados + cursosCompletados

  const diasSemana = ["L", "M", "M", "J", "V", "S", "D"]
  const actividadSemanal = diasSemana.map(() => Math.floor(Math.random() * 4) + 1)

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 font-display">📈 Mi Progreso</h1>
        <p className="text-sm text-slate-500 mt-1">Tu viaje de aprendizaje en investigación científica</p>
      </div>

      {/* Stats principales */}
      <div className="grid grid-cols-4 gap-4">
        <StatBox icon={Clock} value={`${horasEstudio}h`} label="Horas estudiadas" color="violet" />
        <StatBox icon={BookOpen} value={cursosCompletados} label="Cursos completados" color="emerald" />
        <StatBox icon={Award} value={insignias} label="Insignias ganadas" color="amber" />
        <StatBox icon={Target} value={`${metaMensual}%`} label="Meta del mes" color="sky" />
      </div>

      {/* Nivel y XP */}
      <div className="bg-gradient-to-br from-[#7C4DFF] via-[#6A3DE8] to-[#5B2DDB] rounded-2xl p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4" />
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <p className="text-sm text-white/70 mb-1">Tu nivel</p>
            <p className="text-4xl font-bold">
              {nivel <= 5 ? "Investigador Novato" : nivel <= 10 ? "Investigador Junior" : nivel <= 20 ? "Investigador Senior" : "Investigador Elite"}
            </p>
            <p className="text-sm text-white/70 mt-2">Nivel {nivel} • {xpActual} / {xpParaSubir} XP para el siguiente nivel</p>
          </div>
          <div className="text-right">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Zap className="w-10 h-10 text-white" />
            </div>
          </div>
        </div>
        <div className="mt-4 h-3 bg-white/20 rounded-full overflow-hidden">
          <div className="h-full bg-white rounded-full transition-all duration-1000" style={{width: `${(xpActual/xpParaSubir)*100}%`}} />
        </div>
        <p className="text-xs text-white/60 mt-2">XP Total: {xp} • Protocolos: {protocols.length} • Completados: {protocolosCompletados}</p>
      </div>

      {/* Cursos Activos */}
      <div>
        <h2 className="text-lg font-bold text-slate-800 mb-3">📚 Cursos Activos</h2>
        <div className="grid grid-cols-2 gap-4">
          {cursosActivos.map((curso) => (
            <Link key={curso.title} href={curso.link}>
              <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer group">
                <p className="font-semibold text-sm text-slate-800 mb-3 group-hover:text-[#7C4DFF] transition-colors">{curso.title}</p>
                <div className="flex justify-between text-xs text-slate-500 mb-1.5">
                  <span>Progreso</span>
                  <span className="font-semibold">{curso.progress}%</span>
                </div>
                <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full transition-all duration-700 ${
                    curso.color === "violet" ? "bg-violet-500" : curso.color === "emerald" ? "bg-emerald-500" : curso.color === "sky" ? "bg-sky-500" : "bg-orange-500"
                  }`} style={{width: `${curso.progress}%`}} />
                </div>
                <div className="flex items-center gap-1 mt-3 text-xs text-[#7C4DFF] font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Continuar <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Protocolos recientes */}
      {protocols.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-slate-800 mb-3">🧪 Tus Protocolos</h2>
          <div className="space-y-2">
            {protocols.slice(0, 3).map(p => (
              <Link key={p.id} href="/protocolos">
                <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm text-slate-700">{p.tema || p.idea || "Sin título"}</p>
                    <p className="text-xs text-slate-400">Etapa {p.etapa || 1}/10</p>
                  </div>
                  <div className="w-24">
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-[#7C4DFF] rounded-full" style={{width: `${(p.etapa||1)*10}%`}} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
            <Link href="/protocolos" className="text-sm text-[#7C4DFF] font-medium hover:underline block text-center mt-2">
              Ver todos los protocolos →
            </Link>
          </div>
        </div>
      )}

      {/* Actividad semanal */}
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
        <h2 className="text-lg font-bold text-slate-800 mb-4">📊 Actividad Semanal</h2>
        <div className="flex items-end justify-between gap-2 h-40">
          {actividadSemanal.map((horas, i) => {
            const altura = horas * 20
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full relative" style={{height: "120px"}}>
                  <div className="absolute bottom-0 w-full bg-gradient-to-t from-[#7C4DFF] to-[#4D9FFF] rounded-t-lg transition-all hover:opacity-80 cursor-pointer" 
                    style={{height: `${altura}%`}}>
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-slate-700 opacity-0 hover:opacity-100 transition-opacity">
                      {horas}h
                    </div>
                  </div>
                </div>
                <span className="text-xs text-slate-500 font-medium">{diasSemana[i]}</span>
              </div>
            )
          })}
        </div>
        <div className="flex justify-between mt-4 text-xs text-slate-400">
          <span>Esta semana</span>
          <span>Total: {actividadSemanal.reduce((a,b)=>a+b,0)} horas</span>
        </div>
      </div>
    </div>
  )
}

function StatBox({ icon: Icon, value, label, color }: any) {
  const colors: Record<string, string> = { violet: "text-violet-500 bg-violet-50", emerald: "text-emerald-500 bg-emerald-50", amber: "text-amber-500 bg-amber-50", sky: "text-sky-500 bg-sky-50" }
  return (
    <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm flex items-center gap-3 hover:shadow-md transition-all">
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${colors[color]}`}><Icon className="w-5 h-5" /></div>
      <div><p className="text-xl font-bold text-slate-800">{value}</p><p className="text-xs text-slate-500">{label}</p></div>
    </div>
  )
}