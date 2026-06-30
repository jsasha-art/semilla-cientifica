"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bot, Send, Sparkles, Loader2, Brain } from "lucide-react"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export function SidebarRight() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "¡Hola! 👋 Soy tu asistente de investigación.\n\nPregúntame sobre metodología, bioestadística, normas APA, protocolos o cualquier duda científica.",
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || isLoading) return
    const userMsg: Message = { id: Date.now().toString(), role: "user", content: input, timestamp: new Date() }
    setMessages(prev => [...prev, userMsg])
    setInput("")
    setIsLoading(true)

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg.content }),
      })
      const data = await res.json()
      const assistantMsg: Message = { id: (Date.now() + 1).toString(), role: "assistant", content: data.reply, timestamp: new Date() }
      setMessages(prev => [...prev, assistantMsg])
    } catch {
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: "assistant", content: "Error. Intenta de nuevo. 🙏", timestamp: new Date() }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <aside className="h-screen w-80 bg-white dark:bg-slate-800 border-l border-slate-200/60 dark:border-slate-700 flex flex-col flex-shrink-0">
      <div className="px-4 py-3.5 border-b border-slate-100 dark:border-slate-700">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-br from-[#7C4DFF] to-[#4D9FFF] rounded-xl flex items-center justify-center shadow-lg shadow-[#7C4DFF]/20">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full ring-2 ring-white dark:ring-slate-800" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="text-sm font-semibold text-slate-800 dark:text-white">Asistente IA</h3>
              <Sparkles className="w-3.5 h-3.5 text-[#7C4DFF]" />
            </div>
            <p className="text-xs text-emerald-600 font-medium">En línea</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-slate-50/50 dark:bg-slate-900/50">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            {msg.role === "assistant" && (
              <div className="w-7 h-7 rounded-lg bg-violet-50 dark:bg-violet-900/30 flex items-center justify-center flex-shrink-0 mt-1">
                <Bot className="w-3.5 h-3.5 text-[#7C4DFF]" />
              </div>
            )}
            <div className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm ${msg.role === "user" ? "bg-[#7C4DFF] text-white rounded-br-md" : "bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-bl-md border border-slate-200/60 dark:border-slate-600"}`}>
              <p className="whitespace-pre-wrap">{msg.content}</p>
              <p className={`text-[10px] mt-1.5 ${msg.role === "user" ? "text-white/60" : "text-slate-400 dark:text-slate-500"}`}>
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-2">
            <div className="w-7 h-7 rounded-lg bg-white dark:bg-slate-700 flex items-center justify-center">
              <Loader2 className="w-3.5 h-3.5 text-[#7C4DFF] animate-spin" />
            </div>
            <div className="bg-white dark:bg-slate-700 rounded-2xl rounded-bl-md px-4 py-3 border border-slate-200/60 dark:border-slate-600">
              <div className="flex gap-1.5">
                <div className="w-2 h-2 bg-[#7C4DFF]/30 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-[#7C4DFF]/30 rounded-full animate-bounce" style={{animationDelay: "0.1s"}} />
                <div className="w-2 h-2 bg-[#7C4DFF]/30 rounded-full animate-bounce" style={{animationDelay: "0.2s"}} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-3 bg-white dark:bg-slate-800 border-t border-slate-100 dark:border-slate-700">
        <div className="flex gap-2">
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSend()} placeholder="Escribe tu pregunta..."
            className="flex-1 px-4 py-2.5 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-sm text-slate-700 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-[#7C4DFF]/40 transition-all" />
          <button onClick={handleSend} disabled={!input.trim() || isLoading}
            className="p-2.5 bg-[#7C4DFF] text-white rounded-xl hover:bg-[#6A3DE8] disabled:opacity-40 transition-all">
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  )
}