export interface FileMetadata {
  fileName: string
  fileSize: number
  mimeType: string
  lastModified: Date
  type: 'image' | 'pdf' | 'unknown'
  dimensions?: {
    width: number
    height: number
  }
  exif?: {
    data?: Record<string, any>
    descriptions?: Record<string, string>
  }
  pdf?: {
    numPages?: number
    metadata?: Record<string, any>
  }
}
