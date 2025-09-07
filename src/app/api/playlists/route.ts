import { NextRequest, NextResponse } from 'next/server'
import type { Playlist, ApiResponse } from '@/types/music'

// Mock storage - en producción usar base de datos
const playlists: Playlist[] = [
  {
    id: '1',
    name: 'Rock Clásico',
    description: 'Los mejores clásicos del rock de todos los tiempos',
    tracks: [],
    createdAt: new Date('2023-11-01'),
    updatedAt: new Date('2023-12-01'),
    isPublic: false
  },
  {
    id: '2', 
    name: 'Chill Vibes',
    description: 'Música relajante para trabajar y estudiar',
    tracks: [],
    createdAt: new Date('2023-10-15'),
    updatedAt: new Date('2023-11-28'),
    isPublic: true
  }
]

// GET - Obtener todas las playlists
export async function GET() {
  try {
    const response: ApiResponse<Playlist[]> = {
      success: true,
      data: playlists
    }
    
    return NextResponse.json(response)
  } catch (error) {
    console.error('Error fetching playlists:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch playlists' },
      { status: 500 }
    )
  }
}

// POST - Crear nueva playlist
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, description, isPublic = false } = body
    
    if (!name?.trim()) {
      return NextResponse.json(
        { success: false, error: 'Playlist name is required' },
        { status: 400 }
      )
    }

    // Verificar si ya existe una playlist con el mismo nombre
    if (playlists.some(p => p.name.toLowerCase() === name.toLowerCase())) {
      return NextResponse.json(
        { success: false, error: 'A playlist with this name already exists' },
        { status: 400 }
      )
    }

    const newPlaylist: Playlist = {
      id: `playlist_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: name.trim(),
      description: description?.trim() || '',
      tracks: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      isPublic
    }

    playlists.push(newPlaylist)

    const response: ApiResponse<Playlist> = {
      success: true,
      data: newPlaylist,
      message: 'Playlist created successfully'
    }

    return NextResponse.json(response)
    
  } catch (error) {
    console.error('Error creating playlist:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create playlist' },
      { status: 500 }
    )
  }
}

// PUT - Actualizar playlist completa
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, name, description, isPublic, tracks } = body
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Playlist ID is required' },
        { status: 400 }
      )
    }

    const playlistIndex = playlists.findIndex(p => p.id === id)
    if (playlistIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Playlist not found' },
        { status: 404 }
      )
    }

    // Actualizar playlist
    const updatedPlaylist: Playlist = {
      ...playlists[playlistIndex],
      ...(name && { name: name.trim() }),
      ...(description !== undefined && { description: description.trim() }),
      ...(isPublic !== undefined && { isPublic }),
      ...(tracks && { tracks }),
      updatedAt: new Date()
    }

    playlists[playlistIndex] = updatedPlaylist

    const response: ApiResponse<Playlist> = {
      success: true,
      data: updatedPlaylist,
      message: 'Playlist updated successfully'
    }

    return NextResponse.json(response)
    
  } catch (error) {
    console.error('Error updating playlist:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update playlist' },
      { status: 500 }
    )
  }
}

// DELETE - Eliminar playlist
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Playlist ID is required' },
        { status: 400 }
      )
    }

    const playlistIndex = playlists.findIndex(p => p.id === id)
    if (playlistIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Playlist not found' },
        { status: 404 }
      )
    }

    playlists.splice(playlistIndex, 1)

    const response: ApiResponse<null> = {
      success: true,
      message: 'Playlist deleted successfully'
    }

    return NextResponse.json(response)
    
  } catch (error) {
    console.error('Error deleting playlist:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete playlist' },
      { status: 500 }
    )
  }
}