import { Mail, MapPin, BookOpen, Award, Calendar, Clock, Edit3, Settings, Camera } from "lucide-react"

export default function PerfilPage() {
  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 font-display">👤 Mi Perfil</h1>
        <p className="text-sm text-slate-500 mt-1">Gestiona tu información personal y académica</p>
      </div>

      {/* Header del perfil */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-[#7C4DFF] to-[#4D9FFF]" />
        <div className="px-6 pb-6">
          <div className="flex items-end gap-4 -mt-10">
            <div className="relative">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-violet-400 to-sky-400 flex items-center justify-center text-white text-3xl font-bold ring-4 ring-white shadow-lg">
                AG
              </div>
              <button className="absolute -bottom-1 -right-1 p-2 bg-white rounded-lg shadow-md border border-slate-200 hover:bg-slate-50 transition-colors">
                <Camera className="w-4 h-4 text-slate-500" />
              </button>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-slate-800">Dra. Ana García</h2>
              <p className="text-sm text-slate-500">Estudiante de Medicina • 3er Semestre</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
              <Edit3 className="w-4 h-4" /> Editar Perfil
            </button>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 space-y-4">
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-4">Información Personal</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-slate-400" />
                <span className="text-slate-600">ana.garcia@medicina.edu</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="w-4 h-4 text-slate-400" />
                <span className="text-slate-600">Universidad Nacional • Facultad de Medicina</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <BookOpen className="w-4 h-4 text-slate-400" />
                <span className="text-slate-600">Carrera: Medicina Humana</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span className="text-slate-600">Ingreso: 2024</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-4">Estadísticas</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-violet-600">12</p>
                <p className="text-xs text-slate-500">Cursos</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-emerald-600">4</p>
                <p className="text-xs text-slate-500">Protocolos</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-amber-600">8</p>
                <p className="text-xs text-slate-500">Insignias</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-gradient-to-br from-[#7C4DFF] to-[#6A3DE8] rounded-2xl p-6 text-white text-center">
            <Award className="w-10 h-10 mx-auto mb-3 text-white/80" />
            <p className="text-2xl font-bold">Nivel 12</p>
            <p className="text-sm text-white/70 mt-1">Investigador Junior</p>
            <div className="mt-3 h-2 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-white rounded-full" style={{width: "82%"}} />
            </div>
            <p className="text-xs text-white/60 mt-2">2,450 / 3,000 XP</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-3">Horas de Estudio</h3>
            <div className="flex items-center gap-2 text-sm text-slate-600 mb-2">
              <Clock className="w-4 h-4 text-violet-500" />
              <span>Esta semana: 8h</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Clock className="w-4 h-4 text-emerald-500" />
              <span>Total: 48h</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}