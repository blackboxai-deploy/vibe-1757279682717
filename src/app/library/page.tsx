'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { MusicLibrary } from '@/components/MusicLibrary'
import { FileUpload } from '@/components/FileUpload'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function LibraryPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('addedAt')
  const [filterBy, setFilterBy] = useState('all')

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-white">
            Mi Biblioteca Musical 📚
          </h1>
          <p className="text-slate-400 text-lg">
            Gestiona tu colección personal de música
          </p>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-black/20 backdrop-blur-xl border-white/10">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl mb-2">🎵</div>
                <div className="text-2xl font-bold text-white">89</div>
                <p className="text-xs text-slate-400">Archivos subidos</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/20 backdrop-blur-xl border-white/10">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl mb-2">📺</div>
                <div className="text-2xl font-bold text-white">158</div>
                <p className="text-xs text-slate-400">De YouTube</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/20 backdrop-blur-xl border-white/10">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl mb-2">💾</div>
                <div className="text-2xl font-bold text-white">134.7 MB</div>
                <p className="text-xs text-slate-400">Espacio usado</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/20 backdrop-blur-xl border-white/10">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl mb-2">⏰</div>
                <div className="text-2xl font-bold text-white">18h 43m</div>
                <p className="text-xs text-slate-400">Duración total</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs para Subir y Explorar */}
        <Tabs defaultValue="browse" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2 bg-black/20 backdrop-blur-xl">
            <TabsTrigger 
              value="browse"
              className="data-[state=active]:bg-purple-600/30 data-[state=active]:text-purple-300"
            >
              📁 Explorar Biblioteca
            </TabsTrigger>
            <TabsTrigger 
              value="upload"
              className="data-[state=active]:bg-purple-600/30 data-[state=active]:text-purple-300"
            >
              ⬆️ Subir Música
            </TabsTrigger>
          </TabsList>

          <TabsContent value="browse" className="space-y-4">
            {/* Controles de Búsqueda y Filtros */}
            <Card className="bg-black/20 backdrop-blur-xl border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Buscar y Filtrar</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4">
                  {/* Búsqueda */}
                  <div className="flex-1">
                    <Input
                      placeholder="Buscar por título, artista, álbum..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-black/40 border-white/20 text-white placeholder:text-slate-400 focus:border-purple-500"
                    />
                  </div>

                  {/* Filtrar por tipo */}
                  <Select value={filterBy} onValueChange={setFilterBy}>
                    <SelectTrigger className="w-full md:w-48 bg-black/40 border-white/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-black/90 border-white/20">
                      <SelectItem value="all">📂 Todas las canciones</SelectItem>
                      <SelectItem value="uploaded">🎵 Archivos subidos</SelectItem>
                      <SelectItem value="youtube">📺 YouTube</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* Ordenar por */}
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-full md:w-48 bg-black/40 border-white/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-black/90 border-white/20">
                      <SelectItem value="addedAt">📅 Fecha agregado</SelectItem>
                      <SelectItem value="title">🔤 Título</SelectItem>
                      <SelectItem value="artist">👨‍🎤 Artista</SelectItem>
                      <SelectItem value="album">💿 Álbum</SelectItem>
                      <SelectItem value="duration">⏰ Duración</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Filtros rápidos */}
                <div className="flex flex-wrap gap-2 mt-4">
                  <Button size="sm" variant="outline" className="bg-white/5 border-white/20 text-slate-300 hover:bg-white/10">
                    🎸 Rock
                  </Button>
                  <Button size="sm" variant="outline" className="bg-white/5 border-white/20 text-slate-300 hover:bg-white/10">
                    🎵 Pop
                  </Button>
                  <Button size="sm" variant="outline" className="bg-white/5 border-white/20 text-slate-300 hover:bg-white/10">
                    🎶 Jazz
                  </Button>
                  <Button size="sm" variant="outline" className="bg-white/5 border-white/20 text-slate-300 hover:bg-white/10">
                    🌊 Chill
                  </Button>
                  <Button size="sm" variant="outline" className="bg-white/5 border-white/20 text-slate-300 hover:bg-white/10">
                    🏃‍♂️ Workout
                  </Button>
                  <Button size="sm" variant="outline" className="bg-white/5 border-white/20 text-slate-300 hover:bg-white/10">
                    ❤️ Favoritos
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Vista de Biblioteca */}
            <MusicLibrary 
              searchQuery={searchQuery}
              sortBy={sortBy}
              filterBy={filterBy}
            />
          </TabsContent>

          <TabsContent value="upload" className="space-y-4">
            {/* Información de Formatos */}
            <Card className="bg-black/20 backdrop-blur-xl border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <span className="mr-2">ℹ️</span>
                  Formatos Compatibles
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div className="p-3 bg-white/5 rounded-lg">
                    <div className="text-2xl mb-1">🎵</div>
                    <div className="text-white text-sm font-medium">MP3</div>
                    <div className="text-xs text-slate-400">Más común</div>
                  </div>
                  <div className="p-3 bg-white/5 rounded-lg">
                    <div className="text-2xl mb-1">🌊</div>
                    <div className="text-white text-sm font-medium">WAV</div>
                    <div className="text-xs text-slate-400">Alta calidad</div>
                  </div>
                  <div className="p-3 bg-white/5 rounded-lg">
                    <div className="text-2xl mb-1">🔊</div>
                    <div className="text-white text-sm font-medium">FLAC</div>
                    <div className="text-xs text-slate-400">Sin pérdida</div>
                  </div>
                  <div className="p-3 bg-white/5 rounded-lg">
                    <div className="text-2xl mb-1">📱</div>
                    <div className="text-white text-sm font-medium">AAC</div>
                    <div className="text-xs text-slate-400">Móvil</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Componente de Upload */}
            <FileUpload />

            {/* Tips para Upload */}
            <Card className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 backdrop-blur-xl border-blue-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <span className="mr-2">💡</span>
                  Consejos para mejores resultados
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start space-x-3">
                  <span className="text-blue-400 text-lg">🏷️</span>
                  <div>
                    <p className="text-blue-200 font-medium">Metadata completa</p>
                    <p className="text-blue-300 text-sm">Archivos con información de título, artista y álbum se organizan mejor</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-blue-400 text-lg">📏</span>
                  <div>
                    <p className="text-blue-200 font-medium">Tamaño de archivo</p>
                    <p className="text-blue-300 text-sm">Recomendamos archivos menores a 20MB para mejor rendimiento</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-blue-400 text-lg">🔤</span>
                  <div>
                    <p className="text-blue-200 font-medium">Nombres claros</p>
                    <p className="text-blue-300 text-sm">Usa nombres descriptivos como "Artista - Cancion.mp3"</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}