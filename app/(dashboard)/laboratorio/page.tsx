"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Lightbulb, Target, FileText, BookOpen, Search, CheckCircle, ArrowRight, ArrowLeft, Sparkles, FlaskConical } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { saveAs } from "file-saver"
import { Document, Packer, Paragraph, HeadingLevel, AlignmentType } from "docx"

const etapas = [
  { id: 1, nombre: "Idea", icon: Lightbulb, desc: "Define tu idea de investigación" },
  { id: 2, nombre: "Tema", icon: Target, desc: "Delimita el tema" },
  { id: 3, nombre: "Problema", icon: Search, desc: "Formula el problema" },
  { id: 4, nombre: "Pregunta", icon: FileText, desc: "Pregunta de investigación" },
  { id: 5, nombre: "Objetivos", icon: Target, desc: "Define objetivos" },
  { id: 6, nombre: "Hipótesis", icon: Lightbulb, desc: "Formula hipótesis" },
  { id: 7, nombre: "Variables", icon: BookOpen, desc: "Identifica variables" },
  { id: 8, nombre: "Marco Teórico", icon: BookOpen, desc: "Antecedentes" },
  { id: 9, nombre: "Metodología", icon: FlaskConical, desc: "Diseño del estudio" },
  { id: 10, nombre: "Protocolo Final", icon: CheckCircle, desc: "Documento completo" },
]

