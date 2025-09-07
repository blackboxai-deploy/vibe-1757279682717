'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { TrackItem } from '@/components/TrackItem'
import type { Track } from '@/types/music'

interface MusicLibraryProps {
  searchQuery: string
  sortBy: string
  filterBy: string
}

export function MusicLibrary({ searchQuery, sortBy, filterBy }: MusicLibraryProps) {
  const [tracks, setTracks] = useState<Track[]>([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list')

  useEffect(() => {
    // Simular carga de datos
    const loadTracks = async () => {
      setLoading(true)
      await new Promise(resolve => setTimeout(resolve, 800))
      
      // Datos mock
      const mockTracks: Track[] = [
        {
          id: '1',
          title: 'Bohemian Rhapsody',
          artist: 'Queen',
          album: 'A Night at the Opera',
          duration: 355, // 5:55
          type: 'uploaded',
          url: '/uploads/bohemian-rhapsody.mp3',
          thumbnail: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/340d10b6-af63-4e04-8636-c8790cf3336a.png',
          addedAt: new Date('2023-12-01'),
          fileSize: 8500000,
          format: 'mp3'
        },
        {
          id: '2',
          title: 'Hotel California',
          artist: 'Eagles',
          album: 'Hotel California',
          duration: 391, // 6:31
          type: 'youtube',
          url: 'BciS5krYL80',
          thumbnail: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/266aeb12-e728-4328-80ee-f37fe31feab7.png',
          addedAt: new Date('2023-11-28')
        },
        {
          id: '3',
          title: 'Stairway to Heaven',
          artist: 'Led Zeppelin',
          album: 'Led Zeppelin IV',
          duration: 482, // 8:02
          type: 'uploaded',
          url: '/uploads/stairway-to-heaven.flac',
          thumbnail: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/bd1e7a6a-e2dd-4b88-bc31-6e4ead398a8a.png',
          addedAt: new Date('2023-11-25'),
          fileSize: 15200000,
          format: 'flac'
        },
        {
          id: '4',
          title: 'Imagine',
          artist: 'John Lennon',
          album: 'Imagine',
          duration: 183, // 3:03
          type: 'youtube',
          url: 'YkgkThdzX-8',
          thumbnail: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/7c083bab-45e1-4ad9-a684-4ed0bd7a4671.png',
          addedAt: new Date('2023-11-20')
        },
        {
          id: '5',
          title: 'Sweet Child O Mine',
          artist: 'Guns N Roses',
          album: 'Appetite for Destruction',
          duration: 356, // 5:56
          type: 'uploaded',
          url: '/uploads/sweet-child.mp3',
          thumbnail: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/bd828557-d951-4939-b5df-68a206afe559.png',
          addedAt: new Date('2023-11-15'),
          fileSize: 8800000,
          format: 'mp3'
        },
        {
          id: '6',
          title: 'Billie Jean',
          artist: 'Michael Jackson',
          album: 'Thriller',
          duration: 294, // 4:54
          type: 'youtube',
          url: 'Zi_XLOBDo_Y',
          thumbnail: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/58f08a08-1b2c-48b5-9137-6a115a6e2ecd.png',
          addedAt: new Date('2023-11-10')
        },
        {
          id: '7',
          title: 'Comfortably Numb',
          artist: 'Pink Floyd',
          album: 'The Wall',
          duration: 382, // 6:22
          type: 'uploaded',
          url: '/uploads/comfortably-numb.wav',
          thumbnail: 'https://placehold.co/300x300?text=Pink+Floyd+The+Wall',
          addedAt: new Date('2023-11-05'),
          fileSize: 42000000,
          format: 'wav'
        },
        {
          id: '8',
          title: 'Yesterday',
          artist: 'The Beatles',
          album: 'Help!',
          duration: 125, // 2:05
          type: 'youtube',
          url: 'NrgmdVjbHzI',
          thumbnail: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/ba25e139-746c-4cb0-907c-c55cf60c260a.png',
          addedAt: new Date('2023-10-30')
        }
      ]
      
      setTracks(mockTracks)
      setLoading(false)
    }

    loadTracks()
  }, [])

  // Filtrar y ordenar tracks
  const filteredTracks = tracks
    .filter(track => {
      const matchesSearch = !searchQuery || 
        track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        track.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
        track.album?.toLowerCase().includes(searchQuery.toLowerCase())
      
      const matchesFilter = filterBy === 'all' || track.type === filterBy
      
      return matchesSearch && matchesFilter
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title)
        case 'artist':
          return a.artist.localeCompare(b.artist)
        case 'album':
          return (a.album || '').localeCompare(b.album || '')
        case 'duration':
          return b.duration - a.duration
        case 'addedAt':
        default:
          return new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime()
      }
    })

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return ''
    const mb = bytes / (1024 * 1024)
    return `${mb.toFixed(1)} MB`
  }

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  if (loading) {
    return (
      <Card className="bg-black/20 backdrop-blur-xl border-white/10">
        <CardContent className="pt-6">
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center space-x-4 p-3 animate-pulse">
                <div className="w-12 h-12 bg-white/10 rounded-lg"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-white/10 rounded w-3/4"></div>
                  <div className="h-3 bg-white/10 rounded w-1/2"></div>
                </div>
                <div className="w-16 h-4 bg-white/10 rounded"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {/* Controles de Vista */}
      <Card className="bg-black/20 backdrop-blur-xl border-white/10">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="text-white">
              <span className="font-semibold">{filteredTracks.length}</span> 
              <span className="text-slate-400 ml-1">
                {filteredTracks.length === 1 ? 'canción encontrada' : 'canciones encontradas'}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                size="sm"
                variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                onClick={() => setViewMode('list')}
                className="text-slate-300 hover:text-white"
              >
                📄 Lista
              </Button>
              <Button
                size="sm"
                variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                onClick={() => setViewMode('grid')}
                className="text-slate-300 hover:text-white"
              >
                ⊞ Cuadrícula
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Canciones */}
      {filteredTracks.length === 0 ? (
        <Card className="bg-black/20 backdrop-blur-xl border-white/10">
          <CardContent className="text-center py-12">
            <div className="text-6xl mb-4">🎵</div>
            <h3 className="text-xl font-semibold text-white mb-2">
              No se encontraron canciones
            </h3>
            <p className="text-slate-400 mb-6">
              {searchQuery 
                ? `No hay resultados para "${searchQuery}"` 
                : 'Tu biblioteca está vacía. Comienza subiendo música o agregando canciones de YouTube.'
              }
            </p>
            <div className="space-x-3">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                ⬆️ Subir Música
              </Button>
              <Button variant="outline" className="bg-white/5 border-white/20 text-slate-300 hover:bg-white/10">
                🔍 Buscar en YouTube
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="bg-black/20 backdrop-blur-xl border-white/10">
          <CardContent className="pt-6">
            <div className={`${viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' 
              : 'space-y-2'
            }`}>
              {filteredTracks.map((track, index) => (
                <TrackItem
                  key={track.id}
                  track={track}
                  index={index}
                  viewMode={viewMode}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Información de Almacenamiento */}
      {filteredTracks.length > 0 && (
        <Card className="bg-black/20 backdrop-blur-xl border-white/10">
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-white">
                  {filteredTracks.filter(t => t.type === 'uploaded').length}
                </div>
                <div className="text-xs text-slate-400">Archivos propios</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">
                  {filteredTracks.filter(t => t.type === 'youtube').length}
                </div>
                <div className="text-xs text-slate-400">De YouTube</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">
                  {formatFileSize(
                    filteredTracks
                      .filter(t => t.fileSize)
                      .reduce((sum, t) => sum + (t.fileSize || 0), 0)
                  )}
                </div>
                <div className="text-xs text-slate-400">Espacio usado</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">
                  {formatDuration(
                    filteredTracks.reduce((sum, t) => sum + t.duration, 0)
                  )}
                </div>
                <div className="text-xs text-slate-400">Duración total</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}