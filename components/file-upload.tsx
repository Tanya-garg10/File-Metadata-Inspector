'use client'

import { useRef, useState } from 'react'
import { Upload } from 'lucide-react'

interface FileUploadProps {
  onFileSelect: (file: File) => void
  isLoading: boolean
}

export function FileUpload({ onFileSelect, isLoading }: FileUploadProps) {
  const [isDragActive, setIsDragActive] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true)
    } else if (e.type === 'dragleave') {
      setIsDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragActive(false)

    const files = e.dataTransfer.files
    if (files && files.length > 0) {
      const file = files[0]
      if (isValidFile(file)) {
        onFileSelect(file)
      }
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files
    if (files && files.length > 0) {
      const file = files[0]
      if (isValidFile(file)) {
        onFileSelect(file)
      }
    }
  }

  const isValidFile = (file: File): boolean => {
    const validTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/gif',
      'image/webp',
      'application/pdf',
    ]
    return validTypes.includes(file.type)
  }

  return (
    <div
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      className={`relative rounded-2xl border-2 border-dashed transition-all ${
        isDragActive
          ? 'border-blue-400 bg-blue-500/10'
          : 'border-slate-600 hover:border-slate-500 bg-slate-800/50'
      } p-12 cursor-pointer`}
      onClick={() => inputRef.current?.click()}
    >
      <input
        ref={inputRef}
        type="file"
        onChange={handleChange}
        className="hidden"
        accept=".jpg,.jpeg,.png,.gif,.webp,.pdf"
        disabled={isLoading}
      />

      <div className="flex flex-col items-center justify-center gap-3">
        <div className={`rounded-full p-3 ${isDragActive ? 'bg-blue-500/20' : 'bg-slate-700'}`}>
          <Upload
            className={`h-8 w-8 ${isDragActive ? 'text-blue-400' : 'text-slate-400'}`}
          />
        </div>

        <div className="text-center">
          <h3 className={`text-lg font-semibold ${isDragActive ? 'text-blue-400' : 'text-slate-100'}`}>
            {isLoading ? 'Processing...' : 'Drop your file here or click to browse'}
          </h3>
          <p className="mt-1 text-sm text-slate-400">
            Supports JPG, PNG, GIF, WebP images and PDF documents
          </p>
        </div>
      </div>
    </div>
  )
}
