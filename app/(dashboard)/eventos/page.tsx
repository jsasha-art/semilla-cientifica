import { Calendar, MapPin, Clock, Users, Plus, ArrowRight } from "lucide-react"

const eventos = [
  {
    title: "Taller: Cómo Publicar en Revistas Indexadas",
    date: "15 Julio, 2025",
    time: "10:00 - 12:00",
    location: "Virtual - Zoom",
    attendees: 234,
    type: "Taller",
    color: "violet",
    speaker: "Dr. Ricardo Palma"
  },
  {
    title: "Conferencia: Inteligencia Artificial en Investigación",
    date: "20 Julio, 2025",
    time: "16:00 - 18:00",
    location: "Auditorio Principal",
    attendees: 456,
    type: "Conferencia",
    color: "emerald",
    speaker: "Dra. Carmen Vega"
  },
  {
    title: "Seminario: Metodología Cualitativa en Salud",
    date: "25 Julio, 2025",
    time: "09:00 - 13:00",
    location: "Virtual - Google Meet",
    attendees: 189,
    type: "Seminario",
    color: "sky",
    speaker: "Dr. Manuel Ortiz"
  },
  {
    title: "Hackathon de Investigación Científica",
    date: "1-3 Agosto, 2025",
    time: "Todo el día",
    location: "Campus Universitario",
    attendees: 567,
    type: "Evento Especial",
    color: "orange",
    speaker: "Múltiples facilitadores"
  },
]

const colorMap: Record<string, { border: string; bg: string; text: string }> = {
  violet: { border: "border-l-violet-500", bg: "bg-violet-50", text: "text-violet-600" },
  emerald: { border: "border-l-emerald-500", bg: "bg-emerald-50", text: "text-emerald-600" },
  sky: { border: "border-l-sky-500", bg: "bg-sky-50", text: "text-sky-600" },
  orange: { border: "border-l-orange-500", bg: "bg-orange-50", text: "text-orange-600" },
}

export default function EventosPage() {
  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 font-display">📅 Eventos</h1>
          <p className="text-sm text-slate-500 mt-1">Talleres, conferencias y seminarios de investigación</p>
        </div>
        <button className="flex items-center gap-2 bg-[#7C4DFF] text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-[#6A3DE8] transition-colors shadow-lg shadow-[#7C4DFF]/20">
          <Plus className="w-4 h-4" /> Proponer Evento
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
          <Calendar className="w-5 h-5 text-violet-500 mb-2" />
          <p className="text-2xl font-bold text-slate-800">12</p>
          <p className="text-xs text-slate-500">Eventos este mes</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
          <Users className="w-5 h-5 text-emerald-500 mb-2" />
          <p className="text-2xl font-bold text-slate-800">1,446</p>
          <p className="text-xs text-slate-500">Asistentes totales</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
          <Clock className="w-5 h-5 text-sky-500 mb-2" />
          <p className="text-2xl font-bold text-slate-800">48h</p>
          <p className="text-xs text-slate-500">Horas de capacitación</p>
        </div>
      </div>

      {/* Próximos eventos */}
      <div>
        <h2 className="text-lg font-bold text-slate-800 mb-3">Próximos Eventos</h2>
        <div className="space-y-3">
          {eventos.map((evento) => (
            <div key={evento.title} className={`bg-white rounded-2xl p-5 border border-slate-100 shadow-sm border-l-4 ${colorMap[evento.color].border} hover:shadow-md transition-all cursor-pointer`}>
              <div className="flex items-center justify-between">
                <div className="flex gap-4">
                  <div className="text-center flex-shrink-0">
                    <p className="text-2xl font-bold text-slate-800">{evento.date.split(" ")[0]}</p>
                    <p className="text-xs text-slate-500">{evento.date.split(" ")[1]?.replace(",", "")}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800 mb-2">{evento.title}</h3>
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {evento.time}</span>
                      <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {evento.location}</span>
                      <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {evento.attendees} asistentes</span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`text-xs font-medium ${colorMap[evento.color].text} ${colorMap[evento.color].bg} px-2.5 py-0.5 rounded-full`}>
                        {evento.type}
                      </span>
                      <span className="text-xs text-slate-500">🎤 {evento.speaker}</span>
                    </div>
                  </div>
                </div>
                <button className="flex items-center gap-1.5 bg-[#7C4DFF] text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-[#6A3DE8] transition-colors">
                  Registrarse <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}