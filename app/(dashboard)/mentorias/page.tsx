import { Users, Star, Clock, Calendar, MessageSquare, Search, ArrowRight } from "lucide-react"

const mentores = [
  {
    name: "Dr. Ricardo Palma",
    specialty: "Metodología de Investigación",
    rating: 4.9,
    reviews: 128,
    price: "Gratis",
    availability: "Lunes y Miércoles",
    avatar: "RP",
    color: "violet"
  },
  {
    name: "Dra. Carmen Vega",
    specialty: "Bioestadística Avanzada",
    rating: 4.8,
    reviews: 96,
    price: "Gratis",
    availability: "Martes y Jueves",
    avatar: "CV",
    color: "emerald"
  },
  {
    name: "Dr. Manuel Ortiz",
    specialty: "Investigación Clínica",
    rating: 4.7,
    reviews: 84,
    price: "Gratis",
    availability: "Viernes",
    avatar: "MO",
    color: "sky"
  },
  {
    name: "Dra. Laura Sánchez",
    specialty: "Redacción Científica",
    rating: 4.9,
    reviews: 156,
    price: "Gratis",
    availability: "Miércoles y Viernes",
    avatar: "LS",
    color: "orange"
  },
]

export default function MentoriasPage() {
  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 font-display">💬 Mentorías</h1>
          <p className="text-sm text-slate-500 mt-1">Conecta con mentores expertos en investigación</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar mentor..."
            className="pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#7C4DFF]/40 transition-all"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
          <Users className="w-5 h-5 text-violet-500 mb-2" />
          <p className="text-2xl font-bold text-slate-800">24</p>
          <p className="text-xs text-slate-500">Mentores activos</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
          <MessageSquare className="w-5 h-5 text-emerald-500 mb-2" />
          <p className="text-2xl font-bold text-slate-800">1,248</p>
          <p className="text-xs text-slate-500">Sesiones realizadas</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
          <Star className="w-5 h-5 text-amber-500 mb-2" />
          <p className="text-2xl font-bold text-slate-800">4.8</p>
          <p className="text-xs text-slate-500">Calificación promedio</p>
        </div>
      </div>

      {/* Mentores */}
      <div className="grid grid-cols-2 gap-4">
        {mentores.map((mentor) => (
          <div key={mentor.name} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-400 to-sky-400 flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                {mentor.avatar}
              </div>
              <div>
                <h3 className="font-bold text-slate-800">{mentor.name}</h3>
                <p className="text-sm text-slate-500">{mentor.specialty}</p>
                <div className="flex items-center gap-1 mt-1 text-amber-500">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span className="text-sm font-semibold">{mentor.rating}</span>
                  <span className="text-xs text-slate-400">({mentor.reviews} reseñas)</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Clock className="w-3.5 h-3.5" /> {mentor.availability}
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-full font-semibold">{mentor.price}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 bg-[#7C4DFF] text-white font-semibold text-sm py-2.5 rounded-xl hover:bg-[#6A3DE8] transition-colors flex items-center justify-center gap-1.5">
                <Calendar className="w-4 h-4" /> Agendar Sesión
              </button>
              <button className="px-4 py-2.5 border border-slate-200 rounded-xl text-slate-600 text-sm hover:bg-slate-50 transition-colors">
                <MessageSquare className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}