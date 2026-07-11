'use client'

import { FileMetadata } from '@/types/metadata'
import { File, HardDrive, Calendar, FileType } from 'lucide-react'
import { formatBytes, formatDate } from '@/lib/format-utils'

interface FileInfoProps {
  metadata: FileMetadata
}

export function FileInfo({ metadata }: FileInfoProps) {
  return (
    <div className="rounded-xl bg-slate-800/50 border border-slate-700 p-6">
      <h2 className="text-xl font-bold text-slate-100 mb-6 flex items-center gap-2">
        <File className="h-5 w-5 text-blue-400" />
        File Information
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* File Name */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-400">File Name</label>
          <p className="text-slate-100 font-mono text-sm break-all bg-slate-900/50 rounded-lg p-3">
            {metadata.fileName}
          </p>
        </div>

        {/* File Size */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-400 flex items-center gap-1">
            <HardDrive className="h-4 w-4" />
            File Size
          </label>
          <p className="text-slate-100 font-mono text-sm bg-slate-900/50 rounded-lg p-3">
            {formatBytes(metadata.fileSize)} ({metadata.fileSize.toLocaleString()} bytes)
          </p>
        </div>

        {/* MIME Type */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-400 flex items-center gap-1">
            <FileType className="h-4 w-4" />
            MIME Type
          </label>
          <p className="text-slate-100 font-mono text-sm bg-slate-900/50 rounded-lg p-3">
            {metadata.mimeType || 'Unknown'}
          </p>
        </div>

        {/* Last Modified */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-400 flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            Last Modified
          </label>
          <p className="text-slate-100 font-mono text-sm bg-slate-900/50 rounded-lg p-3">
            {formatDate(metadata.lastModified)}
          </p>
        </div>
      </div>
    </div>
  )
}
