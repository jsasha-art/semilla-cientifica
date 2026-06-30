"use client"

import { Search, ExternalLink, BookOpen, Calculator, FileText, Code, Database, Globe } from "lucide-react"

const categorias = [
  {
    title: "📄 Plantillas",
    items: [
      { name: "Protocolo de investigación", url: "https://docs.google.com/document/d/1pQpFzK0qK0qK0qK0qK0qK0qK0qK0qK0qK0qK0/edit?usp=sharing" },
      { name: "Consentimiento informado", url: "https://www.who.int/docs/default-source/ethics/ci-template-spanish.docx" },
      { name: "Carta de presentación", url: "https://www.icmje.org/recommendations/translations/spanish2022.pdf" },
      { name: "Formato de tesis", url: "https://docs.google.com/document/d/1pQpFzK0qK0qK0qK0qK0qK0qK0qK0qK0qK0qK/edit?usp=sharing" },
    ],
    icon: FileText,
    color: "violet"
  },
  {
    title: "📊 Software Estadístico",
    items: [
      { name: "SPSS", url: "https://www.ibm.com/products/spss-statistics" },
      { name: "R", url: "https://cran.r-project.org/" },
      { name: "Python", url: "https://www.python.org/" },
      { name: "Excel", url: "https://www.microsoft.com/es-es/microsoft-365/excel" },
      { name: "Jamovi", url: "https://www.jamovi.org/" },
      { name: "Stata", url: "https://www.stata.com/" },
    ],
    icon: Calculator,
    color: "emerald"
  },
  {
    title: "📝 Normas y Estilos",
    items: [
      { name: "Normas APA 7ª ed.", url: "https://normas-apa.org/" },
      { name: "Normas Vancouver", url: "https://www.icmje.org/recommendations/" },
      { name: "Formato MLA", url: "https://style.mla.org/" },
      { name: "Estilo Chicago", url: "https://www.chicagomanualofstyle.org/" },
    ],
    icon: BookOpen,
    color: "sky"
  },
  {
    title: "🔬 Bases de Datos",
    items: [
      { name: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/" },
      { name: "Scopus", url: "https://www.scopus.com/" },
      { name: "Web of Science", url: "https://www.webofscience.com/" },
      { name: "SciELO", url: "https://scielo.org/" },
      { name: "LILACS", url: "https://lilacs.bvsalud.org/" },
      { name: "Cochrane", url: "https://www.cochranelibrary.com/" },
    ],
    icon: Database,
    color: "orange"
  },
  {
    title: "💻 Herramientas",
    items: [
      { name: "Mendeley", url: "https://www.mendeley.com/" },
      { name: "Zotero", url: "https://www.zotero.org/" },
      { name: "Turnitin", url: "https://www.turnitin.com/" },
      { name: "Grammarly", url: "https://www.grammarly.com/" },
      { name: "Overleaf", url: "https://www.overleaf.com/" },
      { name: "RStudio", url: "https://posit.co/products/open-source/rstudio/" },
    ],
    icon: Code,
    color: "rose"
  },
  {
    title: "🌐 Portales Académicos",
    items: [
      { name: "Google Scholar", url: "https://scholar.google.com/" },
      { name: "ResearchGate", url: "https://www.researchgate.net/" },
      { name: "ORCID", url: "https://orcid.org/" },
      { name: "Academia.edu", url: "https://www.academia.edu/" },
      { name: "Semantic Scholar", url: "https://www.semanticscholar.org/" },
    ],
    icon: Globe,
    color: "indigo"
  },
]

const colorMap: Record<string, string> = {
  violet: "border-l-violet-500 bg-violet-50/50",
  emerald: "border-l-emerald-500 bg-emerald-50/50",
  sky: "border-l-sky-500 bg-sky-50/50",
  orange: "border-l-orange-500 bg-orange-50/50",
  rose: "border-l-rose-500 bg-rose-50/50",
  indigo: "border-l-indigo-500 bg-indigo-50/50",
}

export default function RecursosPage() {
  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 font-display">📂 Recursos</h1>
        <p className="text-sm text-slate-500 mt-1">Herramientas, plantillas y guías para tu investigación</p>
      </div>

      <div className="relative max-w-xl">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Buscar recursos..."
          className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#7C4DFF]/40 focus:ring-3 focus:ring-[#7C4DFF]/8 transition-all"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        {categorias.map((cat) => (
          <div key={cat.title} className={`bg-white rounded-2xl p-5 border border-slate-100 shadow-sm border-l-4 ${colorMap[cat.color]}`}>
            <div className="flex items-center gap-2 mb-3">
              <cat.icon className="w-5 h-5 text-slate-600" />
              <h3 className="font-bold text-slate-800">{cat.title}</h3>
            </div>
            <div className="space-y-1.5">
              {cat.items.map((item) => (
                <a
                  key={item.name}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-50 transition-colors group"
                >
                  <span className="text-sm text-slate-600 group-hover:text-[#7C4DFF] transition-colors">
                    {item.name}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-300 group-hover:text-[#7C4DFF] transition-colors opacity-0 group-hover:opacity-100" />
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}