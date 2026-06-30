"use client"

import { useState } from "react"
import { BookOpen, BarChart3, FileText, Search, Star, Clock, Users, Filter, CheckCircle, ChevronRight, ArrowLeft, Award, HelpCircle } from "lucide-react"

const cursosData = [
  {
    id: 1, icon: BookOpen, title: "Introducción a la Investigación Científica",
    desc: "Aprende los fundamentos de la investigación científica.", level: "Principiante", duration: "8 semanas", students: 1248, rating: 4.8, modules: 6, free: true, color: "violet",
    modulosList: [
      { titulo: "¿Qué es la investigación científica?", video: "https://www.youtube.com/embed/22LSizFOmyg", duracion: "8 min",
        quiz: [
          { pregunta: "¿Cuál es el objetivo principal de la investigación científica?", opciones: ["Generar conocimiento nuevo", "Ganar dinero", "Viajar", "Copiar datos"], correcta: 0 },
          { pregunta: "La investigación científica se caracteriza por ser:", opciones: ["Sistemática", "Improvisada", "Aleatoria", "Sin método"], correcta: 0 },
          { pregunta: "¿Quién puede hacer investigación científica?", opciones: ["Cualquier persona con método", "Solo doctores", "Solo científicos", "Solo profesores"], correcta: 0 },
        ]
      },
      { titulo: "El método científico paso a paso", video: "https://www.youtube.com/embed/MN10KQyvUz0", duracion: "10 min",
        quiz: [
          { pregunta: "¿Cuál es el primer paso del método científico?", opciones: ["Observación", "Conclusión", "Publicación", "Análisis"], correcta: 0 },
          { pregunta: "Después de la hipótesis viene:", opciones: ["Experimentación", "Observación", "Pregunta", "Ninguna"], correcta: 0 },
          { pregunta: "El último paso del método científico es:", opciones: ["Conclusión", "Observación", "Hipótesis", "Experimento"], correcta: 0 },
        ]
      },
      { titulo: "Tipos de investigación científica", video: "https://www.youtube.com/embed/iMMKO2WHJoI", duracion: "12 min",
        quiz: [
          { pregunta: "¿Qué tipo mide relaciones entre variables?", opciones: ["Correlacional", "Descriptiva", "Exploratoria", "Experimental"], correcta: 0 },
          { pregunta: "La investigación que manipula variables es:", opciones: ["Experimental", "Descriptiva", "Correlacional", "Observacional"], correcta: 0 },
          { pregunta: "La investigación que solo describe fenómenos es:", opciones: ["Descriptiva", "Experimental", "Correlacional", "Analítica"], correcta: 0 },
        ]
      },
      { titulo: "Cómo formular preguntas de investigación", video: "https://www.youtube.com/embed/iTGGl8KAoLU", duracion: "15 min",
        quiz: [
          { pregunta: "Una buena pregunta debe ser:", opciones: ["Clara y específica", "Ambigua", "Imposible", "Muy larga"], correcta: 0 },
          { pregunta: "El formato PICO se usa para:", opciones: ["Formular preguntas clínicas", "Cocinar", "Dibujar", "Bailar"], correcta: 0 },
          { pregunta: "PICO significa:", opciones: ["Paciente, Intervención, Comparación, Outcome", "Persona, Idea, Casa, Objeto", "Ninguna"], correcta: 0 },
        ]
      },
      { titulo: "Revisión bibliográfica efectiva", video: "https://www.youtube.com/embed/1M5Y1p36b70", duracion: "18 min",
        quiz: [
          { pregunta: "¿Qué base de datos es clave en salud?", opciones: ["PubMed", "Google", "Facebook", "Twitter"], correcta: 0 },
          { pregunta: "Una revisión sistemática:", opciones: ["Sigue un protocolo", "Es aleatoria", "No tiene método", "Es improvisada"], correcta: 0 },
          { pregunta: "¿Qué gestor bibliográfico es gratuito?", opciones: ["Zotero", "EndNote pago", "Word", "Excel"], correcta: 0 },
        ]
      },
      { titulo: "Ética en la investigación científica", video: "https://www.youtube.com/embed/6lFaQHpzPJQ", duracion: "14 min",
        quiz: [
          { pregunta: "¿Qué documento protege a los participantes?", opciones: ["Consentimiento informado", "Receta", "Factura", "Contrato"], correcta: 0 },
          { pregunta: "El comité de ética revisa:", opciones: ["Protocolos de investigación", "Recetas", "Facturas", "Contratos"], correcta: 0 },
          { pregunta: "El principio de beneficencia significa:", opciones: ["Hacer el bien", "Hacer daño", "Ignorar", "Ocultar"], correcta: 0 },
        ]
      },
    ]
  },
  {
    id: 2, icon: BarChart3, title: "Bioestadística para Principiantes",
    desc: "Domina los conceptos estadísticos esenciales.", level: "Principiante", duration: "10 semanas", students: 856, rating: 4.6, modules: 5, free: true, color: "emerald",
    modulosList: [
      { titulo: "Introducción a la bioestadística", video: "https://www.youtube.com/embed/7e_9Ys7Bnu0", duracion: "8 min",
        quiz: [
          { pregunta: "¿Para qué sirve la bioestadística?", opciones: ["Analizar datos de salud", "Cocinar", "Dibujar", "Cantar"], correcta: 0 },
          { pregunta: "La bioestadística es una rama de:", opciones: ["Estadística aplicada", "Medicina", "Derecho", "Arte"], correcta: 0 },
          { pregunta: "Se usa en:", opciones: ["Ensayos clínicos", "Cocina", "Música", "Deporte"], correcta: 0 },
        ]
      },
      { titulo: "Estadística descriptiva", video: "https://www.youtube.com/embed/-0nIPWzEwis", duracion: "12 min",
        quiz: [
          { pregunta: "¿Qué mide la mediana?", opciones: ["El valor central", "El promedio", "La moda", "El máximo"], correcta: 0 },
          { pregunta: "La media es:", opciones: ["El promedio", "El valor central", "El más frecuente", "El mínimo"], correcta: 0 },
          { pregunta: "La moda es:", opciones: ["El valor más frecuente", "El promedio", "La mediana", "El máximo"], correcta: 0 },
        ]
      },
      { titulo: "Probabilidad básica", video: "https://www.youtube.com/embed/JDP3mGgBp68", duracion: "10 min",
        quiz: [
          { pregunta: "La probabilidad se expresa entre:", opciones: ["0 y 1", "1 y 100", "-1 y 1", "0 y 10"], correcta: 0 },
          { pregunta: "Un evento seguro tiene probabilidad:", opciones: ["1", "0", "0.5", "-1"], correcta: 0 },
          { pregunta: "Un evento imposible tiene probabilidad:", opciones: ["0", "1", "0.5", "100"], correcta: 0 },
        ]
      },
      { titulo: "Distribuciones de probabilidad", video: "https://www.youtube.com/embed/Y1LoD0kkG6c", duracion: "15 min",
        quiz: [
          { pregunta: "La distribución normal tiene forma de:", opciones: ["Campana", "Cuadrado", "Triángulo", "Línea"], correcta: 0 },
          { pregunta: "La distribución normal es:", opciones: ["Simétrica", "Asimétrica", "Plana", "Invertida"], correcta: 0 },
          { pregunta: "El 68% de datos está a:", opciones: ["1 desviación estándar", "2 desviaciones", "3 desviaciones", "4 desviaciones"], correcta: 0 },
        ]
      },
      { titulo: "Intervalos de confianza", video: "https://www.youtube.com/embed/dZcVCSch2nA", duracion: "14 min",
        quiz: [
          { pregunta: "IC 95% significa:", opciones: ["95% de confianza en contener el valor real", "95% de error", "95% de datos", "Nada"], correcta: 0 },
          { pregunta: "Un IC más amplio indica:", opciones: ["Mayor incertidumbre", "Mayor precisión", "Menos error", "Nada"], correcta: 0 },
          { pregunta: "El IC se calcula con:", opciones: ["Media ± margen de error", "Solo la media", "Solo la moda", "Nada"], correcta: 0 },
        ]
      },
    ]
  },
  {
    id: 3, icon: FileText, title: "Cómo elaborar un Protocolo de Investigación",
    desc: "Guía paso a paso para diseñar un protocolo.", level: "Intermedio", duration: "6 semanas", students: 654, rating: 4.9, modules: 5, free: true, color: "sky",
    modulosList: [
      { titulo: "Estructura del protocolo", video: "https://www.youtube.com/embed/JVKNElCK3P8", duracion: "10 min",
        quiz: [
          { pregunta: "¿Qué va primero?", opciones: ["Título", "Resultados", "Discusión", "Anexos"], correcta: 0 },
          { pregunta: "El protocolo es:", opciones: ["Un plan de investigación", "Un resultado", "Un artículo", "Un libro"], correcta: 0 },
          { pregunta: "¿Quién revisa el protocolo?", opciones: ["Comité de ética", "El autor solamente", "Nadie", "El paciente"], correcta: 0 },
        ]
      },
      { titulo: "Planteamiento del problema", video: "https://www.youtube.com/embed/rC9M8aPIW5o", duracion: "12 min",
        quiz: [
          { pregunta: "El problema debe ser:", opciones: ["Relevante y delimitado", "Amplio", "Irrelevante", "Imposible"], correcta: 0 },
          { pregunta: "Se describe con:", opciones: ["Datos y evidencias", "Opiniones", "Creencias", "Mitos"], correcta: 0 },
          { pregunta: "El problema justifica:", opciones: ["La investigación", "El presupuesto", "El título", "Nada"], correcta: 0 },
        ]
      },
      { titulo: "Objetivos", video: "https://www.youtube.com/embed/DQlp0DvPBwU", duracion: "8 min",
        quiz: [
          { pregunta: "Los objetivos específicos derivan del:", opciones: ["Objetivo general", "Título", "Autor", "Presupuesto"], correcta: 0 },
          { pregunta: "Los objetivos usan verbos en:", opciones: ["Infinitivo", "Pasado", "Futuro", "Gerundio"], correcta: 0 },
          { pregunta: "Ejemplo de verbo para objetivo:", opciones: ["Determinar", "Determinó", "Determinará", "Determinando"], correcta: 0 },
        ]
      },
      { titulo: "Formulación de hipótesis", video: "https://www.youtube.com/embed/X8a2uC6t1Oc", duracion: "10 min",
        quiz: [
          { pregunta: "H0 establece que:", opciones: ["No hay diferencia", "Sí hay diferencia", "Es positiva", "Es negativa"], correcta: 0 },
          { pregunta: "Hi es la hipótesis:", opciones: ["De investigación", "Nula", "Alternativa", "Estadística"], correcta: 0 },
          { pregunta: "Las hipótesis deben ser:", opciones: ["Comprobables", "Imposibles", "Ambiguas", "Largas"], correcta: 0 },
        ]
      },
      { titulo: "Metodología", video: "https://www.youtube.com/embed/b3twq8rtcXk", duracion: "15 min",
        quiz: [
          { pregunta: "La muestra es:", opciones: ["Subconjunto de la población", "Toda la población", "El investigador", "El instrumento"], correcta: 0 },
          { pregunta: "Muestreo aleatorio significa:", opciones: ["Al azar", "A conveniencia", "Por cuotas", "Intencional"], correcta: 0 },
          { pregunta: "El instrumento debe ser:", opciones: ["Validado", "Improvisado", "Cualquiera", "No importa"], correcta: 0 },
        ]
      },
    ]
  },
  {
    id: 4, icon: Search, title: "Búsqueda Bibliográfica Efectiva",
    desc: "Aprende a buscar en PubMed, Scopus y WoS.", level: "Principiante", duration: "4 semanas", students: 932, rating: 4.7, modules: 4, free: true, color: "orange",
    modulosList: [
      { titulo: "PubMed", video: "https://www.youtube.com/embed/xPy4tCr4j8Q", duracion: "12 min",
        quiz: [
          { pregunta: "PubMed es de:", opciones: ["Ciencias de la salud", "Ingeniería", "Arte", "Deportes"], correcta: 0 },
          { pregunta: "PubMed es:", opciones: ["Gratuita", "De pago", "Privada", "Secreta"], correcta: 0 },
          { pregunta: "MeSH significa:", opciones: ["Medical Subject Headings", "Meta Search", "Ninguna"], correcta: 0 },
        ]
      },
      { titulo: "Scopus", video: "https://www.youtube.com/embed/CY685luAFmo", duracion: "10 min",
        quiz: [
          { pregunta: "Scopus filtra por:", opciones: ["Año y autor", "Color", "Sabor", "Tamaño"], correcta: 0 },
          { pregunta: "Scopus es de:", opciones: ["Elsevier", "Google", "Microsoft", "Apple"], correcta: 0 },
          { pregunta: "Scopus indexa:", opciones: ["Revistas científicas", "Periódicos", "Blogs", "Redes"], correcta: 0 },
        ]
      },
      { titulo: "Web of Science", video: "https://www.youtube.com/embed/n4F2Vh6YNF8", duracion: "8 min",
        quiz: [
          { pregunta: "WoS indexa:", opciones: ["Revistas de alto impacto", "Cualquier revista", "Blogs", "Redes"], correcta: 0 },
          { pregunta: "WoS es de:", opciones: ["Clarivate", "Google", "Microsoft", "Apple"], correcta: 0 },
          { pregunta: "Factor de impacto mide:", opciones: ["Citas promedio por artículo", "Ventas", "Likes", "Comentarios"], correcta: 0 },
        ]
      },
      { titulo: "Mendeley y Zotero", video: "https://www.youtube.com/embed/xkn9EloEufg", duracion: "15 min",
        quiz: [
          { pregunta: "¿Para qué sirven?", opciones: ["Gestionar referencias", "Editar videos", "Cocinar", "Jugar"], correcta: 0 },
          { pregunta: "Zotero es:", opciones: ["Gratuito", "De pago", "Privado", "Secreto"], correcta: 0 },
          { pregunta: "Permiten:", opciones: ["Insertar citas automáticas", "Editar videos", "Cocinar", "Jugar"], correcta: 0 },
        ]
      },
    ]
  },
]

