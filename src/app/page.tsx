'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Dashboard() {
  return (
    <div className="flex-1 overflow-auto">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-white">
            ¡Bienvenido a tu centro musical! 🎵
          </h1>
          <p className="text-slate-400 text-lg">
            Explora, organiza y reproduce tu música favorita
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-black/20 backdrop-blur-xl border-white/10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">
                Canciones Totales
              </CardTitle>
              <span className="text-2xl">🎵</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">247</div>
              <p className="text-xs text-slate-400">
                +12 desde la semana pasada
              </p>
            </CardContent>
          </Card>

          <Card className="bg-black/20 backdrop-blur-xl border-white/10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">
                Playlists
              </CardTitle>
              <span className="text-2xl">📝</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">8</div>
              <p className="text-xs text-slate-400">
                +2 creadas este mes
              </p>
            </CardContent>
          </Card>

          <Card className="bg-black/20 backdrop-blur-xl border-white/10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">
                Tiempo Total
              </CardTitle>
              <span className="text-2xl">⏰</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">18h 43m</div>
              <p className="text-xs text-slate-400">
                De música disponible
              </p>
            </CardContent>
          </Card>

          <Card className="bg-black/20 backdrop-blur-xl border-white/10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">
                Archivos Subidos
              </CardTitle>
              <span className="text-2xl">📁</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">89</div>
              <p className="text-xs text-slate-400">
                134.7 MB en total
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Acciones Rápidas */}
          <Card className="bg-black/20 backdrop-blur-xl border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Acciones Rápidas</CardTitle>
              <CardDescription className="text-slate-400">
                Accede rápidamente a las funciones principales
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/search">
                <Button className="w-full justify-start bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/30">
                  <span className="mr-3 text-xl">🔍</span>
                  Buscar música en YouTube
                </Button>
              </Link>
              
              <Link href="/library">
                <Button className="w-full justify-start bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30">
                  <span className="mr-3 text-xl">📁</span>
                  Subir archivos de música
                </Button>
              </Link>
              
              <Link href="/playlists">
                <Button className="w-full justify-start bg-green-600/20 hover:bg-green-600/30 text-green-300 border border-green-500/30">
                  <span className="mr-3 text-xl">➕</span>
                  Crear nueva playlist
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Reproducidos Recientemente */}
          <Card className="bg-black/20 backdrop-blur-xl border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Reproducidos Recientemente</CardTitle>
              <CardDescription className="text-slate-400">
                Tus últimas canciones escuchadas
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { title: "Bohemian Rhapsody", artist: "Queen", type: "youtube" },
                { title: "Hotel California", artist: "Eagles", type: "uploaded" },
                { title: "Imagine", artist: "John Lennon", type: "youtube" },
                { title: "Mi Canción Personal", artist: "Artista Local", type: "uploaded" }
              ].map((track, index) => (
                <div key={index} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center text-white text-sm">
                    {track.type === 'youtube' ? '📺' : '🎵'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium truncate">
                      {track.title}
                    </p>
                    <p className="text-slate-400 text-xs truncate">
                      {track.artist}
                    </p>
                  </div>
                  <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white">
                    ▶️
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Playlists Destacadas */}
        <Card className="bg-black/20 backdrop-blur-xl border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Tus Playlists</CardTitle>
            <CardDescription className="text-slate-400">
              Explora tus colecciones musicales
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { name: "Rock Clásico", songs: 23, image: "🎸" },
                { name: "Chill Vibes", songs: 45, image: "🌙" },
                { name: "Workout Mix", songs: 32, image: "💪" },
                { name: "Favoritos", songs: 67, image: "❤️" }
              ].map((playlist, index) => (
                <Link key={index} href="/playlists">
                  <div className="group cursor-pointer">
                    <div className="aspect-square bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center text-4xl mb-3 group-hover:scale-105 transition-transform">
                      {playlist.image}
                    </div>
                    <h3 className="text-white font-medium text-sm truncate group-hover:text-purple-300 transition-colors">
                      {playlist.name}
                    </h3>
                    <p className="text-slate-400 text-xs">
                      {playlist.songs} canciones
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tips y Consejos */}
        <Card className="bg-gradient-to-r from-purple-600/10 to-pink-600/10 backdrop-blur-xl border-purple-500/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <span className="mr-2">💡</span>
              Consejo del día
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-purple-200">
              ¿Sabías que puedes crear playlists mixtas combinando canciones de YouTube 
              con tus archivos subidos? ¡Prueba a mezclar diferentes fuentes para crear 
              la experiencia musical perfecta!
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}