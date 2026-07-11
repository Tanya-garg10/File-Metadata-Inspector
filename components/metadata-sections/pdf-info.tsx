'use client'

import { FileText } from 'lucide-react'

interface PdfInfoProps {
  pdfMetadata: {
    numPages?: number
    metadata?: Record<string, any>
  }
}

export function PdfInfo({ pdfMetadata }: PdfInfoProps) {
  return (
    <div className="rounded-xl bg-slate-800/50 border border-slate-700 p-6">
      <h2 className="text-xl font-bold text-slate-100 mb-6 flex items-center gap-2">
        <FileText className="h-5 w-5 text-blue-400" />
        PDF Information
      </h2>

      <div className="space-y-4">
        {/* Number of Pages */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-900/50 rounded-lg p-4">
            <p className="text-sm font-medium text-slate-400 mb-2">Number of Pages</p>
            <p className="text-3xl font-bold text-blue-400">{pdfMetadata.numPages || 'Unknown'}</p>
          </div>
        </div>

        {/* PDF Metadata */}
        {pdfMetadata.metadata && Object.keys(pdfMetadata.metadata).length > 0 && (
          <div className="bg-slate-900/50 rounded-lg p-4">
            <p className="text-sm font-medium text-slate-400 mb-4">Document Metadata</p>
            <div className="space-y-3">
              {Object.entries(pdfMetadata.metadata).map(([key, value]) => (
                <div key={key} className="border-l-2 border-blue-400/30 pl-3">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                    {key}
                  </p>
                  <p className="text-sm text-slate-200 break-words font-mono">
                    {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {(!pdfMetadata.metadata || Object.keys(pdfMetadata.metadata).length === 0) && (
          <div className="bg-slate-900/50 rounded-lg p-4 text-center">
            <p className="text-slate-400 text-sm">No additional metadata available for this PDF.</p>
          </div>
        )}
      </div>
    </div>
  )
}
