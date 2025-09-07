'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Card } from '@/components/ui/card'
import type { PlayerState } from '@/types/music'

export function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playerState, setPlayerState] = useState<PlayerState>({
    currentTrack: null,
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 75,
    isMuted: false,
    queue: [],
    currentIndex: 0,
    shuffle: false,
    repeat: 'none'
  })

  // Función para formatear tiempo
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  // Controles del reproductor
  const play = () => {
    if (audioRef.current) {
      audioRef.current.play()
      setPlayerState(prev => ({ ...prev, isPlaying: true }))
    }
  }

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      setPlayerState(prev => ({ ...prev, isPlaying: false }))
    }
  }

  const togglePlayPause = () => {
    if (playerState.isPlaying) {
      pause()
    } else {
      play()
    }
  }

  const seek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time
      setPlayerState(prev => ({ ...prev, currentTime: time }))
    }
  }

  const setVolume = (volume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100
      setPlayerState(prev => ({ 
        ...prev, 
        volume, 
        isMuted: volume === 0 
      }))
    }
  }

  const toggleMute = () => {
    if (audioRef.current) {
      const newMuted = !playerState.isMuted
      audioRef.current.muted = newMuted
      setPlayerState(prev => ({ ...prev, isMuted: newMuted }))
    }
  }

  // Efectos para manejar el audio
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => {
      setPlayerState(prev => ({ 
        ...prev, 
        currentTime: audio.currentTime,
        duration: audio.duration || 0
      }))
    }

    const handleEnded = () => {
      setPlayerState(prev => ({ ...prev, isPlaying: false }))
      // Aquí iría la lógica para siguiente canción
    }

    audio.addEventListener('timeupdate', updateTime)
    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('loadedmetadata', updateTime)

    return () => {
      audio.removeEventListener('timeupdate', updateTime)
      audio.removeEventListener('ended', handleEnded)
      audio.removeEventListener('loadedmetadata', updateTime)
    }
  }, [])

  // Si no hay track actual, mostrar estado vacío
  if (!playerState.currentTrack) {
    return (
      <Card className="h-20 bg-black/40 backdrop-blur-xl border-white/10 rounded-none border-x-0 border-b-0">
        <div className="flex items-center justify-center h-full">
          <div className="text-slate-400 text-sm">
            🎵 Selecciona una canción para comenzar
          </div>
        </div>
      </Card>
    )
  }

  return (
    <>
      <audio 
        ref={audioRef}
        src={playerState.currentTrack?.url}
        volume={playerState.volume / 100}
        muted={playerState.isMuted}
      />
      
      <Card className="h-20 bg-black/40 backdrop-blur-xl border-white/10 rounded-none border-x-0 border-b-0">
        <div className="flex items-center h-full px-4 space-x-4">
          {/* Información de la Canción */}
          <div className="flex items-center space-x-3 min-w-0 flex-1">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
              {playerState.currentTrack.type === 'youtube' ? '📺' : '🎵'}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-white font-medium text-sm truncate">
                {playerState.currentTrack.title}
              </div>
              <div className="text-slate-400 text-xs truncate">
                {playerState.currentTrack.artist}
              </div>
            </div>
          </div>

          {/* Controles del Reproductor */}
          <div className="flex flex-col items-center space-y-1">
            <div className="flex items-center space-x-2">
              <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white">
                ⏮️
              </Button>
              <Button 
                size="sm" 
                variant="secondary"
                onClick={togglePlayPause}
                className="w-10 h-10 rounded-full bg-white text-black hover:bg-gray-200"
              >
                {playerState.isPlaying ? '⏸️' : '▶️'}
              </Button>
              <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white">
                ⏭️
              </Button>
            </div>
            
            {/* Barra de Progreso */}
            <div className="flex items-center space-x-2 text-xs text-slate-400">
              <span>{formatTime(playerState.currentTime)}</span>
              <div className="w-32">
                <Slider
                  value={[playerState.currentTime]}
                  max={playerState.duration}
                  step={1}
                  onValueChange={([value]) => seek(value)}
                  className="cursor-pointer"
                />
              </div>
              <span>{formatTime(playerState.duration)}</span>
            </div>
          </div>

          {/* Controles de Volumen */}
          <div className="flex items-center space-x-2">
            <Button 
              size="sm" 
              variant="ghost" 
              onClick={toggleMute}
              className="text-slate-400 hover:text-white"
            >
              {playerState.isMuted || playerState.volume === 0 ? '🔇' : 
               playerState.volume < 50 ? '🔉' : '🔊'}
            </Button>
            <div className="w-20">
              <Slider
                value={[playerState.isMuted ? 0 : playerState.volume]}
                max={100}
                step={1}
                onValueChange={([value]) => setVolume(value)}
                className="cursor-pointer"
              />
            </div>
          </div>

          {/* Controles Adicionales */}
          <div className="flex items-center space-x-1">
            <Button 
              size="sm" 
              variant="ghost"
              className={`text-slate-400 hover:text-white ${playerState.shuffle ? 'text-purple-400' : ''}`}
            >
              🔀
            </Button>
            <Button 
              size="sm" 
              variant="ghost"
              className={`text-slate-400 hover:text-white ${playerState.repeat !== 'none' ? 'text-purple-400' : ''}`}
            >
              {playerState.repeat === 'one' ? '🔂' : '🔁'}
            </Button>
          </div>
        </div>
      </Card>
    </>
  )
}