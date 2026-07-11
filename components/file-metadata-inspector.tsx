'use client'

import { useState } from 'react'
import { FileUpload } from './file-upload'
import { MetadataDisplay } from './metadata-display'
import { FileMetadata } from '@/types/metadata'

export function FileMetadataInspector() {
  const [fileMetadata, setFileMetadata] = useState<FileMetadata | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFileSelect = async (file: File) => {
    setIsLoading(true)
    setError(null)
    setFileMetadata(null)

    try {
      // Store file for preview
      (window as any).lastUploadedFile = file
      const metadata = await extractMetadata(file)
      setFileMetadata(metadata)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to extract metadata')
    } finally {
      setIsLoading(false)
    }
  }

  const extractMetadata = async (file: File): Promise<FileMetadata> => {
    const basicMetadata: FileMetadata = {
      fileName: file.name,
      fileSize: file.size,
      mimeType: file.type,
      lastModified: new Date(file.lastModified),
      type: 'unknown',
    }

    // Determine file type
    if (file.type.startsWith('image/')) {
      basicMetadata.type = 'image'
      const dimensions = await getImageDimensions(file)
      basicMetadata.dimensions = dimensions

      // Extract EXIF data
      if (file.type === 'image/jpeg' || file.type === 'image/jpg') {
        try {
          const exifData = await getExifData(file)
          basicMetadata.exif = exifData
        } catch (err) {
          console.log('[v0] EXIF extraction skipped:', err)
        }
      }
    } else if (file.type === 'application/pdf') {
      basicMetadata.type = 'pdf'
      try {
        const pdfMetadata = await getPdfMetadata(file)
        basicMetadata.pdf = pdfMetadata
      } catch (err) {
        console.log('[v0] PDF metadata extraction failed:', err)
      }
    }

    return basicMetadata
  }

  const getImageDimensions = (file: File): Promise<{ width: number; height: number }> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        const img = new Image()
        img.crossOrigin = 'anonymous'
        img.onload = () => {
          resolve({ width: img.width, height: img.height })
        }
        img.onerror = () => reject(new Error('Failed to load image'))
        img.src = e.target?.result as string
      }
      reader.onerror = () => reject(new Error('Failed to read file'))
      reader.readAsDataURL(file)
    })
  }

  const getExifData = async (file: File): Promise<Record<string, any>> => {
    // Dynamic import to avoid server-side issues
    const EXIF = (await import('exif-js')).default

    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        const img = new Image()
        img.crossOrigin = 'anonymous'
        img.onload = () => {
          EXIF.getData(img, function () {
            const exifData = EXIF.getAllTags(img)
            const descriptions: Record<string, string> = {}

            // Manually build descriptions from available tags
            for (const tag in exifData) {
              try {
                const tagDescription = EXIF.Tags[tag as any]
                const tagValue = exifData[tag]
                descriptions[tag] = tagDescription || tag
              } catch (err) {
                descriptions[tag] = tag
              }
            }

            resolve({ data: exifData, descriptions })
          })
        }
        img.onerror = () => reject(new Error('Failed to load image'))
        img.src = e.target?.result as string
      }
      reader.onerror = () => reject(new Error('Failed to read file'))
      reader.readAsDataURL(file)
    })
  }

  const getPdfMetadata = async (file: File): Promise<Record<string, any>> => {
    const pdfjsLib = await import('pdfjs-dist')
    const PDF = pdfjsLib.default
    PDF.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDF.version}/pdf.worker.min.js`

    const arrayBuffer = await file.arrayBuffer()
    const pdf = await PDF.getDocument({ data: arrayBuffer }).promise

    return {
      numPages: pdf.numPages,
      metadata: await pdf.getMetadata().then((m) => m.metadata).catch(() => null),
    }
  }

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-slate-100 mb-2">File Metadata Inspector</h1>
        <p className="text-slate-400">
          Extract and display metadata from your files including EXIF data, image dimensions, and document information
        </p>
      </div>

      <FileUpload onFileSelect={handleFileSelect} isLoading={isLoading} />

      {error && (
        <div className="mt-6 rounded-lg bg-red-500/10 border border-red-500/30 p-4 text-red-400">
          <p className="font-semibold">Error</p>
          <p className="text-sm">{error}</p>
        </div>
      )}

      {fileMetadata && <MetadataDisplay metadata={fileMetadata} />}
    </div>
  )
}
