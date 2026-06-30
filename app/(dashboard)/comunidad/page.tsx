import { Users, MessageSquare, Heart, Share2, MoreHorizontal, Send, Image, Smile } from "lucide-react"

const posts = [
  {
    author: "María Rodríguez",
    role: "Estudiante de Medicina - 3er Semestre",
    avatar: "MR",
    time: "Hace 2 horas",
    content: "¡Hola comunidad! Estoy iniciando mi primer protocolo de investigación sobre diabetes tipo 2. ¿Alguien tiene recomendaciones de artículos clave sobre este tema? Agradecería mucho su ayuda 🙏",
    likes: 24,
    comments: 8,
    tags: ["Diabetes", "Protocolo", "Ayuda"]
  },
  {
    author: "Carlos Mendoza",
    role: "Docente Investigador",
    avatar: "CM",
    time: "Hace 5 horas",
    content: "Comparto esta guía actualizada sobre normas APA 7ma edición. Incluye ejemplos prácticos para citas y referencias bibliográficas. ¡Espero les sea útil! 📚",
    likes: 56,
    comments: 12,
    tags: ["APA", "Guía", "Recursos"]
  },
  {
    author: "Ana Torres",
    role: "Estudiante de Enfermería - 2do Semestre",
    avatar: "AT",
    time: "Hace 1 día",
    content: "¿Alguien más está tomando el curso de Bioestadística? Me encantaría formar un grupo de estudio para practicar ejercicios de SPSS y R. ¡Comenten si les interesa! 💻",
    likes: 18,
    comments: 15,
    tags: ["Bioestadística", "Grupo de estudio", "SPSS"]
  },
]

export default function ComunidadPage() {
  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 font-display">👥 Comunidad</h1>
        <p className="text-sm text-slate-500 mt-1">Conecta, comparte y aprende con otros investigadores</p>
      </div>

      {/* Crear Post */}
      <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
        <div className="flex gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7C4DFF] to-[#4D9FFF] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
            AG
          </div>
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Comparte algo con la comunidad..."
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#7C4DFF]/40 transition-all"
            />
            <div className="flex items-center gap-2 mt-3">
              <button className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-700 px-3 py-1.5 rounded-lg hover:bg-slate-50 transition-colors">
                <Image className="w-4 h-4" /> Imagen
              </button>
              <button className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-700 px-3 py-1.5 rounded-lg hover:bg-slate-50 transition-colors">
                <Smile className="w-4 h-4" /> Emoji
              </button>
              <button className="ml-auto bg-[#7C4DFF] text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-[#6A3DE8] transition-colors flex items-center gap-1.5">
                <Send className="w-3.5 h-3.5" /> Publicar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Posts */}
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.author} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-400 to-sky-400 flex items-center justify-center text-white font-bold text-sm">
                  {post.avatar}
                </div>
                <div>
                  <p className="font-semibold text-slate-800 text-sm">{post.author}</p>
                  <p className="text-xs text-slate-500">{post.role}</p>
                  <p className="text-xs text-slate-400">{post.time}</p>
                </div>
              </div>
              <button className="p-1.5 rounded-lg hover:bg-slate-50 text-slate-400">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>

            <p className="text-sm text-slate-700 leading-relaxed mb-3">{post.content}</p>

            <div className="flex gap-2 mb-3">
              {post.tags.map(tag => (
                <span key={tag} className="text-xs bg-violet-50 text-violet-600 px-2.5 py-1 rounded-full font-medium">#{tag}</span>
              ))}
            </div>

            <div className="flex items-center gap-6 pt-3 border-t border-slate-50">
              <button className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-rose-500 transition-colors">
                <Heart className="w-4 h-4" /> {post.likes}
              </button>
              <button className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-sky-500 transition-colors">
                <MessageSquare className="w-4 h-4" /> {post.comments} comentarios
              </button>
              <button className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-emerald-500 transition-colors">
                <Share2 className="w-4 h-4" /> Compartir
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}