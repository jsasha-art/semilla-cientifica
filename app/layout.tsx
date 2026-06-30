import type { Metadata } from "next"
import { ThemeProvider } from "./theme-provider"
import "./globals.css"

export const metadata: Metadata = {
  title: "Semilla Científica",
  description: "Inspira. Investiga. Impacta.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="font-sans antialiased">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}