export default function LaboratorioPage() {
  const [etapaActual, setEtapaActual] = useState(1)
  const [idea, setIdea] = useState("")
  const [tema, setTema] = useState("")
  const [problema, setProblema] = useState("")
  const [pregunta, setPregunta] = useState("")
  const [objetivos, setObjetivos] = useState("")
  const [hipotesis, setHipotesis] = useState("")
  const [variables, setVariables] = useState("")
  const [marcoTeorico, setMarcoTeorico] = useState("")
  const [metodologia, setMetodologia] = useState("")
  const [showTip, setShowTip] = useState(false)
  const exportarWord = async () => {
  const doc = new Document({
    sections: [{
      properties: {},
      children: [
        new Paragraph({
          text: "PROTOCOLO DE INVESTIGACIÓN",
          heading: HeadingLevel.TITLE,
          alignment: AlignmentType.CENTER,
          spacing: { after: 400 },
        }),
        new Paragraph({
          text: "Generado por Semilla Científica",
          alignment: AlignmentType.CENTER,
          spacing: { after: 600 },
        }),
        ...(tema ? [
          new Paragraph({ text: "TEMA", heading: HeadingLevel.HEADING_1, spacing: { before: 400, after: 200 } }),
          new Paragraph({ text: tema, spacing: { after: 300 } }),
        ] : []),
        ...(problema ? [
          new Paragraph({ text: "PROBLEMA DE INVESTIGACIÓN", heading: HeadingLevel.HEADING_1, spacing: { before: 400, after: 200 } }),
          new Paragraph({ text: problema, spacing: { after: 300 } }),
        ] : []),
        ...(pregunta ? [
          new Paragraph({ text: "PREGUNTA DE INVESTIGACIÓN", heading: HeadingLevel.HEADING_1, spacing: { before: 400, after: 200 } }),
          new Paragraph({ text: pregunta, spacing: { after: 300 } }),
        ] : []),
        ...(objetivos ? [
          new Paragraph({ text: "OBJETIVOS", heading: HeadingLevel.HEADING_1, spacing: { before: 400, after: 200 } }),
          ...objetivos.split("\n").map(o => new Paragraph({ text: o, spacing: { after: 100 } })),
          new Paragraph({ text: "", spacing: { after: 300 } }),
        ] : []),
        ...(hipotesis ? [
          new Paragraph({ text: "HIPÓTESIS", heading: HeadingLevel.HEADING_1, spacing: { before: 400, after: 200 } }),
          ...hipotesis.split("\n").map(h => new Paragraph({ text: h, spacing: { after: 100 } })),
          new Paragraph({ text: "", spacing: { after: 300 } }),
        ] : []),
        ...(variables ? [
          new Paragraph({ text: "VARIABLES", heading: HeadingLevel.HEADING_1, spacing: { before: 400, after: 200 } }),
          ...variables.split("\n").map(v => new Paragraph({ text: v, spacing: { after: 100 } })),
          new Paragraph({ text: "", spacing: { after: 300 } }),
        ] : []),
        ...(marcoTeorico ? [
          new Paragraph({ text: "MARCO TEÓRICO", heading: HeadingLevel.HEADING_1, spacing: { before: 400, after: 200 } }),
          new Paragraph({ text: marcoTeorico, spacing: { after: 300 } }),
        ] : []),
        ...(metodologia ? [
          new Paragraph({ text: "METODOLOGÍA", heading: HeadingLevel.HEADING_1, spacing: { before: 400, after: 200 } }),
          new Paragraph({ text: metodologia, spacing: { after: 300 } }),
        ] : []),
        new Paragraph({
          text: "Documento generado por Semilla Científica - Inspira. Investiga. Impacta.",
          alignment: AlignmentType.CENTER,
          spacing: { before: 800 },
          style: "Footer",
        }),
      ],
    }],
  })

  const blob = await Packer.toBlob(doc)
  saveAs(blob, `Protocolo_${tema || "investigacion"}.docx`)
}
const exportarPDF = () => {
  const contenido = `
PROTOCOLO DE INVESTIGACIÓN
Generado por Semilla Científica

${tema ? `TEMA\n${tema}\n` : ""}
${problema ? `PROBLEMA DE INVESTIGACIÓN\n${problema}\n` : ""}
${pregunta ? `PREGUNTA DE INVESTIGACIÓN\n${pregunta}\n` : ""}
${objetivos ? `OBJETIVOS\n${objetivos}\n` : ""}
${hipotesis ? `HIPÓTESIS\n${hipotesis}\n` : ""}
${variables ? `VARIABLES\n${variables}\n` : ""}
${marcoTeorico ? `MARCO TEÓRICO\n${marcoTeorico}\n` : ""}
${metodologia ? `METODOLOGÍA\n${metodologia}\n` : ""}

Documento generado por Semilla Científica - Inspira. Investiga. Impacta.
  `

  const blob = new Blob([contenido], { type: "application/pdf" })
  saveAs(blob, `Protocolo_${tema || "investigacion"}.pdf`)
}

  const avanzar = async () => {
    if (etapaActual < 10) {
      await supabase.from("protocols").upsert({
        user_id: "test-user",
        idea, tema, problema, pregunta, objetivos, hipotesis, variables, marco_teorico: marcoTeorico, metodologia,
        etapa: etapaActual + 1,
        updated_at: new Date()
      }, { onConflict: 'user_id' })
      setEtapaActual(etapaActual + 1)
      setShowTip(false)
    }
  }

  const retroceder = () => {
    if (etapaActual > 1) {
      setEtapaActual(etapaActual - 1)
      setShowTip(false)
    }
  }

  const getPlaceholder = () => {
    switch (etapaActual) {
      case 1: return "Ej: Diabetes tipo 2, telemedicina, salud mental..."
      case 2: return "Ej: Prevalencia de diabetes tipo 2 en adultos mayores"
      case 3: return "Ej: En mi comunidad hay muchos adultos mayores con diabetes y poca información sobre su control"
      case 4: return "Ej: ¿Cuál es la prevalencia de diabetes tipo 2 en adultos mayores de 60 años en Lima, 2024?"
      case 5: return "General: Determinar la prevalencia de diabetes tipo 2...\nEspecífico 1: Identificar factores de riesgo...\nEspecífico 2: Evaluar el control glucémico..."
      case 6: return "Hi: La prevalencia de diabetes es mayor al 20%...\nH0: La prevalencia de diabetes no supera el 20%..."
      case 7: return "Independiente: Edad, sexo, hábitos...\nDependiente: Diabetes tipo 2 (Sí/No)\nIntervinientes: Acceso a salud..."
      case 8: return "Según la OMS (2023), la diabetes afecta a...\nEstudios previos en Latinoamérica muestran..."
      case 9: return "Tipo: Estudio descriptivo transversal\nPoblación: Adultos >60 años\nMuestra: 384 personas\nInstrumento: Cuestionario validado..."
      case 10: return "¡Felicitaciones! Has completado tu protocolo. Revisa el resumen final."
      default: return ""
    }
  }

  const getValue = () => {
    switch (etapaActual) {
      case 1: return idea
      case 2: return tema
      case 3: return problema
      case 4: return pregunta
      case 5: return objetivos
      case 6: return hipotesis
      case 7: return variables
      case 8: return marcoTeorico
      case 9: return metodologia
      default: return ""
    }
  }

  const setValue = (val: string) => {
    switch (etapaActual) {
      case 1: setIdea(val); break
      case 2: setTema(val); break
      case 3: setProblema(val); break
      case 4: setPregunta(val); break
      case 5: setObjetivos(val); break
      case 6: setHipotesis(val); break
      case 7: setVariables(val); break
      case 8: setMarcoTeorico(val); break
      case 9: setMetodologia(val); break
    }
  }

  const tips: Record<number, string> = {
    1: "💡 Una buena idea surge de observar problemas en tu entorno. Piensa en enfermedades frecuentes, necesidades de tu comunidad o temas que te apasionen.",
    2: "🎯 Delimitar el tema significa especificar: qué, quiénes, dónde y cuándo. Entre más específico, más fácil será investigarlo.",
    3: "📋 El problema describe la situación actual y por qué es importante investigarla. Usa datos, estadísticas o tu observación.",
    4: "❓ La pregunta debe ser clara, específica y respondible. Usa el formato PICO: Población, Intervención, Comparación, Outcome.",
    5: "🎯 Objetivo general: qué quieres lograr. Objetivos específicos: pasos para lograrlo. Usa verbos en infinitivo: determinar, identificar, evaluar.",
    6: "🔮 La hipótesis es una predicción educada. Debe ser comprobable. No todos los estudios necesitan hipótesis (descriptivos no).",
    7: "📊 Variables: Independiente (causa), Dependiente (efecto), Intervinientes (pueden afectar). Define cómo medirás cada una.",
    8: "📚 El marco teórico sustenta tu estudio con investigaciones previas. Cita artículos recientes (últimos 5 años) y de fuentes confiables.",
    9: "🔬 Metodología: Tipo de estudio, población, muestra, criterios de inclusión/exclusión, instrumentos, procedimiento, análisis estadístico, aspectos éticos.",
    10: "🎉 ¡Tu protocolo está completo! Ahora puedes exportarlo, compartirlo con tu asesor o continuar con la ejecución de tu investigación."
  }

  const etapa = etapas[etapaActual - 1]

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 font-display">🧪 Laboratorio de Investigación</h1>
        <p className="text-sm text-slate-500 mt-1">Construye tu protocolo de investigación paso a paso con ayuda de IA</p>
      </div>

      {/* Stepper */}
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm overflow-x-auto">
        <div className="flex items-center gap-2 min-w-max">
          {etapas.map((et, i) => (
            <div key={et.id} className="flex items-center gap-2">
              <div
                onClick={() => setEtapaActual(et.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl cursor-pointer transition-all text-sm ${
                  etapaActual === et.id
                    ? "bg-[#7C4DFF] text-white shadow-lg shadow-[#7C4DFF]/20"
                    : etapaActual > et.id
                    ? "bg-emerald-50 text-emerald-600"
                    : "bg-slate-50 text-slate-400"
                }`}
              >
                <et.icon className="w-4 h-4" />
                <span className="hidden md:inline font-medium">{et.nombre}</span>
              </div>
              {i < etapas.length - 1 && (
                <div className={`w-6 h-0.5 ${etapaActual > et.id ? "bg-emerald-300" : "bg-slate-200"}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Contenido de la etapa */}
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={etapaActual}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-[#7C4DFF]/10 rounded-xl flex items-center justify-center">
                  <etapa.icon className="w-6 h-6 text-[#7C4DFF]" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-800">Etapa {etapa.id}: {etapa.nombre}</h2>
                  <p className="text-sm text-slate-500">{etapa.desc}</p>
                </div>
              </div>

              {etapaActual < 10 ? (
                <textarea
                  value={getValue()}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder={getPlaceholder()}
                  rows={6}
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#7C4DFF]/40 focus:ring-2 focus:ring-[#7C4DFF]/10 transition-all resize-none"
                />
              ) : (
                <div className="bg-emerald-50 rounded-xl p-6 text-center">
                  <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-3" />
                  <h3 className="text-xl font-bold text-emerald-700 mb-2">¡Protocolo Completo!</h3>
                  <p className="text-emerald-600 mb-4">Has construido tu protocolo de investigación paso a paso</p>
                  
                  <div className="grid grid-cols-2 gap-3 text-left">
                    {[
                      { label: "Tema", value: tema },
                      { label: "Problema", value: problema },
                      { label: "Pregunta", value: pregunta },
                      { label: "Objetivos", value: objetivos },
                      { label: "Hipótesis", value: hipotesis },
                      { label: "Variables", value: variables },
                      { label: "Marco Teórico", value: marcoTeorico },
                      { label: "Metodología", value: metodologia },
                    ].filter(item => item.value).map(item => (
                      <div key={item.label} className="bg-white rounded-lg p-3 border border-emerald-100">
                        <p className="text-xs font-semibold text-emerald-600 mb-1">{item.label}</p>
                        <p className="text-xs text-slate-600 line-clamp-2">{item.value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-3 justify-center mt-4">
                   <button onClick={exportarWord} className="bg-emerald-500 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-emerald-600 transition-colors">
  📄 Exportar a Word
</button>
                    <button onClick={exportarPDF} className="bg-slate-500 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-slate-600 transition-colors">
                      📥 Exportar a PDF
                    </button>
                  </div>
                </div>
              )}

              {/* Navegación */}
              {etapaActual < 10 && (
                <div className="flex justify-between mt-4">
                  <button
                    onClick={retroceder}
                    disabled={etapaActual === 1}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors disabled:opacity-30"
                  >
                    <ArrowLeft className="w-4 h-4" /> Anterior
                  </button>
                  <button
                    onClick={() => setShowTip(!showTip)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium text-[#7C4DFF] hover:bg-violet-50 transition-colors"
                  >
                    <Sparkles className="w-4 h-4" /> {showTip ? "Ocultar tip" : "Ver tip"}
                  </button>
                  <button
                    onClick={avanzar}
                    className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-sm font-semibold bg-[#7C4DFF] text-white hover:bg-[#6A3DE8] transition-colors shadow-lg shadow-[#7C4DFF]/20"
                  >
                    Siguiente <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Tip */}
          <AnimatePresence>
            {showTip && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-violet-50 rounded-2xl p-5 border border-violet-100"
              >
                <p className="text-sm text-violet-800 leading-relaxed">{tips[etapaActual]}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Panel derecho - Resumen */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#7C4DFF]" /> Tu Progreso
            </h3>
            <div className="space-y-2">
              {etapas.map(et => (
                <div key={et.id} className="flex items-center gap-2 text-xs">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] ${
                    etapaActual > et.id ? "bg-emerald-500" : etapaActual === et.id ? "bg-[#7C4DFF]" : "bg-slate-200"
                  }`}>
                    {etapaActual > et.id ? "✓" : et.id}
                  </div>
                  <span className={etapaActual >= et.id ? "text-slate-700 font-medium" : "text-slate-400"}>
                    {et.nombre}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#7C4DFF] to-[#6A3DE8] rounded-2xl p-5 text-white">
            <FlaskConical className="w-8 h-8 text-white/70 mb-2" />
            <p className="font-bold">Semillita IA</p>
            <p className="text-xs text-white/70 mt-1">Activa los tips en cada etapa para recibir orientación personalizada.</p>
          </div>
        </div>
      </div>
    </div>
  )
}