import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Altijd Samen — Jullie Trouwwebsite",
  description: "Ontwerp in minuten jullie droomtrouwwebsite. Kies een template, pas alles aan, en deel met jullie gasten.",
  openGraph: {
    title: "Altijd Samen — Jullie Trouwwebsite",
    description: "Ontwerp in minuten jullie droomtrouwwebsite.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="nl">
      <body className="min-h-screen bg-background antialiased">
        {children}
      </body>
    </html>
  )
}
