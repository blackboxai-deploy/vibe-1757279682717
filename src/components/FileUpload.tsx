'use client'

import { useState, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

interface UploadFile {
  file: File
  progress: number
  status: 'pending' | 'uploading' | 'completed' | 'error'
  error?: string
}

export function FileUpload() {
  const [uploads, setUploads] = useState<UploadFile[]>([])
  const [isDragOver, setIsDragOver] = useState(false)

  const acceptedTypes = ['audio/mp3', 'audio/wav', 'audio/flac', 'audio/aac', 'audio/mpeg']
  const maxFileSize = 50 * 1024 * 1024 // 50MB

  const validateFile = (file: File) => {
    if (!acceptedTypes.includes(file.type) && !file.name.match(/\.(mp3|wav|flac|aac|m4a)$/i)) {
      return 'Formato de archivo no compatible. Use MP3, WAV, FLAC o AAC.'
    }
    if (file.size > maxFileSize) {
      return 'El archivo es demasiado grande. Máximo 50MB permitido.'
    }
    return null
  }

  const handleFiles = (files: FileList | null) => {
    if (!files) return

    const newUploads: UploadFile[] = []
    
    Array.from(files).forEach(file => {
      const error = validateFile(file)
      newUploads.push({
        file,
        progress: 0,
        status: error ? 'error' : 'pending',
        error: error || undefined
      })
    })

    setUploads(prev => [...prev, ...newUploads])
    
    // Comenzar upload de archivos válidos
    newUploads
      .filter(upload => upload.status === 'pending')
      .forEach(upload => uploadFile(upload))
  }

  const uploadFile = async (uploadItem: UploadFile) => {
    const { file } = uploadItem
    
    // Actualizar estado a uploading
    setUploads(prev => prev.map(u => 
      u.file === file ? { ...u, status: 'uploading' as const } : u
    ))

    try {
      // Simular upload con progreso
      for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise(resolve => setTimeout(resolve, 200))
        setUploads(prev => prev.map(u => 
          u.file === file ? { ...u, progress } : u
        ))
      }

      // TODO: Implementar upload real al backend
      // const formData = new FormData()
      // formData.append('file', file)
      // const response = await fetch('/api/upload', { method: 'POST', body: formData })

      setUploads(prev => prev.map(u => 
        u.file === file ? { ...u, status: 'completed' as const, progress: 100 } : u
      ))

    } catch (error) {
      setUploads(prev => prev.map(u => 
        u.file === file ? { 
          ...u, 
          status: 'error' as const, 
          error: 'Error al subir el archivo. Inténtalo de nuevo.' 
        } : u
      ))
    }
  }

  const removeUpload = (file: File) => {
    setUploads(prev => prev.filter(u => u.file !== file))
  }

  const clearCompleted = () => {
    setUploads(prev => prev.filter(u => u.status !== 'completed'))
  }

  const formatFileSize = (bytes: number) => {
    const mb = bytes / (1024 * 1024)
    return `${mb.toFixed(1)} MB`
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-400'
      case 'error': return 'text-red-400'
      case 'uploading': return 'text-blue-400'
      default: return 'text-slate-400'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return '✅'
      case 'error': return '❌'
      case 'uploading': return '⏳'
      default: return '📄'
    }
  }

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const onDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    handleFiles(e.dataTransfer.files)
  }, [])

  return (
    <div className="space-y-4">
      {/* Zona de Drop */}
      <Card className="bg-black/20 backdrop-blur-xl border-white/10">
        <CardContent className="pt-6">
          <div
            className={`
              relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200
              ${isDragOver 
                ? 'border-purple-500 bg-purple-600/10' 
                : 'border-white/20 bg-white/5'
              }
              hover:border-purple-400 hover:bg-purple-600/5 cursor-pointer
            `}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            onClick={() => document.getElementById('file-input')?.click()}
          >
            <input
              id="file-input"
              type="file"
              multiple
              accept=".mp3,.wav,.flac,.aac,.m4a"
              onChange={(e) => handleFiles(e.target.files)}
              className="hidden"
            />
            
            <div className="space-y-4">
              <div className="text-6xl">
                {isDragOver ? '🎯' : '🎵'}
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {isDragOver ? 'Suelta tus archivos aquí' : 'Arrastra y suelta tus archivos de música'}
                </h3>
                <p className="text-slate-400">
                  O haz clic para seleccionar archivos
                </p>
              </div>
              
              <div className="flex flex-wrap justify-center gap-2 text-sm text-slate-500">
                <span className="bg-white/10 px-2 py-1 rounded">MP3</span>
                <span className="bg-white/10 px-2 py-1 rounded">WAV</span>
                <span className="bg-white/10 px-2 py-1 rounded">FLAC</span>
                <span className="bg-white/10 px-2 py-1 rounded">AAC</span>
                <span className="bg-white/10 px-2 py-1 rounded">M4A</span>
              </div>
              
              <p className="text-xs text-slate-500">
                Máximo 50MB por archivo • Múltiples archivos permitidos
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Uploads */}
      {uploads.length > 0 && (
        <Card className="bg-black/20 backdrop-blur-xl border-white/10">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white">
                Subiendo archivos ({uploads.filter(u => u.status === 'completed').length}/{uploads.length})
              </CardTitle>
              {uploads.some(u => u.status === 'completed') && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={clearCompleted}
                  className="text-slate-400 hover:text-white"
                >
                  Limpiar completados
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {uploads.map((upload, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 p-3 bg-white/5 rounded-lg"
                >
                  <div className="text-xl">
                    {getStatusIcon(upload.status)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <div className="text-white text-sm font-medium truncate">
                        {upload.file.name}
                      </div>
                      <div className="text-xs text-slate-400 ml-2">
                        {formatFileSize(upload.file.size)}
                      </div>
                    </div>
                    
                    {upload.status === 'uploading' && (
                      <Progress 
                        value={upload.progress} 
                        className="h-2 bg-white/10"
                      />
                    )}
                    
                    {upload.error && (
                      <p className="text-red-400 text-xs mt-1">
                        {upload.error}
                      </p>
                    )}
                    
                    <p className={`text-xs mt-1 ${getStatusColor(upload.status)}`}>
                      {upload.status === 'pending' && 'En cola...'}
                      {upload.status === 'uploading' && `Subiendo... ${upload.progress}%`}
                      {upload.status === 'completed' && 'Completado ✨'}
                      {upload.status === 'error' && 'Error al subir'}
                    </p>
                  </div>
                  
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => removeUpload(upload.file)}
                    className="text-slate-400 hover:text-red-400"
                  >
                    ✕
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Consejos de Upload */}
      <Card className="bg-gradient-to-r from-green-600/10 to-blue-600/10 backdrop-blur-xl border-green-500/20">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-3">
            <span className="text-green-400 text-2xl">🎤</span>
            <div>
              <h3 className="text-green-200 font-semibold mb-2">
                Consejos para mejores resultados
              </h3>
              <ul className="text-green-300 text-sm space-y-1">
                <li>• Archivos con metadata completa se organizan automáticamente</li>
                <li>• Los formatos sin pérdida (FLAC, WAV) mantienen la calidad original</li>
                <li>• Puedes subir múltiples archivos a la vez</li>
                <li>• Los archivos se procesan en segundo plano</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}