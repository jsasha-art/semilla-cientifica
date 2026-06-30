"use client"

import { SidebarLeft } from "@/components/layout/sidebar-left"

import { Topbar } from "@/components/layout/topbar"

import { SidebarRight } from "@/components/layout/sidebar-right"

import { Users, BookOpen, FileText, Lightbulb, FileEdit, Calendar, Trophy, BookMarked, BarChart3, Search, ArrowRight, Play, Star } from "lucide-react"



export default function Home() {

  const stats = [

    { icon: Users, value: "1,248", label: "Estudiantes activos", color: "text-violet-600", bg: "bg-violet-50" },

    { icon: BookOpen, value: "24", label: "Cursos disponibles", color: "text-emerald-600", bg: "bg-emerald-50" },

    { icon: FileText, value: "156", label: "Protocolos creados", color: "text-sky-600", bg: "bg-sky-50" },

  ]



  const quickActions = [

    { icon: Lightbulb, label: "Nueva Idea", bg: "bg-amber-50", col: "text-amber-500" },

    { icon: FileEdit, label: "Crear Protocolo", bg: "bg-violet-50", col: "text-violet-500" },

    { icon: Users, label: "Buscar Mentor", bg: "bg-emerald-50", col: "text-emerald-500" },

    { icon: Calendar, label: "Eventos", bg: "bg-sky-50", col: "text-sky-500" },

    { icon: Trophy, label: "Mis Logros", bg: "bg-orange-50", col: "text-orange-500" },

    { icon: BookMarked, label: "Continuar Curso", bg: "bg-rose-50", col: "text-rose-500" },

  ]



  const courses = [

    { icon: BookOpen, title: "Introducción a la Investigación Científica", level: "Principiante", pct: 65, rating: 4.8, students: 342, bg: "bg-violet-50", col: "text-violet-600" },

    { icon: BarChart3, title: "Bioestadística para Principiantes", level: "Principiante", pct: 30, rating: 4.6, students: 218, bg: "bg-emerald-50", col: "text-emerald-600" },

    { icon: FileText, title: "Cómo elaborar un Protocolo de Investigación", level: "Intermedio", pct: 15, rating: 4.9, students: 156, bg: "bg-sky-50", col: "text-sky-600" },

    { icon: Search, title: "Búsqueda Bibliográfica Efectiva", level: "Principiante", pct: 80, rating: 4.7, students: 289, bg: "bg-orange-50", col: "text-orange-600" },

  ]



  const recursos = [

    { label: "Plantillas", icon: "📄" },

    { label: "Guías", icon: "📘" },

    { label: "Calculadoras", icon: "🧮" },

    { label: "Normas APA", icon: "📝" },

    { label: "Normas Vancouver", icon: "📋" },

    { label: "SPSS", icon: "📊" },

    { label: "Excel", icon: "📈" },

    { label: "R / Python", icon: "💻" },

    { label: "Mendeley", icon: "🔖" },

    { label: "Zotero", icon: "📚" },

    { label: "PubMed", icon: "🔬" },

    { label: "Scopus", icon: "🌐" },

  ]



  return (

    <div className="h-screen flex overflow-hidden bg-[#F8FAFC]">

      <SidebarLeft />

      

      <div className="flex-1 flex flex-col overflow-hidden">

        <Topbar />

        

        <main className="flex-1 overflow-y-auto px-8 py-6 space-y-6">

          

          {/* ========== HERO ========== */}

          <div className="bg-gradient-to-br from-[#7C4DFF] via-[#6A3DE8] to-[#5B2DDB] rounded-3xl p-8 text-white relative overflow-hidden">

            <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4" />

            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/4" />

            

            <div className="relative z-10 flex items-center justify-between">

              <div>

                <h1 className="text-3xl font-bold font-display mb-2">¡Bienvenido a Semilla Científica!</h1>

                <p className="text-white/80 text-sm max-w-md">Impulsamos tu pasión por la investigación desde el primer semestre con herramientas inteligentes y comunidad académica.</p>

                <div className="flex gap-3 mt-5">

                  <button  onClick={() => window.location.href = "/cursos"} className="bg-white text-[#7C4DFF] font-semibold px-5 py-2.5 rounded-xl text-sm hover:bg-white/90 transition-all flex items-center gap-2">

                    <Play className="w-4 h-4" /> Comenzar Ahora

                  </button>

                  <button onClick={() => window.location.href = "/cursos"} className="bg-white/15 text-white font-semibold px-5 py-2.5 rounded-xl text-sm hover:bg-white/25 transition-all backdrop-blur-sm">

                    Ver Cursos

                  </button>

                </div>

              </div>

              <div className="w-48 h-48 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/10">
  <svg viewBox="0 0 100 100" className="w-32 h-32">
    <circle cx="50" cy="35" r="15" fill="white" opacity="0.9"/>
    <rect x="35" y="50" width="30" height="35" rx="5" fill="white" opacity="0.9"/>
    <rect x="28" y="45" width="44" height="8" rx="4" fill="#7C4DFF" opacity="0.5"/>
    <rect x="60" y="55" width="20" height="14" rx="3" fill="#4D9FFF" opacity="0.7"/>
    <circle cx="42" cy="32" r="2" fill="#1a0533"/>
    <circle cx="52" cy="32" r="2" fill="#1a0533"/>
    <path d="M44 38 Q47 42 50 38" stroke="#1a0533" strokeWidth="1.5" fill="none"/>
  </svg>
</div>
            </div>

            {/* Stats Cards */}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 relative z-10">

              {stats.map((stat) => (

                <div key={stat.label} className="bg-white/15 backdrop-blur-sm rounded-2xl p-4 border border-white/10 hover:bg-white/20 transition-all cursor-pointer">

                  <div className="flex items-center gap-3">

                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">

                      <stat.icon className="w-5 h-5 text-white" />

                    </div>

                    <div>

                      <p className="text-xl font-bold text-white">{stat.value}</p>

                      <p className="text-xs text-white/70">{stat.label}</p>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          </div>



          {/* ========== ACCIONES RÁPIDAS ========== */}

          <section>

            <div className="flex items-center justify-between mb-3">

              <h2 className="text-base font-bold text-slate-800">⚡ Acciones Rápidas</h2>

            </div>

            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">

              {quickActions.map((item) => (
  <button 
    key={item.label} 
    onClick={() => {
      if (item.label === "Nueva Idea") window.location.href = "/laboratorio"
      else if (item.label === "Crear Protocolo") window.location.href = "/protocolos"
      else if (item.label === "Buscar Mentor") window.location.href = "/mentorias"
      else if (item.label === "Eventos") window.location.href = "/eventos"
      else if (item.label === "Mis Logros") window.location.href = "/logros"
      else if (item.label === "Continuar Curso") window.location.href = "/cursos"
    }}
    className="bg-white rounded-2xl p-4 border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 text-center shadow-sm group cursor-pointer"
  >
    <div className={`w-11 h-11 ${item.bg} rounded-xl flex items-center justify-center mx-auto mb-2.5 group-hover:scale-110 transition-transform`}>
      <item.icon className={`w-5 h-5 ${item.col}`} />
    </div>
    <span className="text-xs font-semibold text-slate-600">{item.label}</span>
  </button>
))}

            </div>

          </section>



          {/* ========== CURSOS DESTACADOS ========== */}

          <section>

            <div className="flex items-center justify-between mb-3">

              <h2 className="text-base font-bold text-slate-800">📚 Cursos Destacados</h2>

              <button onClick={() => window.location.href = "/cursos"} className="text-sm font-semibold text-[#7C4DFF] hover:text-[#6A3DE8] transition-colors flex items-center gap-1">

                Ver todos <ArrowRight className="w-4 h-4" />

              </button>

            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              {courses.map((course) => (

                <div onClick={() => window.location.href = "/cursos"} key={course.title} className="bg-white rounded-2xl p-5 border border-slate-100 hover:shadow-lg transition-all duration-200 cursor-pointer shadow-sm group">

                  <div className="flex gap-3 mb-4">

                    <div className={`w-11 h-11 ${course.bg} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>

                      <course.icon className={`w-5 h-5 ${course.col}`} />

                    </div>

                    <div className="flex-1 min-w-0">

                      <h3 className="font-semibold text-sm text-slate-800 leading-tight mb-1">{course.title}</h3>

                      <div className="flex items-center gap-3">

                        <span className="text-xs text-slate-400 bg-slate-50 px-2 py-0.5 rounded-full font-medium">{course.level}</span>

                        <span className="text-xs text-amber-500 flex items-center gap-1">

                          <Star className="w-3 h-3 fill-amber-400" /> {course.rating}

                        </span>

                      </div>

                    </div>

                  </div>

                  

                  {/* Progress */}

                  <div className="mb-3">

                    <div className="flex justify-between text-xs text-slate-500 mb-1.5">

                      <span>Progreso</span>

                      <span className="font-semibold">{course.pct}%</span>

                    </div>

                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">

                      <div className="h-full bg-gradient-to-r from-[#7C4DFF] to-[#4D9FFF] rounded-full transition-all duration-700" style={{width: `${course.pct}%`}} />

                    </div>

                  </div>



                  <div className="flex items-center justify-between">

                    <span className="text-xs text-slate-400">{course.students} estudiantes</span>

                    <span className="text-xs font-bold bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-full">GRATIS</span>

                  </div>

                </div>

              ))}

            </div>

          </section>



          {/* ========== RECURSOS ========== */}

          <section>

            <h2 className="text-base font-bold text-slate-800 mb-3">📂 Recursos</h2>

            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">

              {recursos.map((r) => (

                <div onClick={() => window.location.href = "/recursos"} key={r.label} className="bg-white border border-slate-100 rounded-xl p-3 text-center hover:border-[#7C4DFF]/30 hover:bg-violet-50/30 hover:shadow-md transition-all cursor-pointer group">

                  <span className="text-xl group-hover:scale-110 transition-transform inline-block">{r.icon}</span>

                  <p className="text-xs font-medium text-slate-600 mt-1.5">{r.label}</p>

                </div>

              ))}

            </div>

          </section>



          <div className="h-6" />

        </main>

      </div>



      <SidebarRight />

    </div>

  )

}