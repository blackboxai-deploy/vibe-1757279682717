'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import type { Playlist } from '@/types/music'

export function PlaylistManager() {
  const [playlists, setPlaylists] = useState<Playlist[]>([
    {
      id: '1',
      name: 'Rock Clásico',
      description: 'Los mejores clásicos del rock de todos los tiempos',
      tracks: [], // Se cargarían las canciones aquí
      createdAt: new Date('2023-11-01'),
      updatedAt: new Date('2023-12-01'),
      thumbnail: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/d43a07f4-df52-4124-ae72-5255237a7aee.png',
      isPublic: false
    },
    {
      id: '2',
      name: 'Chill Vibes',
      description: 'Música relajante para trabajar y estudiar',
      tracks: [],
      createdAt: new Date('2023-10-15'),
      updatedAt: new Date('2023-11-28'),
      thumbnail: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/cb4c0661-7931-49aa-bfbd-db45fa573dad.png',
      isPublic: true
    },
    {
      id: '3',
      name: 'Workout Mix',
      description: 'Energía máxima para tus entrenamientos',
      tracks: [],
      createdAt: new Date('2023-09-20'),
      updatedAt: new Date('2023-11-25'),
      thumbnail: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/ac0e777c-d64d-48b2-a2ca-c44789bc853f.png',
      isPublic: false
    },
    {
      id: '4',
      name: 'Favoritos de Siempre',
      description: 'Mis canciones favoritas de toda la vida',
      tracks: [],
      createdAt: new Date('2023-08-10'),
      updatedAt: new Date('2023-12-05'),
      thumbnail: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/dfe0ca38-85a9-446b-8a3e-1f69a222720a.png',
      isPublic: false
    },
    {
      id: '5',
      name: 'Pop Español',
      description: 'Lo mejor del pop en español',
      tracks: [],
      createdAt: new Date('2023-07-05'),
      updatedAt: new Date('2023-11-20'),
      thumbnail: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/2b3287ba-9325-461b-9ba5-80ceef4eb7ab.png',
      isPublic: true
    },
    {
      id: '6',
      name: 'Jazz Nocturno',
      description: 'Jazz suave para las noches',
      tracks: [],
      createdAt: new Date('2023-06-12'),
      updatedAt: new Date('2023-11-15'),
      thumbnail: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/fa1694d9-1d7e-4818-8a7a-f0a116043fe8.png',
      isPublic: false
    }
  ])

  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(null)
  const [showDetails, setShowDetails] = useState(false)

  const handlePlayPlaylist = (playlist: Playlist) => {
    console.log('Reproducir playlist:', playlist.name)
    // TODO: Implementar reproducción de playlist
  }

  const handleEditPlaylist = (playlist: Playlist) => {
    console.log('Editar playlist:', playlist.name)
    // TODO: Implementar edición de playlist
  }

  const handleDeletePlaylist = (playlist: Playlist) => {
    console.log('Eliminar playlist:', playlist.name)
    // TODO: Implementar eliminación de playlist
    setPlaylists(prev => prev.filter(p => p.id !== playlist.id))
  }

  const handleExportPlaylist = (playlist: Playlist) => {
    console.log('Exportar playlist:', playlist.name)
    // TODO: Implementar exportación de playlist
  }

  const handleSharePlaylist = (playlist: Playlist) => {
    console.log('Compartir playlist:', playlist.name)
    // TODO: Implementar compartir playlist
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getPlaylistIcon = (name: string) => {
    const lowerName = name.toLowerCase()
    if (lowerName.includes('rock')) return '🎸'
    if (lowerName.includes('chill') || lowerName.includes('relax')) return '🌙'
    if (lowerName.includes('workout') || lowerName.includes('gym')) return '💪'
    if (lowerName.includes('favorito')) return '❤️'
    if (lowerName.includes('pop')) return '🎵'
    if (lowerName.includes('jazz')) return '🎷'
    if (lowerName.includes('electronic')) return '🎧'
    if (lowerName.includes('classic')) return '🎼'
    return '📝'
  }

  return (
    <div className="space-y-6">
      {/* Lista de Playlists */}
      <Card className="bg-black/20 backdrop-blur-xl border-white/10">
        <CardHeader>
          <CardTitle className="text-white">Tus Playlists</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {playlists.map((playlist) => (
              <div
                key={playlist.id}
                className="group bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-all duration-200 cursor-pointer"
              >
                {/* Thumbnail */}
                <div className="aspect-square bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg mb-4 relative overflow-hidden">
                  <img
                    src={playlist.thumbnail}
                    alt={`Playlist ${playlist.name}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.style.display = 'none'
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center text-6xl bg-gradient-to-br from-purple-600 to-pink-600">
                    {getPlaylistIcon(playlist.name)}
                  </div>
                  
                  {/* Play button overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                    <Button
                      size="lg"
                      onClick={() => handlePlayPlaylist(playlist)}
                      className="w-16 h-16 rounded-full bg-white text-black hover:bg-gray-200 text-2xl"
                    >
                      ▶️
                    </Button>
                  </div>

                  {/* Public badge */}
                  {playlist.isPublic && (
                    <div className="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded-full">
                      🌍 Pública
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="space-y-2">
                  <h3
                    className="text-white font-semibold text-lg truncate cursor-pointer hover:text-purple-300"
                    onClick={() => {
                      setSelectedPlaylist(playlist)
                      setShowDetails(true)
                    }}
                    title={playlist.name}
                  >
                    {playlist.name}
                  </h3>
                  
                  <p className="text-slate-400 text-sm line-clamp-2" title={playlist.description}>
                    {playlist.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>{playlist.tracks.length} canciones</span>
                    <span>Actualizada {formatDate(playlist.updatedAt)}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    size="sm"
                    onClick={() => handlePlayPlaylist(playlist)}
                    className="bg-green-600/20 hover:bg-green-600/30 text-green-300 border border-green-500/30"
                  >
                    ▶️ Reproducir
                  </Button>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-slate-400 hover:text-white"
                      >
                        ⋯
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-black/90 border-white/20">
                      <DropdownMenuItem 
                        onClick={() => handleEditPlaylist(playlist)}
                        className="text-white hover:bg-white/10"
                      >
                        ✏️ Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleSharePlaylist(playlist)}
                        className="text-white hover:bg-white/10"
                      >
                        🔗 Compartir
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleExportPlaylist(playlist)}
                        className="text-white hover:bg-white/10"
                      >
                        📥 Exportar
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleDeletePlaylist(playlist)}
                        className="text-red-400 hover:bg-red-600/20"
                      >
                        🗑️ Eliminar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}

            {/* Crear nueva playlist card */}
            <div className="bg-white/5 border-2 border-dashed border-white/20 rounded-xl p-4 flex flex-col items-center justify-center text-center hover:bg-white/10 hover:border-purple-500/50 transition-all duration-200 cursor-pointer min-h-[300px]">
              <div className="text-4xl mb-3">➕</div>
              <h3 className="text-white font-medium mb-2">Crear Nueva Playlist</h3>
              <p className="text-slate-400 text-sm">
                Comienza una nueva colección musical
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Modal de Detalles de Playlist */}
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="bg-black/90 backdrop-blur-xl border-white/20 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center">
              <span className="mr-3 text-2xl">{selectedPlaylist ? getPlaylistIcon(selectedPlaylist.name) : '📝'}</span>
              {selectedPlaylist?.name}
            </DialogTitle>
          </DialogHeader>
          
          {selectedPlaylist && (
            <div className="space-y-6 pt-4">
              {/* Info básica */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-slate-300 mb-1">Creada</h4>
                  <p className="text-white">{formatDate(selectedPlaylist.createdAt)}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-slate-300 mb-1">Última actualización</h4>
                  <p className="text-white">{formatDate(selectedPlaylist.updatedAt)}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-slate-300 mb-1">Canciones</h4>
                  <p className="text-white">{selectedPlaylist.tracks.length}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-slate-300 mb-1">Visibilidad</h4>
                  <p className="text-white">
                    {selectedPlaylist.isPublic ? '🌍 Pública' : '🔒 Privada'}
                  </p>
                </div>
              </div>

              {/* Descripción */}
              <div>
                <h4 className="text-sm font-medium text-slate-300 mb-2">Descripción</h4>
                <p className="text-white bg-white/5 p-3 rounded-lg">
                  {selectedPlaylist.description || 'Sin descripción'}
                </p>
              </div>

              {/* Acciones */}
              <div className="flex space-x-3 pt-4">
                <Button
                  onClick={() => handlePlayPlaylist(selectedPlaylist)}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  ▶️ Reproducir Todo
                </Button>
                <Button
                  onClick={() => handleEditPlaylist(selectedPlaylist)}
                  variant="outline"
                  className="bg-white/5 border-white/20 text-white hover:bg-white/10"
                >
                  ✏️ Editar
                </Button>
                <Button
                  onClick={() => handleExportPlaylist(selectedPlaylist)}
                  variant="outline"
                  className="bg-white/5 border-white/20 text-white hover:bg-white/10"
                >
                  📥 Exportar
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Playlist vacía */}
      {playlists.length === 0 && (
        <Card className="bg-black/20 backdrop-blur-xl border-white/10">
          <CardContent className="text-center py-12">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-white mb-2">
              No tienes playlists aún
            </h3>
            <p className="text-slate-400 mb-6">
              Crea tu primera playlist para organizar tu música favorita
            </p>
            <Button className="bg-purple-600 hover:bg-purple-700 text-white">
              ➕ Crear Mi Primera Playlist
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}