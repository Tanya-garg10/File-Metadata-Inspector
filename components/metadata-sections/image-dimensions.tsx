'use client'

import { Maximize2 } from 'lucide-react'

interface ImageDimensionsProps {
  dimensions: {
    width: number
    height: number
  }
}

export function ImageDimensions({ dimensions }: ImageDimensionsProps) {
  const aspectRatio = (dimensions.width / dimensions.height).toFixed(2)
  const megapixels = ((dimensions.width * dimensions.height) / 1000000).toFixed(2)

  return (
    <div className="rounded-xl bg-slate-800/50 border border-slate-700 p-6">
      <h2 className="text-xl font-bold text-slate-100 mb-6 flex items-center gap-2">
        <Maximize2 className="h-5 w-5 text-blue-400" />
        Image Dimensions
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Width */}
        <div className="bg-slate-900/50 rounded-lg p-4 text-center">
          <p className="text-xs font-medium text-slate-400 mb-1">Width</p>
          <p className="text-xl font-bold text-blue-400">{dimensions.width}</p>
          <p className="text-xs text-slate-500 mt-1">pixels</p>
        </div>

        {/* Height */}
        <div className="bg-slate-900/50 rounded-lg p-4 text-center">
          <p className="text-xs font-medium text-slate-400 mb-1">Height</p>
          <p className="text-xl font-bold text-blue-400">{dimensions.height}</p>
          <p className="text-xs text-slate-500 mt-1">pixels</p>
        </div>

        {/* Aspect Ratio */}
        <div className="bg-slate-900/50 rounded-lg p-4 text-center">
          <p className="text-xs font-medium text-slate-400 mb-1">Aspect Ratio</p>
          <p className="text-xl font-bold text-green-400">{aspectRatio}:1</p>
          <p className="text-xs text-slate-500 mt-1">w:h</p>
        </div>

        {/* Megapixels */}
        <div className="bg-slate-900/50 rounded-lg p-4 text-center">
          <p className="text-xs font-medium text-slate-400 mb-1">Megapixels</p>
          <p className="text-xl font-bold text-purple-400">{megapixels}</p>
          <p className="text-xs text-slate-500 mt-1">MP</p>
        </div>
      </div>

      {/* Visual Preview */}
      <div className="mt-6 bg-slate-900/50 rounded-lg p-6">
        <p className="text-sm font-medium text-slate-400 mb-4">Visual Representation</p>
        <div className="flex items-center justify-center">
          <div
            className="bg-gradient-to-br from-blue-500/50 to-purple-500/50 border-2 border-blue-400/50 rounded-lg"
            style={{
              width: `${Math.min(300, (300 * dimensions.width) / Math.max(dimensions.width, dimensions.height))}px`,
              height: `${Math.min(300, (300 * dimensions.height) / Math.max(dimensions.width, dimensions.height))}px`,
            }}
          />
        </div>
      </div>
    </div>
  )
}
