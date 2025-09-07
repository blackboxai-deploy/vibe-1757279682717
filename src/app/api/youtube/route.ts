import { NextRequest, NextResponse } from 'next/server'
import type { YouTubeSearchResponse } from '@/types/music'

// Mock data para simulación - en producción usar YouTube Data API v3
const mockYouTubeResults = [
  {
    videoId: 'dQw4w9WgXcQ',
    title: 'Never Gonna Give You Up - Rick Astley',
    channelTitle: 'Rick Astley Official',
    description: 'Official music video for Never Gonna Give You Up by Rick Astley',
    thumbnails: {
      default: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/0a4937ff-1a56-4ac1-af27-eb62ebaea4ef.png',
      medium: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/ee4dd2e6-fa53-4425-bb54-019b6deb9b0f.png',
      high: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/fc31f645-f57a-48d5-983c-9202392b1306.png'
    },
    duration: 'PT3M32S',
    publishedAt: '2009-10-25T08:15:00Z'
  },
  {
    videoId: 'kJQP7kiw5Fk',
    title: 'Despacito - Luis Fonsi ft. Daddy Yankee',
    channelTitle: 'Luis Fonsi',
    description: 'Official music video for Despacito by Luis Fonsi featuring Daddy Yankee',
    thumbnails: {
      default: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/873e0912-640b-4025-80a7-d8eeed98eb15.png',
      medium: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/e7ce383e-6775-4c18-acea-da9f6fb48b47.png',
      high: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/7c50779f-4603-4cc1-b697-a0376bafade3.png'
    },
    duration: 'PT4M41S',
    publishedAt: '2017-01-12T21:30:00Z'
  },
  {
    videoId: 'fJ9rUzIMcZQ',
    title: 'Bohemian Rhapsody - Queen',
    channelTitle: 'Queen Official',
    description: 'Official music video for Bohemian Rhapsody by Queen',
    thumbnails: {
      default: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/8e8e2293-1368-4af1-b36a-17a0a0a999ba.png',
      medium: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/46456070-0dda-48a8-8b3a-681467d7ac06.png',
      high: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/5c6277e7-dbfd-44f8-a371-a78e0b5131b3.png'
    },
    duration: 'PT5M55S',
    publishedAt: '2008-08-01T12:00:00Z'
  }
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q')
    const maxResults = parseInt(searchParams.get('maxResults') || '10')
    
    if (!query) {
      return NextResponse.json(
        { error: 'Query parameter is required' },
        { status: 400 }
      )
    }

    // En producción, aquí harías la llamada real a YouTube Data API v3:
    /*
    const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&videoCategoryId=10&q=${encodeURIComponent(query)}&maxResults=${maxResults}&key=${YOUTUBE_API_KEY}`
    )
    const data = await response.json()
    */

    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 500))

    // Filtrar resultados mock basados en la query
    const filteredResults = mockYouTubeResults
      .filter(result => 
        result.title.toLowerCase().includes(query.toLowerCase()) ||
        result.channelTitle.toLowerCase().includes(query.toLowerCase())
      )
      .slice(0, maxResults)

    // Agregar más resultados genéricos si no hay suficientes
    const additionalResults = Array.from({ length: Math.max(0, maxResults - filteredResults.length) }, (_, i) => ({
      videoId: `mock_${Date.now()}_${i}`,
      title: `${query} - Resultado ${i + 1}`,
      channelTitle: `Canal Música ${i + 1}`,
      description: `Video musical relacionado con ${query}. Descripción del contenido...`,
      thumbnails: {
        default: `https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/78157989-2445-42ae-8eef-11c4d5b5ef59.png}+${i + 1}`,
        medium: `https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/5bd8fa84-f83f-4506-9aa6-157e7d05d097.png}+Medium+${i + 1}`,
        high: `https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/785fe6f7-3d15-472b-b0fa-db3ec6f1dc53.png}+High+${i + 1}`
      },
      duration: `PT${Math.floor(Math.random() * 6) + 2}M${Math.floor(Math.random() * 60)}S`,
      publishedAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString()
    }))

    const allResults = [...filteredResults, ...additionalResults]

    const response: YouTubeSearchResponse = {
      items: allResults,
      totalResults: allResults.length
    }

    return NextResponse.json(response)
    
  } catch (error) {
    console.error('Error in YouTube search API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Función helper para convertir duración YouTube (PT4M13S) a segundos
export function parseDuration(duration: string): number {
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/)
  if (!match) return 0
  
  const hours = parseInt(match[1] || '0')
  const minutes = parseInt(match[2] || '0')  
  const seconds = parseInt(match[3] || '0')
  
  return hours * 3600 + minutes * 60 + seconds
}

// Headers para CORS si es necesario
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}