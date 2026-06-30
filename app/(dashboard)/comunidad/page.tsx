"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Users, MessageSquare, Heart, Share2, MoreHorizontal, Send, Image, Smile, Bookmark, ThumbsUp } from "lucide-react"

const postsIniciales = [
  {
    id: 1, author: "María Rodríguez", role: "Medicina - 3er Semestre", avatar: "MR", time: "Hace 2 horas",
    content: "¡Hola comunidad! Estoy iniciando mi primer protocolo sobre diabetes tipo 2. ¿Alguien tiene recomendaciones de artículos clave? 🙏",
    likes: 24, comments: 8, liked: false, saved: false,
    tags: ["Diabetes", "Protocolo", "Ayuda"],
    respuestas: [
      { author: "Carlos Mendoza", text: "Te recomiendo revisar la guía de la OMS 2024. ¡Éxitos! 💪", time: "Hace 1 hora" },
      { author: "Ana Torres", text: "PubMed tiene excelentes revisiones sistemáticas sobre DM2.", time: "Hace 30 min" },
    ]
  },
  {
    id: 2, author: "Carlos Mendoza", role: "Docente Investigador", avatar: "CM", time: "Hace 5 horas",
    content: "Comparto esta guía actualizada sobre normas APA 7ma edición. Incluye ejemplos prácticos para citas. ¡Espero les sea útil! 📚",
    likes: 56, comments: 12, liked: false, saved: false,
    tags: ["APA", "Guía", "Recursos"],
    respuestas: [
      { author: "María Rodríguez", text: "¡Justo lo que necesitaba! Gracias profe 🙌", time: "Hace 3 horas" },
    ]
  },
  {
    id: 3, author: "Ana Torres", role: "Enfermería - 2do Semestre", avatar: "AT", time: "Hace 1 día",
    content: "¿Alguien más está tomando el curso de Bioestadística? Me encantaría formar un grupo de estudio para practicar SPSS y R. 💻",
    likes: 18, comments: 15, liked: false, saved: false,
    tags: ["Bioestadística", "Grupo", "SPSS"],
    respuestas: []
  },
]

export default function ComunidadPage() {
  const [posts, setPosts] = useState(postsIniciales)
  const [showComments, setShowComments] = useState<number | null>(null)
  const [newComment, setNewComment] = useState("")
  const [newPost, setNewPost] = useState("")

  const toggleLike = (id: number) => {
    setPosts(prev => prev.map(p => p.id === id ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p))
  }

  const toggleSave = (id: number) => {
    setPosts(prev => prev.map(p => p.id === id ? { ...p, saved: !p.saved } : p))
  }

  const publicar = () => {
    if (!newPost.trim()) return
    const nuevo = {
      id: Date.now(), author: "Tú", role: "Medicina", avatar: "TÚ", time: "Ahora",
      content: newPost, likes: 0, comments: 0, liked: false, saved: false,
      tags: ["Nuevo"], respuestas: []
    }
    setPosts([nuevo, ...posts])
    setNewPost("")
  }

  const agregarComentario = (postId: number) => {
    if (!newComment.trim()) return
    setPosts(prev => prev.map(p => p.id === postId ? {
      ...p, comments: p.comments + 1,
      respuestas: [...p.respuestas, { author: "Tú", text: newComment, time: "Ahora" }]
    } : p))
    setNewComment("")
  }

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white font-display">👥 Comunidad</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Conecta, comparte y aprende con otros investigadores</p>
      </div>

      {/* Crear post */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-100 dark:border-slate-700 shadow-sm">
        <div className="flex gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7C4DFF] to-[#4D9FFF] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">TÚ</div>
          <div className="flex-1">
            <textarea value={newPost} onChange={e => setNewPost(e.target.value)}
              placeholder="Comparte algo con la comunidad..." rows={2}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-sm resize-none focus:outline-none focus:border-[#7C4DFF]/40 transition-all" />
            <div className="flex items-center justify-between mt-2">
              <div className="flex gap-2">
                <button className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-700 px-3 py-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"><Image className="w-4 h-4" /> Imagen</button>
                <button className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-700 px-3 py-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"><Smile className="w-4 h-4" /> Emoji</button>
              </div>
              <button onClick={publicar} className="bg-[#7C4DFF] text-white text-sm font-semibold px-5 py-2 rounded-xl hover:bg-[#6A3DE8] transition-all flex items-center gap-1.5 shadow-lg shadow-[#7C4DFF]/20">
                <Send className="w-4 h-4" /> Publicar
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Posts */}
      <div className="space-y-4">
        {posts.map((post) => (
          <motion.div key={post.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-100 dark:border-slate-700 shadow-sm">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-400 to-sky-400 flex items-center justify-center text-white font-bold text-sm">{post.avatar}</div>
                <div>
                  <p className="font-semibold text-slate-800 dark:text-white text-sm">{post.author}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{post.role} • {post.time}</p>
                </div>
              </div>
              <button onClick={() => toggleSave(post.id)} className="p-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                <Bookmark className={`w-4 h-4 ${post.saved ? "text-[#7C4DFF] fill-[#7C4DFF]" : "text-slate-400"}`} />
              </button>
            </div>

            <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed mb-3">{post.content}</p>

            <div className="flex gap-2 mb-3">
              {post.tags.map(tag => (
                <span key={tag} className="text-xs bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400 px-2.5 py-1 rounded-full font-medium">#{tag}</span>
              ))}
            </div>

            <div className="flex items-center gap-6 pt-3 border-t border-slate-100 dark:border-slate-700">
              <button onClick={() => toggleLike(post.id)}
                className={`flex items-center gap-1.5 text-sm transition-all ${post.liked ? "text-red-500" : "text-slate-500 hover:text-red-500"}`}>
                <Heart className={`w-4 h-4 ${post.liked ? "fill-red-500" : ""}`} /> {post.likes}
              </button>
              <button onClick={() => setShowComments(showComments === post.id ? null : post.id)}
                className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-sky-500 transition-colors">
                <MessageSquare className="w-4 h-4" /> {post.comments}
              </button>
              <button className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-emerald-500 transition-colors">
                <Share2 className="w-4 h-4" /> Compartir
              </button>
            </div>

            {/* Comentarios */}
            <AnimatePresence>
              {showComments === post.id && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                  className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700 space-y-3">
                  {post.respuestas.map((resp, i) => (
                    <div key={i} className="flex gap-2">
                      <div className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-xs font-bold flex-shrink-0">{resp.author[0]}</div>
                      <div className="bg-slate-50 dark:bg-slate-700 rounded-xl px-3 py-2 flex-1">
                        <p className="text-xs font-semibold text-slate-700 dark:text-slate-200">{resp.author}</p>
                        <p className="text-sm text-slate-600 dark:text-slate-300">{resp.text}</p>
                        <p className="text-xs text-slate-400 mt-1">{resp.time}</p>
                      </div>
                    </div>
                  ))}
                  <div className="flex gap-2">
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#7C4DFF] to-[#4D9FFF] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">TÚ</div>
                    <div className="flex-1 flex gap-2">
                      <input value={newComment} onChange={e => setNewComment(e.target.value)} onKeyDown={e => e.key === "Enter" && agregarComentario(post.id)}
                        placeholder="Escribe un comentario..." className="flex-1 px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-sm focus:outline-none" />
                      <button onClick={() => agregarComentario(post.id)} className="bg-[#7C4DFF] text-white px-3 py-2 rounded-xl hover:bg-[#6A3DE8] transition-colors">
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  )
}