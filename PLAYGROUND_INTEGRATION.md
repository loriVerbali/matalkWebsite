# MaTalk Playground Integration

This document describes the integration of the MeTalk AAC demo into the MaTalk Website as a Playground section.

## Overview

The Playground section provides a demonstration of MaTalk's AI-powered feelings communication technology, allowing users to:

1. **Upload a photo** and generate personalized feeling images using AI
2. **Explore 24 different feelings** across 4 categories (Good Body, Good Feelings, Bad Feelings, Bad Body)
3. **Tap-to-speak functionality** in multiple languages (EN/ES/PT)
4. **Print collages** of all feelings
5. **Full accessibility support** with keyboard navigation and high contrast mode

## File Structure

```
src/
├── components/
│   ├── Playground.tsx                    # Main playground component
│   └── playground/                       # Playground-specific components
│       ├── CategoryTabs.tsx             # Category navigation tabs
│       ├── FileDrop.tsx                 # File upload component
│       ├── HighContrastToggle.tsx       # Accessibility toggle
│       ├── LanguageSelector.tsx         # Language selection
│       ├── NormalPrintButton.tsx        # Print current view
│       ├── PrintButton.tsx              # Print full collage
│       ├── Tile.tsx                     # Individual feeling tile
│       └── Toast.tsx                    # Notification component
├── lib/playground/                      # Playground utilities
│   ├── types.ts                         # TypeScript type definitions
│   ├── feelings.ts                      # Feelings data and assets
│   ├── tts.ts                          # Text-to-speech functionality
│   └── compose.ts                      # Image composition utilities
└── assets/playground/                   # Playground assets
    └── feelings/                        # Feeling images organized by category
        ├── goodBody/                    # Good body feelings
        ├── goodFeelings/                # Good emotional feelings
        ├── badFeelings/                 # Bad emotional feelings
        ├── badBody/                     # Bad body feelings
        ├── goodEmotional.jpg            # Category images
        ├── badEmotional.jpg
        ├── goodPhysical.jpg
        └── badPhysical.jpg
```

## Key Features

### 1. Upload & Processing

- Drag-and-drop file upload with validation
- Support for JPG, PNG formats up to 5MB
- Face detection and moderation (placeholder implementation)
- Real-time processing feedback

### 2. Feelings Exploration

- 24 feelings organized in 4 categories
- Personalized image generation (placeholder implementation)
- Multi-language support (English, Spanish, Portuguese)
- Tap-to-speak functionality using Web Speech API

### 3. Accessibility

- Keyboard navigation support
- High contrast mode toggle
- Screen reader compatibility
- Large touch targets (44px minimum)
- Focus indicators and ARIA labels

### 4. Printing

- Print current category view
- Print full collage with all categories
- Print-optimized CSS styling

## Integration Points

### Routing

- Added `/playground` route to App.tsx
- Updated Header component navigation
- Mobile menu integration

### Dependencies

- Added `zustand` for state management
- All other dependencies already present in MaTalk Website

### Styling

- Uses Tailwind CSS classes consistent with MaTalk Website
- Responsive design for desktop and tablet
- Print-optimized styles

## Current Limitations

1. **AI Integration**: The image composition functionality is currently a placeholder. In a production environment, this would integrate with AI services like Google Gemini.

2. **Asset Management**: Images are currently imported as static assets. For production, consider using a CDN or dynamic asset loading.

3. **State Management**: Currently uses local component state. For a full implementation, consider using Zustand or similar state management.

4. **Error Handling**: Basic error handling is implemented. Production should include more robust error recovery and user feedback.

## Future Enhancements

1. **Real AI Integration**: Connect to actual AI services for image generation
2. **User Accounts**: Save and manage user-generated collages
3. **Sharing**: Social sharing functionality for generated collages
4. **Analytics**: Track usage patterns and user interactions
5. **Customization**: Allow users to customize feeling categories and labels

## Usage

To access the Playground:

1. Navigate to the MaTalk Website
2. Click "Playground" in the main navigation
3. Upload a photo with a clear face
4. Explore the different feeling categories
5. Tap tiles to hear them spoken aloud
6. Print collages for offline use

## Development Notes

- The playground is designed to be self-contained within the MaTalk Website
- All components use TypeScript for type safety
- Accessibility features are built-in from the start
- The design follows MaTalk's existing design system
- Print functionality works with standard browser print dialog

## Testing

To test the integration:

1. Start the development server: `npm run dev`
2. Navigate to `/playground`
3. Test file upload functionality
4. Test language switching
5. Test accessibility features
6. Test print functionality

The playground provides a comprehensive demonstration of MaTalk's technology while maintaining the professional appearance and functionality of the main website.
