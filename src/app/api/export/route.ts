import { NextRequest, NextResponse } from 'next/server'
import type { Playlist, PlaylistExport } from '@/types/music'

// Mock data para las playlists (en producción vendría de la base de datos)
const mockPlaylists: Playlist[] = [
  {
    id: '1',
    name: 'Rock Clásico',
    description: 'Los mejores clásicos del rock',
    tracks: [
      {
        id: '1',
        title: 'Bohemian Rhapsody',
        artist: 'Queen',
        album: 'A Night at the Opera',
        duration: 355,
        type: 'uploaded',
        url: '/uploads/bohemian-rhapsody.mp3',
        addedAt: new Date('2023-12-01'),
        fileSize: 8500000,
        format: 'mp3'
      },
      {
        id: '2',
        title: 'Hotel California',
        artist: 'Eagles',
        album: 'Hotel California', 
        duration: 391,
        type: 'youtube',
        url: 'BciS5krYL80',
        addedAt: new Date('2023-11-28')
      }
    ],
    createdAt: new Date('2023-11-01'),
    updatedAt: new Date('2023-12-01'),
    isPublic: false
  }
]

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { playlistId, format = 'json', includeMetadata = true, includeYouTubeLinks = true }: PlaylistExport & { playlistId: string } = body
    
    if (!playlistId) {
      return NextResponse.json(
        { error: 'Playlist ID is required' },
        { status: 400 }
      )
    }

    // Buscar playlist
    const playlist = mockPlaylists.find(p => p.id === playlistId)
    if (!playlist) {
      return NextResponse.json(
        { error: 'Playlist not found' },
        { status: 404 }
      )
    }

    let exportContent: string
    let contentType: string
    let filename: string

    switch (format) {
      case 'm3u':
      case 'm3u8':
        // Formato M3U/M3U8
        const m3uLines = ['#EXTM3U']
        
        playlist.tracks.forEach(track => {
          if (includeMetadata) {
            m3uLines.push(`#EXTINF:${track.duration},${track.artist} - ${track.title}`)
          }
          
          if (track.type === 'youtube' && includeYouTubeLinks) {
            m3uLines.push(`https://www.youtube.com/watch?v=${track.url}`)
          } else if (track.type === 'uploaded') {
            m3uLines.push(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}${track.url}`)
          }
        })
        
        exportContent = m3uLines.join('\n')
        contentType = format === 'm3u8' ? 'application/vnd.apple.mpegurl' : 'audio/x-mpegurl'
        filename = `${playlist.name.replace(/[^a-z0-9]/gi, '_')}.${format}`
        break

      case 'json':
      default:
        // Formato JSON
        const jsonData = {
          playlist: {
            name: playlist.name,
            description: playlist.description,
            createdAt: playlist.createdAt,
            updatedAt: playlist.updatedAt,
            isPublic: playlist.isPublic,
            totalTracks: playlist.tracks.length,
            totalDuration: playlist.tracks.reduce((sum, track) => sum + track.duration, 0)
          },
          tracks: playlist.tracks.map(track => {
            const exportTrack: Record<string, any> = {
              title: track.title,
              artist: track.artist,
              duration: track.duration,
              type: track.type,
              addedAt: track.addedAt
            }

            if (includeMetadata) {
              exportTrack.album = track.album
              if (track.type === 'uploaded') {
                exportTrack.format = track.format
                exportTrack.fileSize = track.fileSize
              }
            }

            if (track.type === 'youtube' && includeYouTubeLinks) {
              exportTrack.youtubeUrl = `https://www.youtube.com/watch?v=${track.url}`
              exportTrack.videoId = track.url
            } else if (track.type === 'uploaded') {
              exportTrack.fileUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}${track.url}`
            }

            return exportTrack
          }),
          exportInfo: {
            exportedAt: new Date().toISOString(),
            format: 'json',
            includeMetadata,
            includeYouTubeLinks,
            exportedBy: 'MiMúsica App v1.0'
          }
        }
        
        exportContent = JSON.stringify(jsonData, null, 2)
        contentType = 'application/json'
        filename = `${playlist.name.replace(/[^a-z0-9]/gi, '_')}.json`
        break
    }

    // Retornar archivo para descarga
    return new NextResponse(exportContent, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': new Blob([exportContent]).size.toString()
      }
    })
    
  } catch (error) {
    console.error('Error exporting playlist:', error)
    return NextResponse.json(
      { error: 'Failed to export playlist' },
      { status: 500 }
    )
  }
}

// GET - Obtener información de export disponible
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const playlistId = searchParams.get('playlistId')
    
    if (!playlistId) {
      return NextResponse.json(
        { error: 'Playlist ID is required' },
        { status: 400 }
      )
    }

    const playlist = mockPlaylists.find(p => p.id === playlistId)
    if (!playlist) {
      return NextResponse.json(
        { error: 'Playlist not found' },
        { status: 404 }
      )
    }

    const exportInfo = {
      playlistId: playlist.id,
      playlistName: playlist.name,
      totalTracks: playlist.tracks.length,
      totalDuration: playlist.tracks.reduce((sum, track) => sum + track.duration, 0),
      youtubeTracksCount: playlist.tracks.filter(t => t.type === 'youtube').length,
      uploadedTracksCount: playlist.tracks.filter(t => t.type === 'uploaded').length,
      availableFormats: ['json', 'm3u', 'm3u8'],
      supportedOptions: {
        includeMetadata: true,
        includeYouTubeLinks: true
      }
    }

    return NextResponse.json(exportInfo)
    
  } catch (error) {
    console.error('Error getting export info:', error)
    return NextResponse.json(
      { error: 'Failed to get export information' },
      { status: 500 }
    )
  }
}