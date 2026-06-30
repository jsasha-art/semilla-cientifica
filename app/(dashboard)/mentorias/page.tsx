"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Users, Star, Clock, Calendar, MessageSquare, Search, Video, CheckCircle } from "lucide-react"

const mentores = [
  { name: "Dr. Ricardo Palma", especialidad: "Metodología de Investigación", rating: 4.9, reseñas: 128, disponibilidad: "Lunes y Miércoles 10-12h", avatar: "RP", color: "from-violet-400 to-purple-500", desc: "Doctor en Salud Pública. 15 años guiando tesis de pregrado y posgrado." },
  { name: "Dra. Carmen Vega", especialidad: "Bioestadística Avanzada", rating: 4.8, reseñas: 96, disponibilidad: "Martes y Jueves 14-16h", avatar: "CV", color: "from-emerald-400 to-teal-500", desc: "Bioestadística con experiencia en SPSS, R y Python. Investigadora en ensayos clínicos." },
  { name: "Dr. Manuel Ortiz", especialidad: "Investigación Clínica", rating: 4.7, reseñas: 84, disponibilidad: "Viernes 9-12h", avatar: "MO", color: "from-sky-400 to-blue-500", desc: "Médico investigador. Especialista en epidemiología y estudios clínicos." },
  { name: "Dra. Laura Sánchez", especialidad: "Redacción Científica", rating: 4.9, reseñas: 156, disponibilidad: "Miércoles y Viernes 15-17h", avatar: "LS", color: "from-amber-400 to-orange-500", desc: "Editora de revistas indexadas. Experta en normas APA y Vancouver." },
  { name: "Dr. Pedro Rojas", especialidad: "Investigación Cualitativa", rating: 4.6, reseñas: 67, disponibilidad: "Lunes y Jueves 8-10h", avatar: "PR", color: "from-rose-400 to-pink-500", desc: "Antropólogo médico. Especialista en entrevistas y grupos focales." },
  { name: "Dra. María Flores", especialidad: "Salud Pública", rating: 4.8, reseñas: 112, disponibilidad: "Martes 14-18h", avatar: "MF", color: "from-indigo-400 to-blue-500", desc: "Epidemióloga. Asesora en políticas de salud y estudios poblacionales." },
]

export default function MentoriasPage() {
  const [agendada, setAgendada] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  const agendar = (nombre: string) => {
    setAgendada(nombre)
    setTimeout(() => setAgendada(null), 3000)
  }

  const filtrados = mentores.filter(m =>
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.especialidad.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white font-display">💬 Mentorías</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Conecta con mentores expertos en investigación</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
            placeholder="Buscar mentor..." className="pl-10 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-xl text-sm" />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <StatBox icon={Users} value={mentores.length} label="Mentores activos" color="violet" />
        <StatBox icon={MessageSquare} value="1,248" label="Sesiones realizadas" color="emerald" />
        <StatBox icon={Star} value="4.8" label="Calificación promedio" color="amber" />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-4">
        {filtrados.map((mentor) => (
          <motion.div key={mentor.name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-start gap-4 mb-4">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${mentor.color} flex items-center justify-center text-white font-bold text-xl flex-shrink-0 shadow-lg`}>
                {mentor.avatar}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-slate-800 dark:text-white">{mentor.name}</h3>
                <p className="text-sm text-[#7C4DFF] font-medium">{mentor.especialidad}</p>
                <div className="flex items-center gap-1 mt-1 text-amber-500">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span className="text-sm font-semibold">{mentor.rating}</span>
                  <span className="text-xs text-slate-400">({mentor.reseñas} reseñas)</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">{mentor.desc}</p>
              </div>
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <Clock className="w-3.5 h-3.5" /> {mentor.disponibilidad}
              </div>
            </div>

            <div className="flex gap-2">
              <button onClick={() => agendar(mentor.name)}
                className="flex-1 bg-[#7C4DFF] text-white font-semibold text-sm py-2.5 rounded-xl hover:bg-[#6A3DE8] transition-colors flex items-center justify-center gap-1.5">
                {agendada === mentor.name ? (
                  <><CheckCircle className="w-4 h-4" /> ¡Agendada!</>
                ) : (
                  <><Calendar className="w-4 h-4" /> Agendar sesión</>
                )}
              </button>
              <button className="px-4 py-2.5 border border-slate-200 dark:border-slate-600 rounded-xl text-slate-600 dark:text-slate-300 text-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                <Video className="w-4 h-4" />
              </button>
              <button className="px-4 py-2.5 border border-slate-200 dark:border-slate-600 rounded-xl text-slate-600 dark:text-slate-300 text-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                <MessageSquare className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {agendada && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-6 right-6 bg-emerald-500 text-white px-6 py-3 rounded-2xl shadow-xl font-semibold">
          ✅ Sesión agendada con {agendada}
        </motion.div>
      )}
    </div>
  )
}

function StatBox({ icon: Icon, value, label, color }: any) {
  const colors: Record<string, string> = { violet: "text-violet-500", emerald: "text-emerald-500", amber: "text-amber-500" }
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-100 dark:border-slate-700 shadow-sm flex items-center gap-3">
      <div className="w-10 h-10 bg-slate-50 dark:bg-slate-700 rounded-xl flex items-center justify-center">
        <Icon className={`w-5 h-5 ${colors[color]}`} />
      </div>
      <div><p className="text-xl font-bold text-slate-800 dark:text-white">{value}</p><p className="text-xs text-slate-500 dark:text-slate-400">{label}</p></div>
    </div>
  )
}