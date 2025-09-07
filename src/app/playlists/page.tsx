'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { PlaylistManager } from '@/components/PlaylistManager'

export default function PlaylistsPage() {
  const [newPlaylistName, setNewPlaylistName] = useState('')
  const [newPlaylistDescription, setNewPlaylistDescription] = useState('')
  const [isCreating, setIsCreating] = useState(false)

  const handleCreatePlaylist = async () => {
    if (!newPlaylistName.trim()) return
    
    setIsCreating(true)
    
    try {
      // TODO: Implementar creación de playlist
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('Crear playlist:', { name: newPlaylistName, description: newPlaylistDescription })
      
      // Limpiar formulario
      setNewPlaylistName('')
      setNewPlaylistDescription('')
    } catch (error) {
      console.error('Error al crear playlist:', error)
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-white">
              Mis Playlists 🎶
            </h1>
            <p className="text-slate-400 text-lg">
              Crea y gestiona tus colecciones musicales
            </p>
          </div>

          {/* Botón Crear Nueva Playlist */}
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                ➕ Nueva Playlist
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-black/90 backdrop-blur-xl border-white/20 text-white">
              <DialogHeader>
                <DialogTitle className="text-white">Crear Nueva Playlist</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div>
                  <label className="text-sm font-medium text-slate-300 mb-2 block">
                    Nombre de la playlist *
                  </label>
                  <Input
                    placeholder="Mi nueva playlist..."
                    value={newPlaylistName}
                    onChange={(e) => setNewPlaylistName(e.target.value)}
                    className="bg-black/40 border-white/20 text-white placeholder:text-slate-400"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-slate-300 mb-2 block">
                    Descripción (opcional)
                  </label>
                  <Textarea
                    placeholder="Describe tu playlist..."
                    value={newPlaylistDescription}
                    onChange={(e) => setNewPlaylistDescription(e.target.value)}
                    className="bg-black/40 border-white/20 text-white placeholder:text-slate-400 resize-none"
                    rows={3}
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <DialogTrigger asChild>
                    <Button variant="ghost" className="text-slate-400 hover:text-white">
                      Cancelar
                    </Button>
                  </DialogTrigger>
                  <Button
                    onClick={handleCreatePlaylist}
                    disabled={!newPlaylistName.trim() || isCreating}
                    className="bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    {isCreating ? '⏳ Creando...' : '✨ Crear Playlist'}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Estadísticas de Playlists */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-black/20 backdrop-blur-xl border-white/10">
            <CardContent className="pt-6 text-center">
              <div className="text-3xl mb-2">📝</div>
              <div className="text-2xl font-bold text-white">8</div>
              <p className="text-xs text-slate-400">Playlists creadas</p>
            </CardContent>
          </Card>

          <Card className="bg-black/20 backdrop-blur-xl border-white/10">
            <CardContent className="pt-6 text-center">
              <div className="text-3xl mb-2">🎵</div>
              <div className="text-2xl font-bold text-white">247</div>
              <p className="text-xs text-slate-400">Canciones totales</p>
            </CardContent>
          </Card>

          <Card className="bg-black/20 backdrop-blur-xl border-white/10">
            <CardContent className="pt-6 text-center">
              <div className="text-3xl mb-2">⏰</div>
              <div className="text-2xl font-bold text-white">18h 43m</div>
              <p className="text-xs text-slate-400">Duración total</p>
            </CardContent>
          </Card>

          <Card className="bg-black/20 backdrop-blur-xl border-white/10">
            <CardContent className="pt-6 text-center">
              <div className="text-3xl mb-2">🌟</div>
              <div className="text-2xl font-bold text-white">3</div>
              <p className="text-xs text-slate-400">Favoritas</p>
            </CardContent>
          </Card>
        </div>

        {/* Acciones Rápidas */}
        <Card className="bg-black/20 backdrop-blur-xl border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Acciones Rápidas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button className="justify-start h-auto p-4 bg-gradient-to-r from-purple-600/20 to-pink-600/20 hover:from-purple-600/30 hover:to-pink-600/30 border border-purple-500/30 text-left">
                <div>
                  <div className="flex items-center mb-2">
                    <span className="text-xl mr-2">🎲</span>
                    <span className="font-medium text-purple-300">Playlist Aleatoria</span>
                  </div>
                  <p className="text-xs text-purple-200">
                    Crea una playlist con canciones aleatorias de tu biblioteca
                  </p>
                </div>
              </Button>

              <Button className="justify-start h-auto p-4 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 hover:from-blue-600/30 hover:to-cyan-600/30 border border-blue-500/30 text-left">
                <div>
                  <div className="flex items-center mb-2">
                    <span className="text-xl mr-2">🎵</span>
                    <span className="font-medium text-blue-300">Por Género</span>
                  </div>
                  <p className="text-xs text-blue-200">
                    Organiza automáticamente por géneros musicales
                  </p>
                </div>
              </Button>

              <Button className="justify-start h-auto p-4 bg-gradient-to-r from-green-600/20 to-emerald-600/20 hover:from-green-600/30 hover:to-emerald-600/30 border border-green-500/30 text-left">
                <div>
                  <div className="flex items-center mb-2">
                    <span className="text-xl mr-2">📥</span>
                    <span className="font-medium text-green-300">Importar M3U</span>
                  </div>
                  <p className="text-xs text-green-200">
                    Importa playlists desde archivos M3U o M3U8
                  </p>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Componente Gestor de Playlists */}
        <PlaylistManager />

        {/* Tips para Playlists */}
        <Card className="bg-gradient-to-r from-indigo-600/10 to-purple-600/10 backdrop-blur-xl border-indigo-500/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <span className="mr-2">💡</span>
              Consejos para crear playlists perfectas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <span className="text-indigo-400 text-lg">🎨</span>
                  <div>
                    <p className="text-indigo-200 font-medium">Tema coherente</p>
                    <p className="text-indigo-300 text-sm">Agrupa canciones por mood, actividad o género</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-indigo-400 text-lg">🔄</span>
                  <div>
                    <p className="text-indigo-200 font-medium">Flujo natural</p>
                    <p className="text-indigo-300 text-sm">Ordena las canciones para crear una experiencia fluida</p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <span className="text-indigo-400 text-lg">⏰</span>
                  <div>
                    <p className="text-indigo-200 font-medium">Duración adecuada</p>
                    <p className="text-indigo-300 text-sm">30-60 minutos es ideal para la mayoría de actividades</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-indigo-400 text-lg">🌊</span>
                  <div>
                    <p className="text-indigo-200 font-medium">Mezcla de fuentes</p>
                    <p className="text-indigo-300 text-sm">Combina YouTube y archivos propios para mayor variedad</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}