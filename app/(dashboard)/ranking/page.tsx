"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Trophy, Medal, Crown, TrendingUp, Zap, Flame, ArrowUp, ArrowDown } from "lucide-react"
import { supabase } from "@/lib/supabase"

const estudiantesSimulados = [
  { id: "user-1", name: "Ana García", carrera: "Medicina", xp: 4200, protocolos: 7, completados: 3, avatar: "AG", color: "from-violet-400 to-purple-500", racha: 12, cambio: 0 },
  { id: "user-2", name: "Carlos Mendoza", carrera: "Enfermería", xp: 3800, protocolos: 5, completados: 2, avatar: "CM", color: "from-emerald-400 to-teal-500", racha: 8, cambio: 1 },
  { id: "user-3", name: "María Rodríguez", carrera: "Psicología", xp: 3500, protocolos: 6, completados: 1, avatar: "MR", color: "from-sky-400 to-blue-500", racha: 6, cambio: -1 },
  { id: "user-4", name: "Luis Torres", carrera: "Medicina", xp: 2800, protocolos: 4, completados: 2, avatar: "LT", color: "from-amber-400 to-orange-500", racha: 4, cambio: 2 },
  { id: "user-5", name: "Sofía Vargas", carrera: "Biomedicina", xp: 2500, protocolos: 3, completados: 1, avatar: "SV", color: "from-rose-400 to-pink-500", racha: 5, cambio: 0 },
  { id: "user-6", name: "Diego Ramírez", carrera: "Medicina", xp: 2100, protocolos: 3, completados: 0, avatar: "DR", color: "from-indigo-400 to-blue-500", racha: 3, cambio: 1 },
  { id: "user-7", name: "Valentina López", carrera: "Enfermería", xp: 1800, protocolos: 2, completados: 1, avatar: "VL", color: "from-pink-400 to-rose-500", racha: 2, cambio: -1 },
  { id: "test-user", name: "Tú", carrera: "Medicina", xp: 800, protocolos: 2, completados: 1, avatar: "TÚ", color: "from-[#7C4DFF] to-[#4D9FFF]", racha: 3, cambio: 0, esTu: true },
]

