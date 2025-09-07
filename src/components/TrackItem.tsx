'use client'

import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import type { Track } from '@/types/music'

interface TrackItemProps {
  track: Track
  index: number
  viewMode?: 'list' | 'grid'
}

export function TrackItem({ track, index, viewMode = 'list' }: TrackItemProps) {
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return ''
    const mb = bytes / (1024 * 1024)
    return `${mb.toFixed(1)} MB`
  }

  const getTypeIcon = (type: 'youtube' | 'uploaded') => {
    return type === 'youtube' ? '📺' : '🎵'
  }

  const getFormatIcon = (format?: string) => {
    switch (format?.toLowerCase()) {
      case 'mp3': return '🎵'
      case 'wav': return '🌊'
      case 'flac': return '🔊'
      case 'aac': return '📱'
      default: return '🎵'
    }
  }

  const handlePlay = () => {
    console.log('Reproducir:', track.title)
    // TODO: Implementar reproducción
  }

  const handleAddToPlaylist = () => {
    console.log('Agregar a playlist:', track.title)
    // TODO: Implementar agregar a playlist
  }

  const handleDownload = () => {
    if (track.type === 'uploaded') {
      console.log('Descargar:', track.title)
      // TODO: Implementar descarga
    }
  }

  const handleRemove = () => {
    console.log('Remover:', track.title)
    // TODO: Implementar remoción
  }

  if (viewMode === 'grid') {
    return (
      <div className="group bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-all duration-200 cursor-pointer">
        {/* Thumbnail */}
        <div className="aspect-square bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg mb-3 relative overflow-hidden">
          <img
            src={track.thumbnail}
            alt={`${track.title} - ${track.artist}`}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.style.display = 'none'
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center text-4xl bg-gradient-to-br from-purple-600 to-pink-600">
            {getTypeIcon(track.type)}
          </div>
          
          {/* Play button overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
            <Button
              size="lg"
              onClick={handlePlay}
              className="w-12 h-12 rounded-full bg-white text-black hover:bg-gray-200"
            >
              ▶️
            </Button>
          </div>

          {/* Duration badge */}
          <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
            {formatDuration(track.duration)}
          </div>
        </div>

        {/* Info */}
        <div className="space-y-1">
          <h3 className="text-white font-medium text-sm truncate" title={track.title}>
            {track.title}
          </h3>
          <p className="text-slate-400 text-xs truncate" title={track.artist}>
            {track.artist}
          </p>
          {track.album && (
            <p className="text-slate-500 text-xs truncate" title={track.album}>
              {track.album}
            </p>
          )}
        </div>

        {/* Metadata */}
        <div className="flex items-center justify-between mt-2 text-xs text-slate-500">
          <div className="flex items-center space-x-2">
            <span>{getFormatIcon(track.format)}</span>
            {track.format && <span>{track.format.toUpperCase()}</span>}
          </div>
          {track.fileSize && (
            <span>{formatFileSize(track.fileSize)}</span>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between mt-3">
          <Button
            size="sm"
            onClick={handlePlay}
            className="bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/30"
          >
            ▶️
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
            <DropdownMenuContent className="bg-black/90 border-white/20">
              <DropdownMenuItem onClick={handleAddToPlaylist} className="text-white hover:bg-white/10">
                📝 Agregar a playlist
              </DropdownMenuItem>
              {track.type === 'uploaded' && (
                <DropdownMenuItem onClick={handleDownload} className="text-white hover:bg-white/10">
                  ⬇️ Descargar
                </DropdownMenuItem>
              )}
              <DropdownMenuItem onClick={handleRemove} className="text-red-400 hover:bg-red-600/20">
                🗑️ Eliminar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    )
  }

  // Vista de lista
  return (
    <div className="group flex items-center space-x-4 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-200">
      {/* Número de track */}
      <div className="w-8 text-center">
        <span className="text-slate-400 text-sm group-hover:hidden">
          {index + 1}
        </span>
        <Button
          size="sm"
          variant="ghost"
          onClick={handlePlay}
          className="w-6 h-6 p-0 text-slate-400 hover:text-green-400 hidden group-hover:flex items-center justify-center"
        >
          ▶️
        </Button>
      </div>

      {/* Información principal */}
      <div className="flex items-center space-x-3 flex-1 min-w-0">
        {/* Thumbnail */}
        <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded flex-shrink-0 relative overflow-hidden">
          <img
            src={track.thumbnail}
            alt={`${track.title} - ${track.artist}`}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.style.display = 'none'
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center text-sm bg-gradient-to-br from-purple-600 to-pink-600">
            {getTypeIcon(track.type)}
          </div>
        </div>

        {/* Título y artista */}
        <div className="min-w-0 flex-1">
          <div className="text-white text-sm font-medium truncate" title={track.title}>
            {track.title}
          </div>
          <div className="text-slate-400 text-xs truncate" title={track.artist}>
            {track.artist}
          </div>
        </div>
      </div>

      {/* Álbum */}
      <div className="hidden md:block w-48 min-w-0">
        <div className="text-slate-300 text-sm truncate" title={track.album || 'Sin álbum'}>
          {track.album || '-'}
        </div>
      </div>

      {/* Formato y tamaño */}
      <div className="hidden lg:block w-20 text-center">
        <div className="flex items-center justify-center space-x-1 text-xs text-slate-400">
          <span>{getFormatIcon(track.format)}</span>
          <span>{track.format?.toUpperCase() || 'YT'}</span>
        </div>
        {track.fileSize && (
          <div className="text-xs text-slate-500">
            {formatFileSize(track.fileSize)}
          </div>
        )}
      </div>

      {/* Duración */}
      <div className="w-16 text-center">
        <span className="text-slate-400 text-sm">
          {formatDuration(track.duration)}
        </span>
      </div>

      {/* Acciones */}
      <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          size="sm"
          variant="ghost"
          onClick={handleAddToPlaylist}
          className="text-slate-400 hover:text-purple-400"
          title="Agregar a playlist"
        >
          📝
        </Button>
        
        {track.type === 'uploaded' && (
          <Button
            size="sm"
            variant="ghost"
            onClick={handleDownload}
            className="text-slate-400 hover:text-blue-400"
            title="Descargar"
          >
            ⬇️
          </Button>
        )}

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
            <DropdownMenuItem onClick={handleAddToPlaylist} className="text-white hover:bg-white/10">
              📝 Agregar a playlist
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handlePlay} className="text-white hover:bg-white/10">
              ▶️ Reproducir ahora
            </DropdownMenuItem>
            {track.type === 'uploaded' && (
              <DropdownMenuItem onClick={handleDownload} className="text-white hover:bg-white/10">
                ⬇️ Descargar archivo
              </DropdownMenuItem>
            )}
            <DropdownMenuItem onClick={handleRemove} className="text-red-400 hover:bg-red-600/20">
              🗑️ Eliminar de biblioteca
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}