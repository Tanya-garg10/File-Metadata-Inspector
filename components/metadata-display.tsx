'use client'

import { FileMetadata } from '@/types/metadata'
import { FileInfo } from './metadata-sections/file-info'
import { ImagePreview } from './metadata-sections/image-preview'
import { ImageDimensions } from './metadata-sections/image-dimensions'
import { ExifData } from './metadata-sections/exif-data'
import { PdfInfo } from './metadata-sections/pdf-info'

interface MetadataDisplayProps {
  metadata: FileMetadata
}

export function MetadataDisplay({ metadata }: MetadataDisplayProps) {
  return (
    <div className="mt-8 space-y-6 animate-in fade-in duration-500">
      {/* File Info - Always Show */}
      <FileInfo metadata={metadata} />

      {/* Image Preview - Show for Images */}
      {metadata.type === 'image' && <ImagePreview metadata={metadata} />}

      {/* Image Dimensions - Show for Images */}
      {metadata.dimensions && <ImageDimensions dimensions={metadata.dimensions} />}

      {/* EXIF Data - Show for JPEG Images */}
      {metadata.exif && <ExifData exif={metadata.exif} />}

      {/* PDF Info - Show for PDF */}
      {metadata.pdf && <PdfInfo pdfMetadata={metadata.pdf} />}
    </div>
  )
}
