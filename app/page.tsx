'use client'

import { FileMetadataInspector } from '@/components/file-metadata-inspector'

export default function Page() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-8 px-4 sm:px-6 lg:px-8">
      <FileMetadataInspector />
    </main>
  )
}