export default function RankingPage() {
  const [ranking, setRanking] = useState<any[]>([])
  const [showConfetti, setShowConfetti] = useState(false)
  const [animateIn, setAnimateIn] = useState(false)

  useEffect(() => {
    cargarRanking()
    setTimeout(() => setAnimateIn(true), 300)
  }, [])

  const cargarRanking = async () => {
    const { data } = await supabase.from("protocols").select("*").eq("user_id", "test-user")
    if (data) {
      const completados = data.filter(p => p.etapa >= 10).length
      const xp = data.length * 200 + completados * 500

      const rankingActualizado = estudiantesSimulados
        .map(est => est.esTu ? { ...est, xp, protocolos: data.length, completados } : est)
        .sort((a, b) => b.xp - a.xp)

      setRanking(rankingActualizado)

      if (completados > 0) setShowConfetti(true)
    }
  }

  const tuPosicion = ranking.findIndex(r => r.esTu) + 1
  const top3 = ranking.slice(0, 3)

  const getNivel = (xp: number) => {
    const nivel = Math.floor(xp / 1000) + 1
    if (nivel <= 3) return { nombre: "Novato", emoji: "🌱" }
    if (nivel <= 6) return { nombre: "Junior", emoji: "🔬" }
    if (nivel <= 12) return { nombre: "Senior", emoji: "🧬" }
    if (nivel <= 24) return { nombre: "Elite", emoji: "🏆" }
    return { nombre: "Leyenda", emoji: "👑" }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 100 } }
  }

  return (
    <div className="p-8 space-y-6">
      {showConfetti && (
        <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
          <div className="text-6xl animate-bounce">🎉</div>
          <div className="absolute top-10 left-10 text-4xl animate-ping">🌟</div>
          <div className="absolute top-20 right-20 text-5xl animate-pulse">✨</div>
          <div className="absolute bottom-20 left-20 text-3xl animate-bounce delay-500">⭐</div>
          <div className="absolute bottom-10 right-10 text-4xl animate-ping delay-300">💫</div>
        </motion.div>
      )}

      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-slate-800 font-display">🏆 Ranking de Investigadores</h1>
        <p className="text-sm text-slate-500 mt-1">Compite con tus compañeros y demuestra tu dedicación</p>
      </motion.div>

      {/* Tu posición - Hero card */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="bg-gradient-to-br from-[#1a0533] via-[#2d1160] to-[#1a0533] rounded-2xl p-6 text-white relative overflow-hidden">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} 
          className="absolute -top-20 -right-20 w-64 h-64 border-2 border-white/10 rounded-full" />
        <motion.div animate={{ rotate: -360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} 
          className="absolute -bottom-10 -left-10 w-32 h-32 border border-white/10 rounded-full" />
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <p className="text-white/60 text-sm">Tu posición actual</p>
            <div className="flex items-center gap-4 mt-2">
              <motion.span 
                key={tuPosicion}
                initial={{ scale: 2, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                className="text-6xl font-bold bg-gradient-to-r from-yellow-300 to-amber-400 bg-clip-text text-transparent">
                #{tuPosicion || "?"}
              </motion.span>
              <div>
                <p className="text-xl font-bold">{ranking.find(r => r.esTu)?.xp || 0} XP</p>
                <p className="text-sm text-white/60">{ranking.find(r => r.esTu)?.protocolos || 0} protocolos • {ranking.find(r => r.esTu)?.completados || 0} completados</p>
                <div className="flex items-center gap-1 mt-1 text-xs text-amber-400">
                  <Flame className="w-3.5 h-3.5" /> Racha de {ranking.find(r => r.esTu)?.racha || 0} días
                </div>
              </div>
            </div>
          </div>
          <motion.div 
            animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}
            className="text-center">
            <Trophy className="w-16 h-16 text-yellow-400 mx-auto drop-shadow-lg" />
            <p className="text-xs text-white/60 mt-1">Top {Math.round((tuPosicion/ranking.length)*100)}%</p>
          </motion.div>
        </div>
        <div className="mt-4 h-2 bg-white/10 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }} animate={{ width: `${Math.max(100 - (tuPosicion/ranking.length)*100, 5)}%` }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-full bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full" />
        </div>
      </motion.div>

      {/* Top 3 */}
      <motion.div variants={containerVariants} initial="hidden" animate="show" className="grid grid-cols-3 gap-4">
        {top3.map((est, i) => (
          <motion.div key={est.id} variants={itemVariants} whileHover={{ y: -8, scale: 1.02 }}
            className={`bg-white rounded-2xl p-5 border shadow-sm text-center relative overflow-hidden transition-all ${
              i === 0 ? "border-yellow-300 shadow-yellow-100 ring-2 ring-yellow-200" : "border-slate-100"}`}>
            {i === 0 && (
              <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}
                className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-yellow-200 to-transparent rounded-bl-3xl flex items-start justify-end p-2">
                <Crown className="w-6 h-6 text-yellow-500" />
              </motion.div>
            )}
            <motion.div whileHover={{ scale: 1.1 }} className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${est.color} flex items-center justify-center text-white font-bold text-xl mx-auto mb-3 shadow-lg`}>
              {est.avatar}
            </motion.div>
            <p className="font-bold text-slate-800">{est.name}</p>
            <p className="text-xs text-slate-500">{est.carrera}</p>
            <div className="flex items-center justify-center gap-1 mt-2">
              <span className="text-2xl font-bold text-slate-800">{est.xp}</span>
              <span className="text-xs text-slate-400">XP</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-xs text-slate-400 mt-1">
              <span>{est.protocolos} prot.</span>
              <span>•</span>
              <span className="flex items-center gap-0.5"><Flame className="w-3 h-3 text-orange-400" />{est.racha}d</span>
            </div>
            <motion.div 
              animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity }}
              className={`mt-2 inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${
                i === 0 ? "bg-yellow-50 text-yellow-600" : i === 1 ? "bg-slate-50 text-slate-500" : "bg-amber-50 text-amber-600"
              }`}>
              #{i+1} {i === 0 ? "🥇" : i === 1 ? "🥈" : "🥉"}
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* Tabla */}
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
        className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-50 bg-slate-50/80">
          <div className="grid grid-cols-12 gap-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <div className="col-span-2">Posición</div>
            <div className="col-span-4">Investigador</div>
            <div className="col-span-2 text-center">XP</div>
            <div className="col-span-2 text-center">Nivel</div>
            <div className="col-span-2 text-center">Racha</div>
          </div>
        </div>
        <AnimatePresence>
          {ranking.map((est, i) => (
            <motion.div key={est.id} 
              initial={{ opacity: 0, x: -20 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ delay: i * 0.05 }}
              whileHover={{ backgroundColor: "rgba(124,77,255,0.02)", scale: 1.005 }}
              className={`grid grid-cols-12 gap-4 p-4 items-center transition-all border-b border-slate-50 last:border-0 ${
                est.esTu ? "bg-violet-50/50 border-l-4 border-[#7C4DFF]" : ""
              }`}>
              <div className="col-span-2 flex items-center gap-2">
                <span className={`text-sm font-bold w-6 text-right ${i < 3 ? "text-amber-500" : "text-slate-500"}`}>#{i+1}</span>
                {est.cambio > 0 ? <ArrowUp className="w-3.5 h-3.5 text-emerald-500" /> : 
                 est.cambio < 0 ? <ArrowDown className="w-3.5 h-3.5 text-red-500" /> : 
                 <div className="w-1 h-4 bg-slate-300 rounded-full" />}
              </div>
              <div className="col-span-4 flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${est.color} flex items-center justify-center text-white font-bold text-xs shadow-md`}>
                  {est.avatar}
                </div>
                <div>
                  <p className="font-medium text-sm text-slate-700">
                    {est.name} {est.esTu && <span className="text-xs text-[#7C4DFF] font-bold ml-1">(Tú)</span>}
                  </p>
                  <p className="text-xs text-slate-400">{est.carrera}</p>
                </div>
              </div>
              <div className="col-span-2 text-center">
                <span className="font-bold text-sm text-slate-700">{est.xp}</span>
                <span className="text-xs text-slate-400 ml-0.5">XP</span>
              </div>
              <div className="col-span-2 text-center">
                <motion.span whileHover={{ scale: 1.1 }}
                  className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
                    est.xp >= 4000 ? "bg-yellow-50 text-yellow-600" :
                    est.xp >= 2500 ? "bg-violet-50 text-violet-600" :
                    "bg-slate-50 text-slate-600"
                  }`}>
                  {getNivel(est.xp).emoji} Nv.{Math.floor(est.xp/1000)+1}
                </motion.span>
              </div>
              <div className="col-span-2 text-center">
                <span className="flex items-center justify-center gap-1 text-sm font-medium text-slate-600">
                  <Flame className="w-3.5 h-3.5 text-orange-400" />
                  {est.racha}d
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}