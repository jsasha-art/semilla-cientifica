import { NextRequest } from "next/server"

const respuestas: Record<string, string> = {
  hipotesis: "🎯 Una hipótesis es una afirmación que puede comprobarse. Tipos:\n• Hi: Hipótesis de investigación\n• H0: Hipótesis nula\n• Ha: Hipótesis alternativa\n\nEjemplo:\nHi: El ejercicio reduce la presión arterial en adultos mayores.",
  problema: "📋 Para formular un problema:\n1. Identifica el tema\n2. Delimita población/tiempo/lugar\n3. Redacta como pregunta\n\nEj: ¿Cuál es la prevalencia de diabetes tipo 2 en adultos mayores de 60 años en Lima, 2024?",
  apa: "📝 Normas APA 7ª edición:\n• Cita: (Autor, año)\n• Referencia: Autor, A. (año). Título. Editorial.\n• Márgenes: 2.54 cm\n• Fuente: Times New Roman 12 o Arial 11",
  spss: "📊 SPSS es un software estadístico. Pasos básicos:\n1. Importar datos\n2. Analyze → Descriptive Statistics\n3. Elegir prueba según tus variables\n\n¿Necesitas ayuda con alguna prueba específica?",
}

export async function POST(req: NextRequest) {
  const { message } = await req.json()
  const msg = message.toLowerCase()
  
  let reply = "¡Gracias por tu pregunta! 🤔\n\nComo asistente de investigación, puedo ayudarte con metodología, bioestadística, SPSS, normas APA, protocolos y más. ¿Puedes darme más detalles?"
  
  if (msg.includes("hipótesis")) reply = respuestas.hipotesis
  else if (msg.includes("problema")) reply = respuestas.problema
  else if (msg.includes("apa") || msg.includes("vancouver")) reply = respuestas.apa
  else if (msg.includes("spss") || msg.includes("estadística")) reply = respuestas.spss
  else if (msg.includes("hola")) reply = "¡Hola! 👋 Soy Semillita, tu asistente de investigación. Pregúntame lo que necesites sobre metodología, estadística, normas APA, protocolos y más."

  return Response.json({ reply })
}