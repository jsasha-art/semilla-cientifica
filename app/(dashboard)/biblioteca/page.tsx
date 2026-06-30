"use client"

import { useState, useEffect } from "react"
import { Search, Download, ExternalLink, Upload, FileText, X } from "lucide-react"
import { supabase } from "@/lib/supabase"

interface Archivo {
  id: string
  name: string
  url: string
  categoria: string
  created_at: string
}

export default function BibliotecaPage() {
  const [archivos, setArchivos] = useState<Archivo[]>([])
  const [uploading, setUploading] = useState(false)
  const [categoria, setCategoria] = useState("General")
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    cargarArchivos()
  }, [])

  const cargarArchivos = async () => {
    const { data } = await supabase.storage.from("biblioteca").list()
    if (data) {
      const archivosConUrl = data
        .filter(f => f.name !== ".emptyFolderPlaceholder")
        .map(f => ({
          id: f.id || f.name,
          name: f.name,
          url: supabase.storage.from("biblioteca").getPublicUrl(f.name).data.publicUrl,
          categoria: f.metadata?.categoria || "General",
          created_at: f.created_at
        }))
      setArchivos(archivosConUrl)
    }
  }

  const subirArchivo = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    await supabase.storage.from("biblioteca").upload(file.name, file, {
      metadata: { categoria }
    })
    setUploading(false)
    cargarArchivos()
  }

  const categorias = ["Todas", "General", "Metodología", "Bioestadística", "APA", "Plantillas", "Artículos"]

  const filtrados = archivos.filter(a => {
    const matchCat = categoria === "Todas" || a.categoria === categoria
    const matchSearch = a.name.toLowerCase().includes(searchTerm.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">📖 Biblioteca</h1>
          <p className="text-sm text-slate-500">Sube y comparte archivos de investigación</p>
        </div>
        <label className="bg-[#7C4DFF] text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-[#6A3DE8] cursor-pointer transition-colors flex items-center gap-2">
          <Upload className="w-4 h-4" />
          {uploading ? "Subiendo..." : "Subir archivo"}
          <input type="file" onChange={subirArchivo} className="hidden" accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx" />
        </label>
      </div>

      {/* Filtros */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input type="text" placeholder="Buscar archivos..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#7C4DFF]/40" />
        </div>
        <select value={categoria} onChange={(e) => setCategoria(e.target.value)}
          className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm">
          {categorias.map(c => <option key={c}>{c}</option>)}
        </select>
      </div>

      {/* Lista de archivos */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm">
        {filtrados.length === 0 ? (
          <div className="p-12 text-center text-slate-400">
            <Upload className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No hay archivos aún. ¡Sube el primero!</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-50">
            {filtrados.map((archivo) => (
              <div key={archivo.id} className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-3">
                  <FileText className="w-8 h-8 text-violet-500" />
                  <div>
                    <p className="font-medium text-slate-700 text-sm">{archivo.name}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs bg-violet-50 text-violet-600 px-2 py-0.5 rounded-full">{archivo.categoria}</span>
                      <span className="text-xs text-slate-400">{new Date(archivo.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <a href={archivo.url} target="_blank" className="p-2 rounded-lg hover:bg-sky-50 text-slate-400 hover:text-sky-500">
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <a href={archivo.url} download className="p-2 rounded-lg hover:bg-violet-50 text-slate-400 hover:text-violet-500">
                    <Download className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
                )}
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-bold text-slate-800 mb-3">🌐 Recursos Externos Gratuitos</h3>
        <div className="grid grid-cols-2 gap-3">
          {[
            { title: "Guía APA 7ma Edición", url: "https://normas-apa.org/wp-content/uploads/Guia-Normas-APA-7ma-edicion.pdf", icon: "📝" },
            { title: "Manual de Metodología", url: "https://www.sld.cu/galerias/pdf/sitios/ecimed/manual_de_metodologia_de_investigaciones_1.pdf", icon: "📚" },
            { title: "Guía Vancouver", url: "https://www.icmje.org/recommendations/translations/spanish2022.pdf", icon: "📋" },
            { title: "PubMed Tutorial", url: "https://pubmed.ncbi.nlm.nih.gov/help/", icon: "🔬" },
            { title: "Scopus Guía", url: "https://elsevier.libguides.com/Scopus", icon: "🌐" },
            { title: "Mendeley Guía", url: "https://www.mendeley.com/guides", icon: "🔖" },
            { title: "Zotero Guía rápida", url: "https://www.zotero.org/support/es/quick_start_guide", icon: "📚" },
            { title: "Manual SPSS Básico", url: "https://www.uv.es/innovamide/spss/SPSS_ManualBasico.pdf", icon: "📊" },
          ].map((recurso) => (
            <a key={recurso.title} href={recurso.url} target="_blank" 
              className="bg-white border border-slate-100 rounded-xl p-4 hover:shadow-md hover:border-[#7C4DFF]/30 transition-all flex items-center gap-3">
              <span className="text-2xl">{recurso.icon}</span>
              <div>
                <p className="font-medium text-sm text-slate-700">{recurso.title}</p>
                <p className="text-xs text-[#7C4DFF] mt-0.5">Abrir recurso →</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}