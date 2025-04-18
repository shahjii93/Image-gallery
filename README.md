# Image Gallery Assignment

A modern, responsive image gallery application built with Next.js and Material-UI that allows users to upload, categorize, filter, and annotate images.

## Features

### Image Management
- Upload multiple images with preview
- Support for various image formats (SVG, PNG, JPG, JPEG)
- File size validation (max 5MB per image)
- Delete images with confirmation
- Real-time image preview
- Responsive grid layout


### Categories
- Create, edit, and delete categories
- Assign multiple categories to images
- Filter images by categories
- Search categories
- Category management drawer

### Search & Filter
- Search images by:
  - Name
  - Resolution
  - File size
  - Description
- Real-time search results
- Combined category and search filtering
- Clear search functionality

### UI/UX
- Responsive design for all screen sizes
- Loading states with spinners
- Error handling with user feedback
- Toast notifications
- Elegant animations and transitions
- Modern Material-UI components
- Intuitive drag-and-drop upload

### Additional Features
- Image annotation capability
- Metadata display (size, resolution, upload date)
- Category chips with delete functionality
- Beautiful hover effects
- Clean and modern interface

## Tech Stack

- **Frontend Framework**: Next.js
- **UI Library**: Material-UI (MUI)
- **State Management**: React Hooks
- **API Integration**: Axios
- **Styling**: Styled Components & MUI Styling System
- **Image Handling**: React Window for virtualization

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev

```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── app/                    # Next.js app directory
├── components/            # Reusable components
│   ├── ImageList/        # Image grid component
│   ├── ImageUpload/      # Image upload component
│   ├── CategoryDrawer/   # Category management
│   ├── FilterDrawer/     # Filter interface
│   └── Modal/            # Reusable modal component
├── hooks/                # Custom React hooks
├── services/            # API service functions
└── styles/              # Global styles and themes
```

