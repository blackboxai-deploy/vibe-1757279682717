import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from 'next-themes'
import { Sidebar } from '@/components/Sidebar'
import { AudioPlayer } from '@/components/AudioPlayer'

export const metadata: Metadata = {
  title: 'MiMúsica - Tu Centro Musical Personal',
  description: 'Organiza tu música, crea playlists y descubre contenido de YouTube',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="font-inter antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <div className="flex h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            {/* Sidebar */}
            <Sidebar />
            
            {/* Contenido Principal */}
            <main className="flex-1 flex flex-col min-w-0">
              {/* Área de Contenido */}
              <div className="flex-1 overflow-hidden">
                {children}
              </div>
              
              {/* Reproductor de Audio Fijo */}
              <AudioPlayer />
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}