'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'

const navigation = [
  {
    name: 'Inicio',
    href: '/',
    icon: '🏠'
  },
  {
    name: 'Buscar',
    href: '/search',
    icon: '🔍'
  },
  {
    name: 'Mi Biblioteca',
    href: '/library',
    icon: '📚'
  },
  {
    name: 'Playlists',
    href: '/playlists',
    icon: '🎶'
  }
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="hidden md:flex md:w-64 md:flex-col">
      <div className="flex flex-col flex-grow pt-5 bg-black/20 backdrop-blur-xl border-r border-white/10">
        {/* Logo */}
        <div className="flex items-center flex-shrink-0 px-6">
          <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            🎵 MiMúsica
          </div>
        </div>

        {/* Navegación Principal */}
        <nav className="flex-1 px-4 pt-8 pb-4 space-y-2">
          {navigation.map((item) => (
            <Link key={item.name} href={item.href}>
              <Button
                variant={pathname === item.href ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start text-left font-medium transition-all duration-200",
                  pathname === item.href 
                    ? "bg-purple-600/20 text-purple-300 border border-purple-500/30" 
                    : "text-slate-300 hover:text-white hover:bg-white/10"
                )}
              >
                <span className="mr-3 text-lg">{item.icon}</span>
                {item.name}
              </Button>
            </Link>
          ))}
        </nav>

        <Separator className="mx-4 bg-white/10" />

        {/* Playlists Recientes */}
        <div className="flex-1 px-4 pt-4">
          <h3 className="px-2 text-sm font-semibold text-slate-400 uppercase tracking-wider">
            Playlists Recientes
          </h3>
          <ScrollArea className="h-48 mt-3">
            <div className="space-y-1">
              {/* Aquí se mostrarán las playlists dinámicamente */}
              <Button 
                variant="ghost" 
                className="w-full justify-start text-slate-300 hover:text-white hover:bg-white/5 py-2 px-2"
              >
                <span className="mr-3">📝</span>
                <span className="truncate">Mi Primera Playlist</span>
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start text-slate-300 hover:text-white hover:bg-white/5 py-2 px-2"
              >
                <span className="mr-3">🎧</span>
                <span className="truncate">Música para Trabajar</span>
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start text-slate-300 hover:text-white hover:bg-white/5 py-2 px-2"
              >
                <span className="mr-3">🌙</span>
                <span className="truncate">Chill Nocturno</span>
              </Button>
            </div>
          </ScrollArea>
        </div>

        {/* Footer */}
        <div className="flex-shrink-0 p-4">
          <div className="text-xs text-slate-500 text-center">
            <div>Tu música, tus reglas</div>
            <div className="mt-1 text-slate-600">v1.0.0</div>
          </div>
        </div>
      </div>
    </div>
  )
}