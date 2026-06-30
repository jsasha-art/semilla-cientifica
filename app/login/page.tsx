"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import { FlaskConical } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isSignUp, setIsSignUp] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleAuth = async () => {
    setLoading(true)
    setError("")
    
    const { error } = isSignUp 
      ? await supabase.auth.signUp({ email, password })
      : await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError(error.message)
    } else {
      router.push("/")
      router.refresh()
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#7C4DFF] via-[#6A3DE8] to-[#4D9FFF] flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 w-full max-w-md shadow-2xl">
        <div className="text-center mb-6">
          <FlaskConical className="w-12 h-12 text-[#7C4DFF] mx-auto mb-3" />
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Semilla Científica</h1>
          <p className="text-sm text-slate-500 mt-1">{isSignUp ? "Crea tu cuenta" : "Inicia sesión"}</p>
        </div>

        {error && <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm mb-4">{error}</div>}

        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}
          className="w-full p-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl mb-3 text-sm" />
        <input type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)}
          className="w-full p-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl mb-4 text-sm" />

        <button onClick={handleAuth} disabled={loading}
          className="w-full bg-[#7C4DFF] text-white font-bold py-3 rounded-xl hover:bg-[#6A3DE8] transition-colors disabled:opacity-50 mb-3">
          {loading ? "Cargando..." : isSignUp ? "Crear cuenta" : "Iniciar sesión"}
        </button>

        <button onClick={() => setIsSignUp(!isSignUp)} className="w-full text-sm text-[#7C4DFF] hover:underline">
          {isSignUp ? "¿Ya tienes cuenta? Inicia sesión" : "¿No tienes cuenta? Regístrate"}
        </button>
      </div>
    </div>
  )
}