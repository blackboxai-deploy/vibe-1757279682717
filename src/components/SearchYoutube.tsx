'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import type { YouTubeSearchResult } from '@/types/music'

interface SearchYoutubeProps {
  query: string
}

export function SearchYoutube({ query }: SearchYoutubeProps) {
  const [results, setResults] = useState<YouTubeSearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }

    const searchYouTube = async () => {
      setLoading(true)
      setError(null)
      
      try {
        // Por ahora simulamos resultados hasta implementar la API real
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        const mockResults: YouTubeSearchResult[] = [
          {
            videoId: 'dQw4w9WgXcQ',
            title: `${query} - Canción Original`,
            channelTitle: 'Artista Oficial',
            description: 'Video musical oficial de la canción...',
            thumbnails: {
              default: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/b4a9e0fe-7cdb-4585-ac61-7b216dfdb4e3.png',
              medium: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/0c61892f-a7de-4c94-93d7-96999cd07447.png',
              high: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/7dc2b640-b381-407b-8c60-740a70d8898c.png'
            },
            duration: 'PT4M13S',
            publishedAt: '2023-01-15T10:00:00Z'
          },
          {
            videoId: 'abc123def456',
            title: `${query} - Versión Acústica`,
            channelTitle: 'Canal Música',
            description: 'Versión acústica en vivo de la popular canción...',
            thumbnails: {
              default: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/02038136-b4b9-4fdc-b481-80e1dffb64db.png',
              medium: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/3d04b588-37d5-476a-8b9f-aea3fc244dba.png',
              high: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/16347eae-7dae-4d8e-b956-2c6494aba318.png'
            },
            duration: 'PT3M45S',
            publishedAt: '2023-02-20T15:30:00Z'
          },
          {
            videoId: 'xyz789uvw012',
            title: `${query} - Cover por Artista Indie`,
            channelTitle: 'Indie Music Channel',
            description: 'Un increíble cover de esta famosa canción...',
            thumbnails: {
              default: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/f34d45a5-ac64-4b71-95c9-7cb23655cb8b.png',
              medium: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/37ca5f64-0e52-463b-a7bd-400ae06efef9.png',
              high: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/e7f19aef-f163-42af-b74f-9e6b2b7edb76.png'
            },
            duration: 'PT4M02S',
            publishedAt: '2023-03-10T09:15:00Z'
          },
          {
            videoId: 'mno345pqr678',
            title: `${query} - Remix Electronic`,
            channelTitle: 'Electronic Beats',
            description: 'Remix electrónico de alta energía...',
            thumbnails: {
              default: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/32d2e9cf-87da-4911-bdb6-2fa329a51791.png',
              medium: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/5f58cc15-a39f-4b2c-9dc9-9fcd4a167745.png',
              high: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/ce430ab9-68e1-46e8-bc3e-9e6df1b0f1c0.png'
            },
            duration: 'PT5M20S',
            publishedAt: '2023-04-05T20:45:00Z'
          },
          {
            videoId: 'ghi901jkl234',
            title: `${query} - Piano Solo`,
            channelTitle: 'Piano Classics',
            description: 'Hermosa interpretación solo de piano...',
            thumbnails: {
              default: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/bc6a2099-52b6-4f82-aca5-c5bb3eebf431.png',
              medium: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/243028ec-0e84-4516-8102-d2006956a4f9.png',
              high: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/e129dc34-65d0-4062-96af-84ce4c1fce54.png'
            },
            duration: 'PT3M30S',
            publishedAt: '2023-05-12T14:20:00Z'
          }
        ]
        
        setResults(mockResults)
      } catch (err) {
        setError('Error al buscar música. Inténtalo de nuevo.')
        console.error('Error searching YouTube:', err)
      } finally {
        setLoading(false)
      }
    }

    searchYouTube()
  }, [query])

  const formatDuration = (duration: string) => {
    // Convierte formato YouTube PT4M13S a 4:13
    const match = duration.match(/PT(?:(\d+)M)?(?:(\d+)S)?/)
    if (!match) return '0:00'
    
    const minutes = parseInt(match[1] || '0')
    const seconds = parseInt(match[2] || '0')
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const handleAddToLibrary = (result: YouTubeSearchResult) => {
    // TODO: Implementar lógica para agregar a biblioteca
    console.log('Agregando a biblioteca:', result.title)
  }

  const handleAddToPlaylist = (result: YouTubeSearchResult) => {
    // TODO: Implementar lógica para agregar a playlist
    console.log('Agregando a playlist:', result.title)
  }

  const handlePlayNow = (result: YouTubeSearchResult) => {
    // TODO: Implementar lógica para reproducir ahora
    console.log('Reproduciendo:', result.title)
  }

  if (!query.trim()) {
    return null
  }

  return (
    <Card className="bg-black/20 backdrop-blur-xl border-white/10">
      <CardContent className="pt-6">
        <div className="mb-4">
          <h3 className="text-white font-semibold text-lg">
            Resultados para "{query}"
          </h3>
          <p className="text-slate-400 text-sm">
            {loading ? 'Buscando...' : `${results.length} canciones encontradas`}
          </p>
        </div>

        {loading && (
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center space-x-4 p-3">
                <Skeleton className="w-16 h-16 rounded-lg bg-white/10" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-3/4 bg-white/10" />
                  <Skeleton className="h-3 w-1/2 bg-white/10" />
                </div>
                <div className="flex space-x-2">
                  <Skeleton className="h-8 w-8 rounded bg-white/10" />
                  <Skeleton className="h-8 w-8 rounded bg-white/10" />
                  <Skeleton className="h-8 w-8 rounded bg-white/10" />
                </div>
              </div>
            ))}
          </div>
        )}

        {error && (
          <div className="text-center py-8">
            <div className="text-red-400 text-4xl mb-2">⚠️</div>
            <p className="text-red-300 mb-2">Error de búsqueda</p>
            <p className="text-slate-400 text-sm">{error}</p>
          </div>
        )}

        {!loading && !error && results.length === 0 && query.trim() && (
          <div className="text-center py-8">
            <div className="text-slate-400 text-4xl mb-2">🔍</div>
            <p className="text-slate-300 mb-2">No se encontraron resultados</p>
            <p className="text-slate-400 text-sm">
              Prueba con términos de búsqueda diferentes
            </p>
          </div>
        )}

        {!loading && !error && results.length > 0 && (
          <div className="space-y-3">
            {results.map((result) => (
              <div
                key={result.videoId}
                className="flex items-center space-x-4 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors group"
              >
                {/* Thumbnail */}
                <div className="relative w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex-shrink-0 overflow-hidden">
                  <img
                    src={result.thumbnails.medium}
                    alt={result.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.style.display = 'none'
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold bg-gradient-to-br from-purple-600 to-pink-600">
                    📺
                  </div>
                  <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded">
                    {formatDuration(result.duration)}
                  </div>
                </div>

                {/* Información */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-white font-medium text-sm truncate">
                    {result.title}
                  </h4>
                  <p className="text-slate-400 text-xs truncate">
                    {result.channelTitle}
                  </p>
                  <p className="text-slate-500 text-xs truncate mt-1">
                    {result.description.substring(0, 100)}...
                  </p>
                </div>

                {/* Acciones */}
                <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handlePlayNow(result)}
                    className="text-green-400 hover:text-green-300 hover:bg-green-600/20"
                    title="Reproducir ahora"
                  >
                    ▶️
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleAddToLibrary(result)}
                    className="text-blue-400 hover:text-blue-300 hover:bg-blue-600/20"
                    title="Agregar a biblioteca"
                  >
                    ➕
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleAddToPlaylist(result)}
                    className="text-purple-400 hover:text-purple-300 hover:bg-purple-600/20"
                    title="Agregar a playlist"
                  >
                    📝
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && !error && results.length > 0 && (
          <div className="mt-6 text-center">
            <Button 
              variant="outline"
              className="bg-white/5 border-white/20 text-slate-300 hover:bg-white/10 hover:text-white"
            >
              Cargar más resultados
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}