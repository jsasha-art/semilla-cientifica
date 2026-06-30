"use client"

import { useState, useEffect } from "react"
import { FileText, Plus, Clock, CheckCircle, AlertCircle, Download, Eye, ArrowLeft, Trash2, Edit3, Search, Filter, Upload, BookOpen, Stethoscope, Heart, Brain, Microscope } from "lucide-react"
import { supabase } from "@/lib/supabase"

const ejemplosPorCarrera = [
  {
    carrera: "Medicina",
    icon: Stethoscope,
    protocolos: [
      { titulo: "Prevalencia de Diabetes Tipo 2 en Adultos Mayores", problema: "La diabetes afecta al 25% de adultos mayores...", objetivos: "Determinar la prevalencia de DM2 en >60 años.", metodologia: "Estudio descriptivo transversal. n=500. Muestreo aleatorio.", hipotesis: "La prevalencia supera el 20%." },
      { titulo: "Factores de Riesgo Cardiovascular en Jóvenes", problema: "Enfermedades CV principal causa de muerte...", objetivos: "Identificar factores de riesgo CV en universitarios.", metodologia: "Analítico transversal. n=300. Perfil lipídico.", hipotesis: "Sedentarismo y dieta son factores principales." },
      { titulo: "Efectividad de Telemedicina en Zonas Rurales", problema: "Acceso limitado a salud en zonas rurales...", objetivos: "Evaluar efectividad de telemedicina.", metodologia: "Cuasi-experimental. GC: 200, GE: 200.", hipotesis: "Telemedicina mejora acceso y satisfacción." },
    ]
  },
  {
    carrera: "Enfermería",
    icon: Heart,
    protocolos: [
      { titulo: "Cuidado de Heridas Postquirúrgicas", problema: "Infecciones nosocomiales afectan al 15%...", objetivos: "Evaluar técnica de curación vs tradicional.", metodologia: "Ensayo clínico. n=120. Seguimiento 30 días.", hipotesis: "Técnica avanzada reduce infecciones." },
      { titulo: "Adherencia al Tratamiento en Pacientes Crónicos", problema: "50% de pacientes no sigue indicaciones...", objetivos: "Identificar factores de no adherencia.", metodologia: "Estudio cualitativo. Entrevistas semiestructuradas.", hipotesis: "Falta de educación es factor principal." },
    ]
  },
  {
    carrera: "Psicología",
    icon: Brain,
    protocolos: [
      { titulo: "Impacto del Ejercicio en Salud Mental", problema: "Ansiedad y depresión aumentaron post-pandemia...", objetivos: "Determinar efecto del ejercicio en ansiedad.", metodologia: "ECA. GE: programa ejercicio. GC: sin intervención.", hipotesis: "Ejercicio reduce ansiedad significativamente." },
      { titulo: "Estrés Académico y Rendimiento Universitario", problema: "70% de estudiantes reporta estrés...", objetivos: "Correlacionar estrés con rendimiento.", metodologia: "Correlacional. n=400. Escala DASS-21.", hipotesis: "A mayor estrés, menor rendimiento." },
    ]
  },
  {
    carrera: "Ciencias Biomédicas",
    icon: Microscope,
    protocolos: [
      { titulo: "Biomarcadores en Cáncer de Mama", problema: "Detección tardía reduce supervivencia...", objetivos: "Identificar biomarcadores tempranos.", metodologia: "Casos y controles. 100 casos, 100 controles.", hipotesis: "CA15-3 y CEA elevados en etapas tempranas." },
      { titulo: "Resistencia Bacteriana en UCI", problema: "Aumento de resistencia antibiótica...", objetivos: "Caracterizar bacterias resistentes.", metodologia: "Descriptivo microbiológico. 200 muestras.", hipotesis: "Gram negativas son más resistentes." },
    ]
  },
]

