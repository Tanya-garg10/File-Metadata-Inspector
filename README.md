# File Metadata Inspector

A sophisticated web application for extracting and displaying comprehensive metadata from files, including EXIF data, image dimensions, and PDF document information.

## Features

### Core Functionality
- **Drag-and-Drop Upload**: Intuitive file upload with drag-and-drop support or click-to-browse
- **Multi-Format Support**: JPG, PNG, GIF, WebP images and PDF documents
- **Instant Processing**: Browser-side file processing with no server uploads required
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

### File Information
- File name and file size (with human-readable formatting)
- MIME type detection
- Last modified date and time
- File type classification (image, PDF, or unknown)

### Image Analysis
- **Dimensions**: Width, height, aspect ratio, and megapixel count
- **Visual Preview**: Scaled representation of image dimensions
- **EXIF Data** (JPEG images):
  - Camera make and model
  - Lens information
  - Capture date and time
  - Exposure settings (F-number, shutter speed, ISO)
  - Focal length
  - Flash information
  - White balance settings
  - Orientation
  - GPS coordinates (if available)
  - All available EXIF metadata organized by category

### PDF Analysis
- Number of pages
- Document metadata (title, author, subject, creator, creation date, etc.)
- Organized metadata display

## Technical Stack

- **Framework**: Next.js 16 with React 19
- **Styling**: Tailwind CSS with custom design tokens
- **Metadata Extraction**:
  - EXIF.js for image EXIF data extraction
  - PDF.js for PDF document analysis
  - Browser File API for basic file information
- **UI Components**: Lucide React icons
- **Language**: TypeScript

## Project Structure

```
├── app/
│   ├── page.tsx              # Main page component
│   ├── layout.tsx            # Root layout with metadata
│   └── globals.css           # Global styles and design tokens
│
├── components/
│   ├── file-metadata-inspector.tsx    # Main container component
│   ├── file-upload.tsx               # Drag-drop upload component
│   ├── metadata-display.tsx          # Metadata display orchestrator
│   └── metadata-sections/
│       ├── file-info.tsx             # Basic file information
│       ├── image-preview.tsx         # Image preview display
│       ├── image-dimensions.tsx      # Dimension analysis and visualization
│       ├── exif-data.tsx             # EXIF data with categorization
│       └── pdf-info.tsx              # PDF metadata display
│
├── types/
│   └── metadata.ts           # TypeScript metadata interfaces
│
├── lib/
│   └── format-utils.ts       # Utility functions for formatting
│
└── public/
    └── test-image.png       # Sample test image
```

## How It Works

### File Upload Process

1. **User selects or drags a file** to the upload area
2. **Validation** checks that the file type is supported
3. **Metadata extraction** begins:
   - Basic info (name, size, MIME type, date) from File API
   - Image dimensions by loading the image
   - EXIF data using EXIF.js library (JPEG only)
   - PDF metadata using PDF.js library (PDF only)
4. **Results are organized and displayed** in categorized sections

### Metadata Extraction Details

#### Image Files
- **All Formats**: Dimensions, file info
- **JPEG Only**: Complete EXIF data with hierarchical categorization:
  - **Camera Information**: Make, model, lens, capture date
  - **Image Settings**: F-number, shutter speed, ISO, focal length, flash, white balance
  - **GPS Coordinates**: Latitude, longitude, altitude (if available)
  - **Other Information**: Any additional EXIF tags

#### PDF Documents
- Number of pages
- Metadata dictionary (title, author, subject, etc.)
- Creation and modification timestamps

### Design Features

#### Dark Theme
- Sophisticated dark slate color palette (slate-900 to slate-100)
- Blue accent colors for primary elements
- Green for success/dimension indicators
- Purple for special metrics

#### Responsive Layout
- Mobile-first approach
- Flexbox-based layouts
- Adaptive grid systems for metadata display
- Touch-friendly interactive elements

#### Visual Organization
- **Color-coded cards** for different metadata sections
- **Expandable sections** for EXIF categories (collapsed by default except camera and image settings)
- **Visual representation** of image dimensions with scaled preview box
- **Icon integration** for quick visual recognition

## Installation & Setup

### Prerequisites
- Node.js 18+ and pnpm (or npm/yarn)

### Installation

```bash
# Clone or download the project
cd file-metadata-inspector

# Install dependencies
pnpm install

# Start the development server
pnpm dev

# Open http://localhost:3000 in your browser
```

### Build for Production

```bash
# Build the application
pnpm build

# Start the production server
pnpm start
```

## Usage

1. **Open the application** in your web browser
2. **Upload a file** by:
   - Clicking the upload area and selecting a file
   - Dragging and dropping a file onto the upload area
3. **View metadata** in organized sections:
   - File Information section appears for all files
   - Image preview and dimensions for image files
   - EXIF data section for JPEG images
   - PDF information section for PDF files
4. **Explore EXIF categories** by clicking to expand/collapse sections

## Supported File Formats

| Format | Features |
|--------|----------|
| **JPEG/JPG** | File info, dimensions, preview, complete EXIF data |
| **PNG** | File info, dimensions, preview |
| **GIF** | File info, dimensions, preview |
| **WebP** | File info, dimensions, preview |
| **PDF** | File info, page count, document metadata |

## Browser Compatibility

- Chrome/Chromium 90+
- Firefox 88+
- Safari 14+
- Edge 90+

Note: EXIF extraction requires support for:
- File API
- Blob/ArrayBuffer
- Canvas (for image dimension loading)

## Dependencies

```json
{
  "dependencies": {
    "exif-js": "2.3.0",
    "pdfjs-dist": "6.1.200"
  },
  "devDependencies": {
    "next": "16.0.0",
    "react": "19.0.0",
    "tailwindcss": "4.0.0",
    "typescript": "5.0.0"
  }
}
```

## Performance Considerations

- **Client-side Processing**: All file processing happens in the browser—no server uploads or processing required
- **Memory Usage**: Large files may require more memory for EXIF extraction
- **PDF.js Worker**: Uses CDN-hosted worker for PDF processing to avoid bundle bloat
- **Efficient Updates**: React memoization and optimized re-renders

## Limitations & Known Issues

1. **EXIF Extraction**: Currently supported for JPEG images only (PNG, GIF, WebP don't typically store EXIF)
2. **PDF Metadata**: Advanced PDF features and embedded content are not analyzed
3. **File Size**: Very large files (>100MB) may cause performance issues or browser memory limits
4. **GPS Coordinates**: Displayed as raw EXIF values (not converted to readable addresses)

## Future Enhancements

- [ ] GPS coordinate conversion to readable addresses using geocoding
- [ ] EXIF data editing and export
- [ ] Bulk file processing
- [ ] Metadata comparison between files
- [ ] Support for additional formats (TIFF, RAW, BMP, etc.)
- [ ] Advanced PDF analysis (text extraction, page preview)
- [ ] Metadata filtering and search
- [ ] Export results as JSON/CSV

## Privacy & Security

- **No Data Collection**: All processing happens locally in your browser
- **No Server Uploads**: Files never leave your device
- **No Tracking**: No analytics or third-party tracking
- **Open Source**: Code is transparent and auditable

## License

This project is provided as-is for educational and personal use.

## Credits

- **EXIF.js**: For comprehensive EXIF data extraction
- **PDF.js**: For PDF document analysis
- **Tailwind CSS**: For utility-first styling
- **Lucide React**: For consistent icon design

## Support

For issues, questions, or suggestions, please refer to the project documentation or create an issue in the repository.
