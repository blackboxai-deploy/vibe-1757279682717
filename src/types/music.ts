// Tipos principales para la aplicación musical

export interface Track {
  id: string;
  title: string;
  artist: string;
  album?: string;
  duration: number; // en segundos
  type: 'youtube' | 'uploaded';
  url: string; // URL del archivo subido o videoId de YouTube
  thumbnail?: string;
  addedAt: Date;
  fileSize?: number; // solo para archivos subidos
  format?: string; // mp3, wav, etc.
}

export interface Playlist {
  id: string;
  name: string;
  description?: string;
  tracks: Track[];
  createdAt: Date;
  updatedAt: Date;
  thumbnail?: string;
  isPublic: boolean;
}

export interface YouTubeSearchResult {
  videoId: string;
  title: string;
  channelTitle: string;
  description: string;
  thumbnails: {
    default: string;
    medium: string;
    high: string;
  };
  duration: string; // formato YouTube (PT4M13S)
  publishedAt: string;
}

export interface UploadedFile {
  id: string;
  filename: string;
  originalName: string;
  path: string;
  size: number;
  mimeType: string;
  metadata: AudioMetadata;
  uploadedAt: Date;
}

export interface AudioMetadata {
  title?: string;
  artist?: string;
  album?: string;
  year?: number;
  genre?: string[];
  duration?: number;
  bitrate?: number;
  sampleRate?: number;
  channels?: number;
}

export interface PlayerState {
  currentTrack: Track | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  queue: Track[];
  currentIndex: number;
  shuffle: boolean;
  repeat: 'none' | 'one' | 'all';
}

export interface LibraryFilter {
  searchQuery: string;
  sortBy: 'title' | 'artist' | 'album' | 'addedAt' | 'duration';
  sortOrder: 'asc' | 'desc';
  filterBy: 'all' | 'youtube' | 'uploaded';
}

export interface PlaylistExport {
  format: 'json' | 'm3u' | 'm3u8';
  includeMetadata: boolean;
  includeYouTubeLinks: boolean;
}

// Respuestas de la API
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface YouTubeSearchResponse {
  items: YouTubeSearchResult[];
  nextPageToken?: string;
  totalResults: number;
}

export interface UploadResponse {
  success: boolean;
  file?: UploadedFile;
  track?: Track;
  error?: string;
}

// Hooks de estado
export interface UsePlayerReturn {
  playerState: PlayerState;
  play: (track?: Track) => void;
  pause: () => void;
  stop: () => void;
  next: () => void;
  previous: () => void;
  seek: (time: number) => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  toggleShuffle: () => void;
  toggleRepeat: () => void;
  addToQueue: (track: Track) => void;
  removeFromQueue: (index: number) => void;
}

export interface UsePlaylistsReturn {
  playlists: Playlist[];
  createPlaylist: (name: string, description?: string) => Promise<Playlist>;
  updatePlaylist: (id: string, updates: Partial<Playlist>) => Promise<void>;
  deletePlaylist: (id: string) => Promise<void>;
  addTrackToPlaylist: (playlistId: string, track: Track) => Promise<void>;
  removeTrackFromPlaylist: (playlistId: string, trackId: string) => Promise<void>;
  exportPlaylist: (playlistId: string, format: PlaylistExport) => Promise<string>;
}

export interface UseLibraryReturn {
  tracks: Track[];
  loading: boolean;
  filter: LibraryFilter;
  setFilter: (filter: Partial<LibraryFilter>) => void;
  uploadFile: (file: File) => Promise<UploadResponse>;
  deleteTrack: (trackId: string) => Promise<void>;
  searchYouTube: (query: string) => Promise<YouTubeSearchResult[]>;
}