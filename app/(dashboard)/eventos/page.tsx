"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar, MapPin, Clock, Users, Plus, ArrowRight, Search, Filter, Tag, Star, BookOpen } from "lucide-react"

const eventos = [
  { title: "Taller: Cómo Publicar en Revistas Indexadas", fecha: "15 Julio, 2025", hora: "10:00 - 12:00", lugar: "Virtual - Zoom", asistentes: 234, tipo: "Taller", color: "violet", ponente: "Dr. Ricardo Palma", desc: "Aprende estrategias para publicar en Scopus y Web of Science.", tags: ["Publicación", "Scopus", "Indexación"], destacado: true },
  { title: "Conferencia: IA en Investigación Científica", fecha: "20 Julio, 2025", hora: "16:00 - 18:00", lugar: "Auditorio Principal", asistentes: 456, tipo: "Conferencia", color: "emerald", ponente: "Dra. Carmen Vega", desc: "Cómo la inteligencia artificial está transformando la investigación.", tags: ["IA", "Tecnología"], destacado: true },
  { title: "Seminario: Metodología Cualitativa en Salud", fecha: "25 Julio, 2025", hora: "09:00 - 13:00", lugar: "Virtual - Google Meet", asistentes: 189, tipo: "Seminario", color: "sky", ponente: "Dr. Manuel Ortiz", desc: "Técnicas de entrevista y grupos focales para investigación.", tags: ["Cualitativa", "Entrevistas"], destacado: false },
  { title: "Hackathon de Investigación Científica", fecha: "1-3 Agosto, 2025", hora: "Todo el día", lugar: "Campus Universitario", asistentes: 567, tipo: "Hackathon", color: "orange", ponente: "Múltiples facilitadores", desc: "48 horas para desarrollar un proyecto de investigación desde cero.", tags: ["Hackathon", "Competencia"], destacado: true },
  { title: "Workshop: SPSS para Principiantes", fecha: "10 Agosto, 2025", hora: "14:00 - 17:00", lugar: "Laboratorio de Cómputo", asistentes: 120, tipo: "Workshop", color: "rose", ponente: "Dra. Laura Sánchez", desc: "Taller práctico de SPSS desde cero.", tags: ["SPSS", "Estadística"], destacado: false },
  { title: "Congreso: Investigación en Pregrado", fecha: "5-7 Septiembre, 2025", hora: "08:00 - 18:00", lugar: "Centro de Convenciones", asistentes: 890, tipo: "Congreso", color: "indigo", ponente: "Varios ponentes", desc: "El congreso más grande de investigación universitaria.", tags: ["Congreso", "Pregrado"], destacado: true },
]

const colorMap: Record<string, { border: string; bg: string; text: string; light: string }> = {
  violet: { border: "border-l-violet-500", bg: "bg-violet-50", text: "text-violet-600", light: "bg-violet-50" },
  emerald: { border: "border-l-emerald-500", bg: "bg-emerald-50", text: "text-emerald-600", light: "bg-emerald-50" },
  sky: { border: "border-l-sky-500", bg: "bg-sky-50", text: "text-sky-600", light: "bg-sky-50" },
  orange: { border: "border-l-orange-500", bg: "bg-orange-50", text: "text-orange-600", light: "bg-orange-50" },
  rose: { border: "border-l-rose-500", bg: "bg-rose-50", text: "text-rose-600", light: "bg-rose-50" },
  indigo: { border: "border-l-indigo-500", bg: "bg-indigo-50", text: "text-indigo-600", light: "bg-indigo-50" },
}

