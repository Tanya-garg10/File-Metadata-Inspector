'use client'

import { useEffect, useState } from 'react'
import { FileMetadata } from '@/types/metadata'
import { Image as ImageIcon } from 'lucide-react'

interface ImagePreviewProps {
  metadata: FileMetadata
}

export function ImagePreview({ metadata }: ImagePreviewProps) {
  const [imageSrc, setImageSrc] = useState<string | null>(null)

  useEffect(() => {
    const reader = new FileReader()
    
    // Get the original file - we need to reconstruct it from the metadata
    // For now, we'll create a preview URL from the stored data
    const generatePreview = async () => {
      try {
        // Since we process the file in the parent, we need a different approach
        // We'll use the window.lastUploadedFile if available
        if ((window as any).lastUploadedFile) {
          const file = (window as any).lastUploadedFile
          const reader = new FileReader()
          reader.onload = (e) => {
            setImageSrc(e.target?.result as string)
          }
          reader.readAsDataURL(file)
        }
      } catch (err) {
        console.log('[v0] Preview generation failed:', err)
      }
    }

    generatePreview()
  }, [metadata])

  if (!imageSrc) {
    return null
  }

  return (
    <div className="rounded-xl bg-slate-800/50 border border-slate-700 p-6">
      <h2 className="text-xl font-bold text-slate-100 mb-6 flex items-center gap-2">
        <ImageIcon className="h-5 w-5 text-blue-400" />
        Image Preview
      </h2>

      <div className="flex justify-center bg-slate-900/50 rounded-lg p-6 max-h-96 overflow-auto">
        <img
          src={imageSrc}
          alt={metadata.fileName}
          className="max-w-full max-h-80 object-contain rounded-lg"
        />
      </div>
    </div>
  )
}