export default function ProtocolosPage() {
  const [protocols, setProtocols] = useState<any[]>([])
  const [selected, setSelected] = useState<any>(null)
  const [showCreate, setShowCreate] = useState(false)
  const [showEjemplos, setShowEjemplos] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [carreraFiltro, setCarreraFiltro] = useState("Todas")

  // Form para crear/editar
  const [form, setForm] = useState({ titulo: "", problema: "", objetivos: "", metodologia: "", hipotesis: "", variables: "", marcoTeorico: "" })

  useEffect(() => { cargarProtocolos() }, [])

  const cargarProtocolos = async () => {
    const { data } = await supabase.from("protocols").select("*").order("created_at", { ascending: false })
    if (data) setProtocols(data)
  }

  const crearProtocolo = async () => {
  if (!form.titulo.trim()) {
    alert("Por favor ingresa un título")
    return
  }

  const { data, error } = await supabase.from("protocols").insert({
    user_id: "test-user",
    idea: form.titulo,
    tema: form.titulo,
    problema: form.problema,
    objetivos: form.objetivos,
    metodologia: form.metodologia,
    hipotesis: form.hipotesis,
    variables: form.variables,
    marco_teorico: form.marcoTeorico,
    etapa: 5,
  }).select()

  if (error) {
    console.error("Error al guardar:", error)
    alert("Error: " + error.message)
  } else {
    setShowCreate(false)
    setForm({ titulo: "", problema: "", objetivos: "", metodologia: "", hipotesis: "", variables: "", marcoTeorico: "" })
    cargarProtocolos()
  }
}

  const eliminarProtocolo = async (id: string) => {
    await supabase.from("protocols").delete().eq("id", id)
    cargarProtocolos()
    setSelected(null)
  }

  const usarEjemplo = (ej: any) => {
    setForm({ titulo: ej.titulo, problema: ej.problema, objetivos: ej.objetivos, metodologia: ej.metodologia, hipotesis: ej.hipotesis, variables: "", marcoTeorico: "" })
    setShowEjemplos(false)
    setShowCreate(true)
  }

  const descargarPDF = (protocol: any) => {
    const contenido = `PROTOCOLO DE INVESTIGACIÓN\n\nTÍTULO: ${protocol.tema || protocol.titulo || ""}\n\nPROBLEMA: ${protocol.problema || ""}\n\nOBJETIVOS: ${protocol.objetivos || ""}\n\nHIPÓTESIS: ${protocol.hipotesis || ""}\n\nVARIABLES: ${protocol.variables || ""}\n\nMARCO TEÓRICO: ${protocol.marco_teorico || ""}\n\nMETODOLOGÍA: ${protocol.metodologia || ""}\n\nGenerado por Semilla Científica`
    const blob = new Blob([contenido], { type: "application/pdf" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url; a.download = `Protocolo_${protocol.tema || "investigacion"}.pdf`; a.click()
  }

  const filtered = protocols.filter(p => (p.tema || p.idea || "").toLowerCase().includes(searchTerm.toLowerCase()))

  if (selected) {
    return (
      <div className="p-8 space-y-6">
        <button onClick={() => setSelected(null)} className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800"><ArrowLeft className="w-4 h-4" /> Volver</button>
        <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm space-y-4">
          <div className="flex justify-between items-start">
            <h1 className="text-2xl font-bold text-slate-800">{selected.tema || selected.idea || "Protocolo"}</h1>
            <div className="flex gap-2">
              <button onClick={() => descargarPDF(selected)} className="flex items-center gap-2 bg-[#7C4DFF] text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-[#6A3DE8]"><Download className="w-4 h-4" /> Descargar PDF</button>
              <button onClick={() => eliminarProtocolo(selected.id)} className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-red-100"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {selected.problema && <InfoBox title="📋 Problema" text={selected.problema} />}
            {selected.objetivos && <InfoBox title="🎯 Objetivos" text={selected.objetivos} />}
            {selected.hipotesis && <InfoBox title="🔮 Hipótesis" text={selected.hipotesis} />}
            {selected.variables && <InfoBox title="📊 Variables" text={selected.variables} />}
            {selected.marco_teorico && <InfoBox title="📚 Marco Teórico" text={selected.marco_teorico} />}
            {selected.metodologia && <InfoBox title="🔬 Metodología" text={selected.metodologia} />}
          </div>
          <div className="mt-4">
            <p className="text-sm font-medium text-slate-500">Progreso</p>
            <div className="h-3 bg-slate-100 rounded-full mt-1 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#7C4DFF] to-[#4D9FFF] rounded-full" style={{width: `${(selected.etapa || 5) * 10}%`}} />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">📝 Protocolos</h1>
          <p className="text-sm text-slate-500">Crea, explora y descarga protocolos de investigación</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setShowEjemplos(!showEjemplos)} className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 font-semibold px-4 py-2.5 rounded-xl hover:bg-slate-50 transition-colors">
            <BookOpen className="w-4 h-4" /> Ejemplos
          </button>
          <button onClick={() => { setForm({ titulo: "", problema: "", objetivos: "", metodologia: "", hipotesis: "", variables: "", marcoTeorico: "" }); setShowCreate(true) }} 
            className="flex items-center gap-2 bg-[#7C4DFF] text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-[#6A3DE8] transition-colors shadow-lg shadow-[#7C4DFF]/20">
            <Plus className="w-4 h-4" /> Nuevo Protocolo
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <StatBox value={protocols.length} label="Protocolos" icon={FileText} />
        <StatBox value={protocols.filter(p => p.etapa >= 10).length} label="Completados" icon={CheckCircle} color="emerald" />
        <StatBox value={protocols.filter(p => p.etapa > 1 && p.etapa < 10).length} label="En progreso" icon={Clock} color="amber" />
        <StatBox value={protocols.filter(p => !p.etapa || p.etapa <= 1).length} label="Borradores" icon={Edit3} color="slate" />
      </div>

      {/* Ejemplos por carrera */}
      {showEjemplos && (
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <h2 className="text-lg font-bold text-slate-800 mb-4">📚 Ejemplos por Carrera</h2>
          <div className="flex gap-2 mb-4">
            {["Todas", "Medicina", "Enfermería", "Psicología", "Ciencias Biomédicas"].map(c => (
              <button key={c} onClick={() => setCarreraFiltro(c)} className={`px-4 py-2 rounded-xl text-sm font-medium ${carreraFiltro === c ? "bg-[#7C4DFF] text-white" : "bg-slate-50 text-slate-600 hover:bg-slate-100"}`}>{c}</button>
            ))}
          </div>
          <div className="space-y-3">
            {ejemplosPorCarrera.filter(e => carreraFiltro === "Todas" || e.carrera === carreraFiltro).map(carrera => (
              <div key={carrera.carrera}>
                <h3 className="font-semibold text-slate-700 mb-2 flex items-center gap-2"><carrera.icon className="w-5 h-5 text-[#7C4DFF]" /> {carrera.carrera}</h3>
                <div className="grid grid-cols-2 gap-3">
                  {carrera.protocolos.map((p, i) => (
                    <div key={i} className="bg-slate-50 rounded-xl p-4 border border-slate-100 hover:border-[#7C4DFF]/30 cursor-pointer transition-all" onClick={() => usarEjemplo(p)}>
                      <p className="font-medium text-sm text-slate-800">{p.titulo}</p>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2">{p.problema}</p>
                      <button className="mt-2 text-xs text-[#7C4DFF] font-medium">Usar este ejemplo →</button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Lista de protocolos */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-slate-400">
          <FileText className="w-16 h-16 mx-auto mb-4 opacity-30" />
          <p className="text-lg font-medium">No hay protocolos aún</p>
          <p className="text-sm mt-1">Crea tu primer protocolo o usa un ejemplo</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((p) => (
            <div key={p.id} onClick={() => setSelected(p)} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-all cursor-pointer group">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <FileText className="w-8 h-8 text-violet-400 group-hover:text-violet-500 transition-colors" />
                  <div>
                    <h3 className="font-semibold text-slate-800">{p.tema || p.idea || "Sin título"}</h3>
                    <p className="text-xs text-slate-400">Etapa {p.etapa || 1}/10 • {p.created_at ? new Date(p.created_at).toLocaleDateString() : "Hoy"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-28">
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-[#7C4DFF] to-[#4D9FFF] rounded-full transition-all" style={{width: `${(p.etapa || 1) * 10}%`}} />
                    </div>
                  </div>
                  <Eye className="w-5 h-5 text-slate-300 group-hover:text-slate-500 transition-colors" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal crear protocolo */}
      {showCreate && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-slate-800">Crear Protocolo</h2>
              <button onClick={() => setShowCreate(false)} className="p-2 hover:bg-slate-50 rounded-lg">✕</button>
            </div>
            <input placeholder="Título del protocolo" value={form.titulo} onChange={e => setForm({...form, titulo: e.target.value})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm" />
            <textarea placeholder="Problema de investigación" value={form.problema} onChange={e => setForm({...form, problema: e.target.value})} rows={3} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm" />
            <textarea placeholder="Objetivos" value={form.objetivos} onChange={e => setForm({...form, objetivos: e.target.value})} rows={3} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm" />
            <textarea placeholder="Hipótesis" value={form.hipotesis} onChange={e => setForm({...form, hipotesis: e.target.value})} rows={2} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm" />
            <textarea placeholder="Variables" value={form.variables} onChange={e => setForm({...form, variables: e.target.value})} rows={2} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm" />
            <textarea placeholder="Marco Teórico" value={form.marcoTeorico} onChange={e => setForm({...form, marcoTeorico: e.target.value})} rows={3} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm" />
            <textarea placeholder="Metodología" value={form.metodologia} onChange={e => setForm({...form, metodologia: e.target.value})} rows={3} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm" />
            <button onClick={crearProtocolo} className="w-full bg-[#7C4DFF] text-white font-semibold py-3 rounded-xl hover:bg-[#6A3DE8] transition-colors">Guardar Protocolo</button>
          </div>
        </div>
      )}
    </div>
  )
}

function StatBox({ value, label, icon: Icon, color = "violet" }: any) {
  const colors: Record<string, string> = { violet: "text-violet-600 bg-violet-50", emerald: "text-emerald-600 bg-emerald-50", amber: "text-amber-600 bg-amber-50", slate: "text-slate-600 bg-slate-50" }
  return (
    <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm flex items-center gap-3">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colors[color]}`}><Icon className="w-5 h-5" /></div>
      <div><p className="text-xl font-bold text-slate-800">{value}</p><p className="text-xs text-slate-500">{label}</p></div>
    </div>
  )
}

function InfoBox({ title, text }: { title: string; text: string }) {
  return <div className="bg-slate-50 rounded-xl p-4"><p className="font-bold text-slate-700 text-sm mb-1">{title}</p><p className="text-slate-600 text-sm">{text}</p></div>
}