export default function EventosPage() {
  const [selectedEvento, setSelectedEvento] = useState<any>(null)
  const [inscrito, setInscrito] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filtroTipo, setFiltroTipo] = useState("Todos")

  const inscribir = (titulo: string) => {
    if (!inscrito.includes(titulo)) {
      setInscrito([...inscrito, titulo])
    }
  }

  const tipos = ["Todos", "Taller", "Conferencia", "Seminario", "Hackathon", "Workshop", "Congreso"]
  const filtrados = eventos.filter(e => {
    const matchSearch = e.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchTipo = filtroTipo === "Todos" || e.tipo === filtroTipo
    return matchSearch && matchTipo
  })

  if (selectedEvento) {
    return (
      <div className="p-8 space-y-6">
        <button onClick={() => setSelectedEvento(null)} className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800">
          ← Volver a eventos
        </button>
        <div className={`bg-white dark:bg-slate-800 rounded-2xl p-8 border shadow-sm ${colorMap[selectedEvento.color].border} border-l-4`}>
          <div className="flex items-center justify-between mb-4">
            <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${colorMap[selectedEvento.color].bg} ${colorMap[selectedEvento.color].text}`}>
              {selectedEvento.tipo}
            </span>
            {selectedEvento.destacado && (
              <span className="flex items-center gap-1 text-xs text-amber-500"><Star className="w-4 h-4 fill-amber-400" /> Destacado</span>
            )}
          </div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">{selectedEvento.title}</h1>
          <p className="text-slate-600 dark:text-slate-300 mb-6">{selectedEvento.desc}</p>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <InfoItem icon={Calendar} label="Fecha" value={selectedEvento.fecha} />
            <InfoItem icon={Clock} label="Hora" value={selectedEvento.hora} />
            <InfoItem icon={MapPin} label="Lugar" value={selectedEvento.lugar} />
            <InfoItem icon={Users} label="Asistentes" value={`${selectedEvento.asistentes} inscritos`} />
          </div>
          <div className="flex gap-2 mb-4">
            {selectedEvento.tags.map((tag: string) => (
              <span key={tag} className="text-xs bg-slate-100 dark:bg-slate-700 px-2.5 py-1 rounded-full">{tag}</span>
            ))}
          </div>
          <button onClick={() => inscribir(selectedEvento.title)}
            className={`w-full py-3.5 rounded-xl font-bold text-lg transition-all ${
              inscrito.includes(selectedEvento.title)
                ? "bg-emerald-500 text-white"
                : "bg-[#7C4DFF] text-white hover:bg-[#6A3DE8] shadow-lg shadow-[#7C4DFF]/20"
            }`}>
            {inscrito.includes(selectedEvento.title) ? "✅ Ya estás inscrito" : "Inscribirse ahora"}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white font-display">📅 Eventos</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Talleres, conferencias y seminarios de investigación</p>
        </div>
        <button className="flex items-center gap-2 bg-[#7C4DFF] text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-[#6A3DE8] transition-colors shadow-lg shadow-[#7C4DFF]/20">
          <Plus className="w-4 h-4" /> Proponer evento
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <StatBox icon={Calendar} value={eventos.length} label="Eventos programados" color="violet" />
        <StatBox icon={Users} value="2,456" label="Total inscritos" color="emerald" />
        <StatBox icon={BookOpen} value="48h" label="Horas de contenido" color="sky" />
      </div>

      {/* Filtros */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
            placeholder="Buscar eventos..." className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-xl text-sm" />
        </div>
        <div className="flex gap-2">
          {tipos.map(t => (
            <button key={t} onClick={() => setFiltroTipo(t)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                filtroTipo === t ? "bg-[#7C4DFF] text-white" : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600"
              }`}>{t}</button>
          ))}
        </div>
      </div>

      {/* Lista */}
      <div className="space-y-3">
        {filtrados.map((evento) => (
          <motion.div key={evento.title} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            onClick={() => setSelectedEvento(evento)}
            className={`bg-white dark:bg-slate-800 rounded-2xl p-5 border shadow-sm border-l-4 ${colorMap[evento.color].border} hover:shadow-md transition-all cursor-pointer`}>
            <div className="flex items-center justify-between">
              <div className="flex gap-4">
                <div className="text-center flex-shrink-0 w-16">
                  <p className="text-2xl font-bold text-slate-800 dark:text-white">{evento.fecha.split(" ")[0]}</p>
                  <p className="text-xs text-slate-500">{evento.fecha.split(" ")[1]?.replace(",", "")}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-slate-800 dark:text-white">{evento.title}</h3>
                    {evento.destacado && <Star className="w-4 h-4 text-amber-400 fill-amber-400" />}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {evento.hora}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {evento.lugar}</span>
                    <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {evento.asistentes}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${colorMap[evento.color].bg} ${colorMap[evento.color].text}`}>{evento.tipo}</span>
                    {inscrito.includes(evento.title) && <span className="text-xs text-emerald-600 font-medium">✅ Inscrito</span>}
                  </div>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-slate-300" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function StatBox({ icon: Icon, value, label, color }: any) {
  const colors: Record<string, string> = { violet: "text-violet-500", emerald: "text-emerald-500", sky: "text-sky-500" }
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-100 dark:border-slate-700 shadow-sm flex items-center gap-3">
      <div className="w-10 h-10 bg-slate-50 dark:bg-slate-700 rounded-xl flex items-center justify-center"><Icon className={`w-5 h-5 ${colors[color]}`} /></div>
      <div><p className="text-xl font-bold text-slate-800 dark:text-white">{value}</p><p className="text-xs text-slate-500 dark:text-slate-400">{label}</p></div>
    </div>
  )
}

function InfoItem({ icon: Icon, label, value }: any) {
  return (
    <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-700 rounded-xl">
      <Icon className="w-5 h-5 text-[#7C4DFF]" />
      <div><p className="text-xs text-slate-500 dark:text-slate-400">{label}</p><p className="font-semibold text-slate-800 dark:text-white">{value}</p></div>
    </div>
  )
}