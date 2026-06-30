"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Bell, Shield, Moon, Sun, Globe, Lock, LogOut, Trash2, Mail, User, Palette, Eye, EyeOff, Check } from "lucide-react"
import { useTheme } from "@/app/theme-provider"

export default function ConfiguracionPage() {
  const { theme, toggleTheme } = useTheme()
  const [notificaciones, setNotificaciones] = useState({
    cursos: true,
    mentorias: true,
    comunidad: false,
    eventos: true,
    logros: true,
  })
  const [idioma, setIdioma] = useState("es")
  const [showPassword, setShowPassword] = useState(false)
  const [password, setPassword] = useState("")
  const [saved, setSaved] = useState(false)

  const toggleNotificacion = (key: string) => {
    setNotificaciones(prev => ({ ...prev, [key]: !prev[key as keyof typeof prev] }))
  }

  const guardarConfig = () => {
    localStorage.setItem("notificaciones", JSON.stringify(notificaciones))
    localStorage.setItem("idioma", idioma)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="p-8 space-y-6 max-w-3xl">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white font-display">⚙️ Configuración</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Personaliza tu experiencia en Semilla Científica</p>
      </motion.div>

      {/* Apariencia */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700 shadow-sm">
        <h3 className="font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
          <Palette className="w-5 h-5 text-violet-500" /> Apariencia
        </h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
              {theme === "dark" ? "🌙 Modo Oscuro" : "☀️ Modo Claro"}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Reduce la fatiga visual con el tema oscuro</p>
          </div>
          <button onClick={toggleTheme}
            className={`w-16 h-8 rounded-full transition-all duration-300 relative ${
              theme === "dark" ? "bg-violet-600" : "bg-slate-300"
            }`}>
            <motion.div animate={{ x: theme === "dark" ? 32 : 2 }}
              className="w-6 h-6 bg-white rounded-full absolute top-1 shadow-md flex items-center justify-center text-xs">
              {theme === "dark" ? "🌙" : "☀️"}
            </motion.div>
          </button>
        </div>
      </motion.div>

      {/* Notificaciones */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700 shadow-sm">
        <h3 className="font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
          <Bell className="w-5 h-5 text-sky-500" /> Notificaciones
        </h3>
        <div className="space-y-4">
          {[
            { key: "cursos", label: "Nuevos cursos", desc: "Recibe alertas cuando se publiquen nuevos cursos" },
            { key: "mentorias", label: "Mentorías", desc: "Recordatorios de sesiones agendadas" },
            { key: "comunidad", label: "Comunidad", desc: "Menciones y respuestas en publicaciones" },
            { key: "eventos", label: "Eventos", desc: "Próximos talleres y conferencias" },
            { key: "logros", label: "Logros", desc: "Cuando desbloquees nuevas insignias" },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{item.label}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{item.desc}</p>
              </div>
              <button onClick={() => toggleNotificacion(item.key)}
                className={`w-12 h-6 rounded-full transition-all relative ${
                  notificaciones[item.key as keyof typeof notificaciones] ? "bg-emerald-500" : "bg-slate-300 dark:bg-slate-600"
                }`}>
                <motion.div animate={{ x: notificaciones[item.key as keyof typeof notificaciones] ? 26 : 2 }}
                  className="w-4 h-4 bg-white rounded-full absolute top-1 shadow-sm" />
              </button>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Seguridad */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700 shadow-sm">
        <h3 className="font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5 text-emerald-500" /> Seguridad
        </h3>
        <div className="space-y-3">
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)}
              placeholder="Nueva contraseña" className="w-full pl-10 pr-10 py-2.5 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-sm" />
            <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          <button className="w-full bg-violet-500 text-white py-2.5 rounded-xl font-semibold hover:bg-violet-600 transition-colors text-sm">
            Cambiar contraseña
          </button>
        </div>
      </motion.div>

      {/* Idioma */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
        className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700 shadow-sm">
        <h3 className="font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
          <Globe className="w-5 h-5 text-blue-500" /> Idioma
        </h3>
        <select value={idioma} onChange={e => setIdioma(e.target.value)}
          className="w-full p-2.5 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-sm text-slate-700 dark:text-slate-200">
          <option value="es">🇪🇸 Español</option>
          <option value="en">🇺🇸 English</option>
          <option value="pt">🇧🇷 Português</option>
        </select>
      </motion.div>

      {/* Guardar */}
      <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
        onClick={guardarConfig}
        className="w-full bg-gradient-to-r from-[#7C4DFF] to-[#6A3DE8] text-white font-bold py-3.5 rounded-xl hover:from-[#6A3DE8] hover:to-[#5B2DDB] transition-all shadow-lg shadow-[#7C4DFF]/20 flex items-center justify-center gap-2">
        {saved ? <><Check className="w-5 h-5" /> ¡Configuración guardada!</> : "Guardar configuración"}
      </motion.button>

      {/* Zona de peligro */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
        className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-red-200 dark:border-red-800 shadow-sm">
        <h3 className="font-bold text-red-600 dark:text-red-400 mb-4">⚠️ Zona de Peligro</h3>
        <div className="space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-sm text-red-600 dark:text-red-400">
            <LogOut className="w-4 h-4" /> Cerrar sesión en todos los dispositivos
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-sm text-red-600 dark:text-red-400">
            <Trash2 className="w-4 h-4" /> Eliminar cuenta permanentemente
          </button>
        </div>
      </motion.div>
    </div>
  )
}