const colorMap: Record<string, { light: string; text: string }> = {
  violet: { light: "bg-violet-50", text: "text-violet-600" },
  emerald: { light: "bg-emerald-50", text: "text-emerald-600" },
  sky: { light: "bg-sky-50", text: "text-sky-600" },
  orange: { light: "bg-orange-50", text: "text-orange-600" },
}

export default function CursosPage() {
  const [selectedCurso, setSelectedCurso] = useState<any>(null)
  const [selectedModulo, setSelectedModulo] = useState<any>(null)
  const [completedMods, setCompletedMods] = useState<Record<number, number[]>>({})
  const [showQuiz, setShowQuiz] = useState(false)
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)
  const [quizScore, setQuizScore] = useState(0)

  const startQuiz = () => {
    setQuizAnswers({})
    setQuizSubmitted(false)
    setQuizScore(0)
    setShowQuiz(true)
  }

  const submitQuiz = (modulo: any) => {
    let correct = 0
    modulo.quiz.forEach((q: any, i: number) => {
      if (quizAnswers[i] === q.correcta) correct++
    })
    const score = Math.round((correct / modulo.quiz.length) * 100)
    setQuizScore(score)
    setQuizSubmitted(true)
    if (score >= 70) {
      setTimeout(() => {
        setCompletedMods(prev => ({
          ...prev,
          [selectedCurso.id]: [...(prev[selectedCurso.id] || []), selectedCurso.modulosList.indexOf(modulo)]
        }))
        setSelectedModulo(null)
        setShowQuiz(false)
      }, 1500)
    }
  }

  const descargarCertificado = (curso: any) => {
    const contenido = `CERTIFICADO\n\nOtorgado por completar: ${curso.title}\nFecha: ${new Date().toLocaleDateString()}\n\nSemilla Científica`
    const blob = new Blob([contenido], { type: "text/plain" })
    const a = document.createElement("a")
    a.href = URL.createObjectURL(blob); a.download = `Certificado_${curso.title}.txt`; a.click()
  }

  if (selectedModulo) {
    return (
      <div className="p-8 space-y-4">
        <button onClick={() => { setSelectedModulo(null); setShowQuiz(false) }} className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800">
          <ArrowLeft className="w-4 h-4" /> Volver
        </button>
        <div className="bg-black rounded-2xl overflow-hidden aspect-video shadow-2xl">
          <iframe src={selectedModulo.video} className="w-full h-full" allowFullScreen title={selectedModulo.titulo} />
        </div>
        <div className="flex items-center justify-between">
          <div><h1 className="text-xl font-bold text-slate-800">{selectedModulo.titulo}</h1><p className="text-sm text-slate-500">⏱ {selectedModulo.duracion}</p></div>
          {!showQuiz && <button onClick={startQuiz} className="bg-[#7C4DFF] text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-[#6A3DE8] transition-all"><HelpCircle className="w-4 h-4 inline mr-2" />Cuestionario (3 preguntas)</button>}
        </div>
        {showQuiz && selectedModulo.quiz && (
          <div className="bg-white rounded-2xl p-6 border shadow-lg">
            <h3 className="font-bold text-lg mb-4">📝 Cuestionario - Necesitas 70% para aprobar</h3>
            {selectedModulo.quiz.map((q: any, qi: number) => (
              <div key={qi} className="mb-4">
                <p className="font-medium text-slate-700 mb-2">{qi+1}. {q.pregunta}</p>
                <div className="space-y-1">
                  {q.opciones.map((op: string, oi: number) => (
                    <button key={oi} onClick={() => !quizSubmitted && setQuizAnswers(prev => ({...prev, [qi]: oi}))}
                      className={`w-full text-left p-2.5 rounded-lg border text-sm transition-all ${
                        quizSubmitted 
                          ? oi === q.correcta ? "bg-emerald-50 border-emerald-500" : quizAnswers[qi] === oi ? "bg-red-50 border-red-500" : "border-slate-100"
                          : quizAnswers[qi] === oi ? "border-[#7C4DFF] bg-violet-50" : "border-slate-100 hover:border-slate-300"
                      }`}>{String.fromCharCode(65+oi)}) {op}</button>
                  ))}
                </div>
              </div>
            ))}
            {!quizSubmitted ? (
              <button onClick={() => submitQuiz(selectedModulo)} className="w-full bg-[#7C4DFF] text-white font-semibold py-3 rounded-xl mt-4 hover:bg-[#6A3DE8]">Enviar respuestas</button>
            ) : (
              <div className={`p-4 rounded-xl mt-4 font-semibold text-center ${quizScore >= 70 ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"}`}>
                {quizScore >= 70 ? `✅ ¡Aprobaste con ${quizScore}%!` : `❌ ${quizScore}% - Necesitas 70%. <button onClick={startQuiz} className="underline">Reintentar</button>`}
              </div>
            )}
          </div>
        )}
      </div>
    )
  }

  if (selectedCurso) {
    const modsCompletados = completedMods[selectedCurso.id] || []
    const pct = Math.round((modsCompletados.length / selectedCurso.modulosList.length) * 100)
    return (
      <div className="p-8 space-y-6">
        <button onClick={() => setSelectedCurso(null)} className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800"><ArrowLeft className="w-4 h-4" /> Volver</button>
        <div className="bg-gradient-to-br from-[#7C4DFF] to-[#5B2DDB] rounded-2xl p-8 text-white">
          <h1 className="text-2xl font-bold">{selectedCurso.title}</h1>
          <p className="text-white/70 text-sm">{selectedCurso.level} • {selectedCurso.duration}</p>
          <div className="mt-4 h-2.5 bg-white/20 rounded-full"><div className="h-full bg-white rounded-full transition-all" style={{width: `${pct}%`}} /></div>
          <p className="text-xs text-white/60 mt-1">{pct}% completado</p>
        </div>
        <div className="space-y-3">
          {selectedCurso.modulosList.map((mod: any, i: number) => {
            const done = modsCompletados.includes(i)
            return (
              <div key={i} onClick={() => setSelectedModulo(mod)} className={`bg-white rounded-xl p-4 border cursor-pointer hover:shadow-md flex items-center justify-between group ${done ? "border-emerald-200 bg-emerald-50/50" : "border-slate-100"}`}>
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold ${done ? "bg-emerald-500 text-white" : "bg-slate-100 text-slate-500"}`}>{done ? <CheckCircle className="w-4 h-4" /> : i+1}</div>
                  <div><p className="font-medium text-sm">{mod.titulo}</p><p className="text-xs text-slate-400">⏱ {mod.duracion}</p></div>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-300" />
              </div>
            )
          })}
        </div>
        {pct === 100 && <button onClick={() => descargarCertificado(selectedCurso)} className="w-full bg-amber-500 text-white font-bold py-3.5 rounded-xl animate-pulse flex items-center justify-center gap-2"><Award className="w-5 h-5" />Descargar Certificado</button>}
      </div>
    )
  }

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-slate-800">📚 Cursos</h1><p className="text-sm text-slate-500">Videos + Cuestionarios (3 preguntas, 70% para aprobar)</p></div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-white border rounded-xl text-sm"><Filter className="w-4 h-4" />Filtrar</button>
      </div>
      <div className="grid grid-cols-4 gap-4">
        <StatBox icon={BookOpen} value={cursosData.length} label="Cursos" color="violet" />
        <StatBox icon={Users} value="4,680" label="Estudiantes" color="emerald" />
        <StatBox icon={Clock} value="180h" label="Horas" color="sky" />
        <StatBox icon={Star} value="4.7" label="Rating" color="amber" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        {cursosData.map(c => (
          <div key={c.id} onClick={() => setSelectedCurso(c)} className="bg-white rounded-2xl p-6 border hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group">
            <div className="flex gap-4 mb-4">
              <div className={`w-14 h-14 ${colorMap[c.color].light} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}><c.icon className={`w-7 h-7 ${colorMap[c.color].text}`} /></div>
              <div><h3 className="font-bold">{c.title}</h3><p className="text-xs text-slate-500">{c.desc}</p></div>
            </div>
            <div className="flex gap-2 text-xs text-slate-500 mb-3">
              <span className="bg-slate-50 px-2.5 py-1 rounded-full"><Clock className="w-3.5 h-3.5 inline mr-1"/>{c.duration}</span>
              <span className="bg-slate-50 px-2.5 py-1 rounded-full"><Users className="w-3.5 h-3.5 inline mr-1"/>{c.students}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-1"><Star className="w-4 h-4 text-amber-400 fill-amber-400"/><b>{c.rating}</b></span>
              <span className="text-xs font-bold bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-full">GRATIS</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function StatBox({ icon: Icon, value, label, color }: any) {
  const c: Record<string, string> = { violet: "text-violet-500 bg-violet-50", emerald: "text-emerald-500 bg-emerald-50", sky: "text-sky-500 bg-sky-50", amber: "text-amber-500 bg-amber-50" }
  return <div className="bg-white rounded-xl p-4 border flex items-center gap-3"><div className={`w-10 h-10 rounded-xl flex items-center justify-center ${c[color]}`}><Icon className="w-5 h-5" /></div><div><p className="text-xl font-bold">{value}</p><p className="text-xs text-slate-500">{label}</p></div></div>
}