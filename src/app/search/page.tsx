'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SearchYoutube } from '@/components/SearchYoutube'

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = async () => {
    if (!searchQuery.trim()) return
    setIsSearching(true)
    // La lógica de búsqueda se maneja en el componente SearchYoutube
    setTimeout(() => setIsSearching(false), 1000) // Mock delay
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-white">
            Buscar Música 🔍
          </h1>
          <p className="text-slate-400 text-lg">
            Encuentra tu música favorita en YouTube
          </p>
        </div>

        {/* Barra de Búsqueda */}
        <Card className="bg-black/20 backdrop-blur-xl border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Buscar en YouTube</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-3">
              <div className="flex-1">
                <Input
                  placeholder="Busca canciones, artistas, álbumes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="bg-black/40 border-white/20 text-white placeholder:text-slate-400 focus:border-purple-500"
                />
              </div>
              <Button 
                onClick={handleSearch}
                disabled={!searchQuery.trim() || isSearching}
                className="bg-purple-600 hover:bg-purple-700 text-white px-8"
              >
                {isSearching ? (
                  <span className="animate-spin">🔄</span>
                ) : (
                  '🔍 Buscar'
                )}
              </Button>
            </div>
            
            {/* Sugerencias de búsqueda */}
            <div className="mt-4">
              <p className="text-sm text-slate-400 mb-2">Búsquedas populares:</p>
              <div className="flex flex-wrap gap-2">
                {[
                  'Rock clásico',
                  'Pop español',
                  'Jazz moderno',
                  'Reggaeton 2024',
                  'Música relajante',
                  'Indie rock'
                ].map((suggestion) => (
                  <Button
                    key={suggestion}
                    variant="outline"
                    size="sm"
                    onClick={() => setSearchQuery(suggestion)}
                    className="bg-white/5 border-white/20 text-slate-300 hover:bg-white/10 hover:text-white text-xs"
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Filtros de Búsqueda */}
        <Card className="bg-black/20 backdrop-blur-xl border-white/10">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="text-white font-medium">Filtros de búsqueda</div>
              <div className="flex space-x-2">
                <Button size="sm" variant="secondary" className="bg-purple-600/20 text-purple-300 border border-purple-500/30">
                  🎵 Música
                </Button>
                <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white">
                  🎬 Videos
                </Button>
                <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white">
                  📝 Listas
                </Button>
                <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white">
                  ⏰ Duración
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Componente de Resultados */}
        <SearchYoutube query={searchQuery} />

        {/* Estado Inicial */}
        {!searchQuery && (
          <Card className="bg-black/20 backdrop-blur-xl border-white/10">
            <CardContent className="text-center py-12">
              <div className="text-6xl mb-4">🎵</div>
              <h3 className="text-xl font-semibold text-white mb-2">
                ¿Qué quieres escuchar?
              </h3>
              <p className="text-slate-400 mb-6">
                Escribe el nombre de una canción, artista o álbum para comenzar tu búsqueda
              </p>
              <div className="space-y-3 max-w-md mx-auto">
                <div className="text-left">
                  <div className="text-sm text-slate-300 mb-1">Ejemplos de búsqueda:</div>
                  <div className="text-xs text-slate-400 space-y-1">
                    <div>• "Bohemian Rhapsody Queen"</div>
                    <div>• "Luis Fonsi Despacito"</div>
                    <div>• "Imagine Dragons Believer"</div>
                    <div>• "Shakira La La La"</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Historial de Búsquedas */}
        <Card className="bg-black/20 backdrop-blur-xl border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <span className="mr-2">📝</span>
              Búsquedas recientes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { query: 'Queen Greatest Hits', results: '1,234 resultados' },
                { query: 'Manu Chao', results: '856 resultados' },
                { query: 'Lo-fi Hip Hop', results: '2,156 resultados' },
                { query: 'Metallica', results: '3,421 resultados' }
              ].map((item, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  onClick={() => setSearchQuery(item.query)}
                  className="flex flex-col items-start p-4 h-auto bg-white/5 hover:bg-white/10 border border-white/10"
                >
                  <div className="text-white text-sm font-medium mb-1 truncate w-full">
                    {item.query}
                  </div>
                  <div className="text-slate-400 text-xs">
                    {item.results}
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}