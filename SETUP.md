# Setup Guide - File Metadata Inspector

## Quick Start

### 1. Prerequisites
- Node.js 18.17 or later
- pnpm 9.0+ (or npm/yarn as alternatives)

### 2. Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# The app will be available at http://localhost:3000
```

### 3. Usage

1. Navigate to `http://localhost:3000`
2. Upload a file by:
   - Clicking the upload area
   - Or dragging and dropping a file
3. View the extracted metadata organized by category

## Development

### Running the Dev Server

```bash
pnpm dev
```

The development server includes:
- Hot Module Replacement (HMR) for instant updates
- TypeScript type checking
- Tailwind CSS compilation
- Automatic file watching

### Building for Production

```bash
# Build the application
pnpm build

# Start the production server
pnpm start
```

### Project Structure Overview

- **`/app`** - Next.js App Router pages and layouts
- **`/components`** - React components
  - `file-metadata-inspector.tsx` - Main container
  - `file-upload.tsx` - Upload interface
  - `metadata-display.tsx` - Display orchestrator
  - `/metadata-sections` - Individual display components
- **`/lib`** - Utility functions and helpers
- **`/types`** - TypeScript type definitions
- **`/public`** - Static assets and test images

## Configuration

### Environment Variables

This application does not require any environment variables for basic functionality. All processing is client-side.

### Tailwind CSS Configuration

The application uses Tailwind CSS v4 with custom design tokens defined in `app/globals.css`:

```css
@theme {
  --color-background: #0f172a;
  --color-surface: #1e293b;
  --color-primary: #3b82f6;
  --color-accent: #10b981;
  /* ... more tokens ... */
}
```

To customize colors:
1. Open `app/globals.css`
2. Modify the `@theme` section
3. Changes apply automatically with HMR

### TypeScript Configuration

The project uses strict TypeScript configuration (`tsconfig.json`). All components are fully typed for better development experience and type safety.

## Testing Your Setup

### Verify Installation

```bash
# Check Node version (should be 18.17+)
node --version

# Check pnpm version (should be 9.0+)
pnpm --version

# Run the dev server and check for errors
pnpm dev
```

### Test File Upload

1. Start the dev server: `pnpm dev`
2. Open http://localhost:3000
3. Download a test image or PDF
4. Upload the file and verify metadata displays correctly

## Troubleshooting

### Issue: Port 3000 Already in Use

```bash
# Run on a different port
pnpm dev -- -p 3001
```

### Issue: Module Not Found Errors

```bash
# Clear node_modules and reinstall
rm -rf node_modules
pnpm install
```

### Issue: TypeScript Errors

```bash
# Check for type errors
pnpm tsc --noEmit

# The dev server will also show these errors
```

### Issue: Tailwind Styles Not Applied

```bash
# Rebuild Tailwind CSS
pnpm dev

# Clear browser cache (Ctrl+Shift+Delete)
```

### Issue: File Upload Not Working

1. Check browser console for JavaScript errors
2. Verify the file format is supported (JPG, PNG, GIF, WebP, PDF)
3. Check file size (very large files may cause issues)
4. Try a different browser

## Performance Optimization

### For Development

The development build includes source maps and extra debugging info. Performance is acceptable for development.

### For Production

```bash
pnpm build
pnpm start
```

The production build includes:
- Code minification
- Tree shaking
- Image optimization
- Proper caching headers

## Browser Support

Tested and supported on:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

Note: Some older browsers may not support all JavaScript APIs needed for EXIF extraction.

## Common Tasks

### Add a New Metadata Section

1. Create a new component in `/components/metadata-sections/`
2. Import it in `metadata-display.tsx`
3. Add conditional rendering based on metadata type
4. Update the types if needed

### Customize Colors and Theme

1. Edit the `@theme` section in `app/globals.css`
2. Update color references in components if needed
3. Test responsive design at different viewport sizes

### Update Dependencies

```bash
# Check for outdated packages
pnpm outdated

# Update all dependencies
pnpm update

# Update specific package
pnpm add package@latest
```

## Deployment

### Deploy to Vercel

```bash
# Using Vercel CLI
pnpm install -g vercel
vercel
```

### Deploy to Other Platforms

The project can be deployed to any platform that supports Next.js:
- Netlify
- Render
- Railway
- AWS Amplify
- Custom Node servers

Just ensure Node.js 18+ is available.

## Documentation

- **README.md** - Main documentation with features and usage
- **SETUP.md** - This file, setup and configuration
- **Next.js Docs** - https://nextjs.org/docs
- **Tailwind CSS** - https://tailwindcss.com/docs
- **EXIF.js** - https://github.com/exif-js/exif-js
- **PDF.js** - https://mozilla.github.io/pdf.js/

## Getting Help

1. Check the README.md for general information
2. Review component comments for implementation details
3. Check browser console for error messages
4. Verify file format is supported
5. Try with a different test file

## Next Steps

After successful setup:

1. **Customize the Theme** - Edit colors in `app/globals.css`
2. **Add More Features** - Extend metadata extraction for new file types
3. **Improve UI** - Enhance the component designs
4. **Deploy** - Push to your favorite hosting platform
