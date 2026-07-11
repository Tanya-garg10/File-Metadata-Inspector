'use client'

import { useState } from 'react'
import { Database, ChevronDown } from 'lucide-react'

interface ExifDataProps {
  exif: {
    data?: Record<string, any>
    descriptions?: Record<string, string>
  }
}

export function ExifData({ exif }: ExifDataProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    camera: true,
    image: true,
    gps: false,
    other: false,
  })

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  // Organize EXIF data into categories
  const categorizeExif = () => {
    const data = exif.data || {}
    const descriptions = exif.descriptions || {}

    const categories = {
      camera: {
        label: 'Camera Information',
        icon: '📷',
        items: {} as Record<string, string>,
      },
      image: {
        label: 'Image Settings',
        icon: '🖼️',
        items: {} as Record<string, string>,
      },
      gps: {
        label: 'GPS Coordinates',
        icon: '📍',
        items: {} as Record<string, string>,
      },
      other: {
        label: 'Other Information',
        icon: '📊',
        items: {} as Record<string, string>,
      },
    }

    // Map EXIF tags to categories
    const tagMap: Record<string, string> = {
      Make: 'camera',
      Model: 'camera',
      LensModel: 'camera',
      DateTimeOriginal: 'camera',
      DateTimeDigitized: 'camera',
      FNumber: 'image',
      ExposureTime: 'image',
      ISOSpeedRatings: 'image',
      FocalLength: 'image',
      FocalLengthIn35mmFilm: 'image',
      Flash: 'image',
      WhiteBalance: 'image',
      Orientation: 'image',
      GPSLatitude: 'gps',
      GPSLongitude: 'gps',
      GPSAltitude: 'gps',
    }

    for (const [key, value] of Object.entries(data)) {
      const category = tagMap[key] || 'other'
      let displayValue = ''

      if (value === null || value === undefined) {
        displayValue = 'N/A'
      } else if (typeof value === 'object') {
        displayValue = Array.isArray(value) ? value.join(', ') : JSON.stringify(value)
      } else {
        displayValue = String(value)
      }

      // Always store the actual value, not just description
      categories[category as keyof typeof categories].items[key] = displayValue
    }

    return categories
  }

  const categories = categorizeExif()

  // Check if there's any EXIF data
  const hasAnyData = Object.values(categories).some((cat) => Object.keys(cat.items).length > 0)

  if (!hasAnyData) {
    return (
      <div className="rounded-xl bg-slate-800/50 border border-slate-700 p-6">
        <h2 className="text-xl font-bold text-slate-100 mb-4 flex items-center gap-2">
          <Database className="h-5 w-5 text-blue-400" />
          EXIF Data
        </h2>
        <p className="text-slate-400 text-sm">No EXIF data found in this image.</p>
      </div>
    )
  }

  return (
    <div className="rounded-xl bg-slate-800/50 border border-slate-700 p-6">
      <h2 className="text-xl font-bold text-slate-100 mb-6 flex items-center gap-2">
        <Database className="h-5 w-5 text-blue-400" />
        EXIF Data
      </h2>

      <div className="space-y-3">
        {Object.entries(categories).map(([key, category]) => {
          const itemCount = Object.keys(category.items).length
          if (itemCount === 0) return null

          return (
            <div key={key} className="border border-slate-700 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleSection(key)}
                className="w-full flex items-center justify-between p-4 bg-slate-900/30 hover:bg-slate-900/50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">{category.icon}</span>
                  <span className="font-medium text-slate-100">{category.label}</span>
                  <span className="ml-2 text-sm text-slate-400">
                    ({itemCount} {itemCount === 1 ? 'item' : 'items'})
                  </span>
                </div>
                <ChevronDown
                  className={`h-5 w-5 text-slate-400 transition-transform ${
                    expandedSections[key] ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {expandedSections[key] && (
                <div className="divide-y divide-slate-700">
                  {Object.entries(category.items).map(([tag, value]) => (
                    <div
                      key={tag}
                      className="p-4 bg-slate-950/50 hover:bg-slate-900/30 transition-colors"
                    >
                      <p className="text-xs font-semibold text-slate-400 mb-1 uppercase tracking-wider">
                        {tag}
                      </p>
                      <p className="text-sm text-slate-200 font-mono break-words">{value}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
