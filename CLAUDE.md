# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React-based charity/foundation website built with Vite, TypeScript, and shadcn/ui components. The project appears to be for "Yayasan Harapan Negeri" (Hope of the Nation Foundation), focusing on social programs, donations, and community involvement.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (port 8080)
npm run dev

# Build for production
npm run build

# Build for development mode
npm run build:dev

# Run linter
npm run lint

# Preview production build
npm run preview

# Serve production build
npm start
```

## Architecture & Structure

### Core Technologies
- **Build Tool**: Vite with React SWC plugin
- **Framework**: React 18 with React Router v6
- **Language**: TypeScript with relaxed strictness settings
- **Styling**: Tailwind CSS with custom theme configuration
- **UI Components**: shadcn/ui component library (all components in `src/components/ui/`)
- **State Management**: React Query (@tanstack/react-query) for server state
- **Forms**: React Hook Form with Zod validation

### Project Structure

```
src/
├── components/       # Shared components
│   ├── ui/          # shadcn/ui components (40+ components)
│   ├── Layout.tsx   # Main layout wrapper with Header/Footer
│   ├── Header.tsx   # Site navigation
│   ├── Footer.tsx   # Site footer
│   └── *Loader*.tsx # Various loader components
├── pages/           # Route components
├── hooks/           # Custom React hooks
├── lib/             # Utility functions
└── assets/          # Static assets (images)
```

### Key Architectural Patterns

1. **Routing**: Single-page application with React Router, all routes defined in `App.tsx`
2. **Component Library**: Uses shadcn/ui pattern - components are copied into `src/components/ui/` rather than imported from npm
3. **Path Aliasing**: `@/` maps to `./src/` directory for clean imports
4. **Query Management**: TanStack Query wraps the entire app for data fetching
5. **Toast Notifications**: Dual toast system (Toaster and Sonner) available globally
6. **Loader System**: Custom LoaderWrapper and RouteLoader components for loading states

### TypeScript Configuration

The project uses relaxed TypeScript settings:
- `noImplicitAny: false`
- `strictNullChecks: false`
- `noUnusedLocals: false`
- `noUnusedParameters: false`

ESLint is configured to ignore unused variables and explicit any types.

### Styling System

Tailwind CSS with extensive custom theme including:
- Custom color scheme with primary, secondary, and extended Yayasan palette
- CSS variables for dynamic theming
- Custom shadows, transitions, and gradients
- Dark mode support via class strategy

### Current Routes

- `/` - Home page
- `/about` - About page
- `/programs` - Programs listing
- `/donate` - Donation page
- `/events` - Events listing
- `/get-involved` - Volunteer/involvement page
- `/news` - News/updates
- `/contact` - Contact information
- `*` - 404 Not Found page

### Development Notes

- The project uses Lovable platform for deployment and collaborative development
- Port 8080 is used for development server
- Components are tagged in development mode using `lovable-tagger`
- The project follows a charity/NGO website pattern with emphasis on donations, programs, and community engagement