"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Mail, MapPin, BookOpen, Award, Calendar, Clock, Edit3, Camera, Save, X, Globe, FileText } from "lucide-react"
import { supabase } from "@/lib/supabase"

export default function PerfilPage() {
  const [editando, setEditando] = useState(false)
  const [protocols, setProtocols] = useState<any[]>([])
  const [perfil, setPerfil] = useState({
    nombre: "Ana García",
    carrera: "Medicina",
    semestre: "3er Semestre",
    universidad: "Universidad Nacional",
    email: "ana.garcia@medicina.edu",
    bio: "Estudiante de Medicina apasionada por la investigación científica. Interesada en epidemiología y salud pública.",
    linkedin: "",
    website: "",
  })

  useEffect(() => {
    cargarDatos()
  }, [])

  const cargarDatos = async () => {
    const { data } = await supabase.from("protocols").select("*").eq("user_id", "test-user")
    if (data) setProtocols(data)
  }

  const protocolosCompletados = protocols.filter(p => p.etapa >= 10).length
  const totalXP = protocols.length * 200 + protocolosCompletados * 500
  const nivel = Math.floor(totalXP / 1000) + 1
  const cursos = 4
  const insignias = protocolosCompletados + 3

  return (
    <div className="p-8 space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white font-display">👤 Mi Perfil</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Gestiona tu información personal y académica</p>
      </motion.div>

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-[#7C4DFF] via-[#6A3DE8] to-[#4D9FFF]" />
        <div className="px-6 pb-6">
          <div className="flex items-end gap-4 -mt-12">
            <div className="relative group">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-violet-400 to-sky-400 flex items-center justify-center text-white text-3xl font-bold ring-4 ring-white dark:ring-slate-800 shadow-lg">
                {perfil.nombre.split(" ").map(n => n[0]).join("").slice(0, 2)}
              </div>
              <button className="absolute -bottom-1 -right-1 p-2 bg-white dark:bg-slate-700 rounded-lg shadow-md border border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors">
                <Camera className="w-4 h-4 text-slate-500" />
              </button>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white">{perfil.nombre}</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">{perfil.carrera} • {perfil.semestre}</p>
            </div>
            <button onClick={() => setEditando(!editando)}
              className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 dark:border-slate-600 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
              {editando ? <><X className="w-4 h-4" /> Cancelar</> : <><Edit3 className="w-4 h-4" /> Editar Perfil</>}
            </button>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-3 gap-6">
        {/* Info */}
        <div className="col-span-2 space-y-4">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700 shadow-sm">
            <h3 className="font-bold text-slate-800 dark:text-white mb-4">Información Personal</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-slate-400" />
                {editando ? (
                  <input value={perfil.email} onChange={e => setPerfil({...perfil, email: e.target.value})}
                    className="flex-1 p-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-sm" />
                ) : (
                  <span className="text-slate-600 dark:text-slate-300">{perfil.email}</span>
                )}
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="w-4 h-4 text-slate-400" />
                {editando ? (
                  <input value={perfil.universidad} onChange={e => setPerfil({...perfil, universidad: e.target.value})}
                    className="flex-1 p-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-sm" />
                ) : (
                  <span className="text-slate-600 dark:text-slate-300">{perfil.universidad} • {perfil.carrera}</span>
                )}
              </div>
              <div className="flex items-center gap-3 text-sm">
                <BookOpen className="w-4 h-4 text-slate-400" />
                {editando ? (
                  <input value={perfil.carrera} onChange={e => setPerfil({...perfil, carrera: e.target.value})}
                    className="flex-1 p-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-sm" />
                ) : (
                  <span className="text-slate-600 dark:text-slate-300">{perfil.carrera} • {perfil.semestre}</span>
                )}
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span className="text-slate-600 dark:text-slate-300">Ingreso: 2024</span>
              </div>
            </div>

            {editando && (
              <div className="mt-4 space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Globe className="w-4 h-4 text-slate-400" />
                  <input value={perfil.linkedin} onChange={e => setPerfil({...perfil, linkedin: e.target.value})}
                    placeholder="URL de LinkedIn" className="flex-1 p-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-sm" />
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Globe className="w-4 h-4 text-slate-400" />
                  <input value={perfil.website} onChange={e => setPerfil({...perfil, website: e.target.value})}
                    placeholder="Sitio web" className="flex-1 p-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-sm" />
                </div>
              </div>
            )}

            {editando && (
              <button onClick={() => setEditando(false)} className="mt-4 bg-[#7C4DFF] text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-[#6A3DE8] flex items-center gap-2">
                <Save className="w-4 h-4" /> Guardar cambios
              </button>
            )}
          </motion.div>

          {/* Bio */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700 shadow-sm">
            <h3 className="font-bold text-slate-800 dark:text-white mb-3">Sobre mí</h3>
            {editando ? (
              <textarea value={perfil.bio} onChange={e => setPerfil({...perfil, bio: e.target.value})}
                rows={3} className="w-full p-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-sm" />
            ) : (
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{perfil.bio}</p>
            )}
          </motion.div>
        </div>

        {/* Stats */}
        <div className="space-y-4">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-[#7C4DFF] to-[#6A3DE8] rounded-2xl p-6 text-white text-center">
            <Award className="w-10 h-10 mx-auto mb-3 text-white/80" />
            <p className="text-3xl font-bold">Nivel {nivel}</p>
            <p className="text-sm text-white/70 mt-1">
              {nivel <= 5 ? "Novato" : nivel <= 10 ? "Junior" : nivel <= 20 ? "Senior" : "Elite"}
            </p>
            <div className="mt-3 h-2 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-white rounded-full" style={{width: `${(totalXP % 1000) / 10}%`}} />
            </div>
            <p className="text-xs text-white/60 mt-2">{totalXP} XP totales</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700 shadow-sm">
            <h3 className="font-bold text-slate-800 dark:text-white mb-4">Estadísticas</h3>
            <div className="space-y-3">
              <StatRow icon={BookOpen} label="Cursos" value={cursos} color="violet" />
              <StatRow icon={FileText} label="Protocolos" value={protocols.length} color="emerald" />
              <StatRow icon={Award} label="Insignias" value={insignias} color="amber" />
              <StatRow icon={Clock} label="Horas" value={protocols.length * 4} color="sky" />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

function StatRow({ icon: Icon, label, value, color }: any) {
  const colors: Record<string, string> = {
    violet: "bg-violet-50 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400",
    emerald: "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400",
    amber: "bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
    sky: "bg-sky-50 text-sky-600 dark:bg-sky-900/30 dark:text-sky-400",
  }
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${colors[color]}`}>
          <Icon className="w-4 h-4" />
        </div>
        <span className="text-sm text-slate-600 dark:text-slate-300">{label}</span>
      </div>
      <span className="font-bold text-slate-800 dark:text-white">{value}</span>
    </div>
  )
}