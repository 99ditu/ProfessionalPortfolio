# Personal Portfolio Website

## Overview

This is a full-stack personal portfolio website built with React frontend and Express backend. The application showcases a professional portfolio with contact functionality, resume download, and modern UI components. It uses TypeScript throughout the stack and implements a modern component-based architecture with shadcn/ui components.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: React Hook Form for form handling, TanStack Query for server state
- **Routing**: Wouter for client-side routing
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Session Management**: Express sessions with PostgreSQL store
- **File Serving**: Static file serving for resume downloads
- **API**: RESTful API endpoints for contact form and resume access

### Component Structure
- **UI Components**: Comprehensive shadcn/ui component library including forms, dialogs, navigation, and data display components
- **Pages**: Home page with portfolio sections and 404 error handling
- **Hooks**: Custom hooks for mobile detection and toast notifications

## Key Components

### Database Schema
- **Contacts Table**: Stores contact form submissions with fields for name, email, company, message, and timestamp
- **Data Validation**: Zod schemas for both frontend and backend validation
- **Type Safety**: Full TypeScript integration with Drizzle ORM

### API Endpoints
- `POST /api/contact` - Submit contact form
- `GET /api/resume` - Download resume file
- `GET /api/contacts` - Retrieve all contact submissions (admin)

### Frontend Features
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Form Handling**: React Hook Form with Zod validation
- **Toast Notifications**: User feedback for form submissions
- **Progress Tracking**: Scroll progress indicators
- **Mobile Menu**: Collapsible navigation for mobile devices

## Data Flow

1. **Contact Form Submission**:
   - User fills out contact form on homepage
   - Frontend validates data using Zod schema
   - Form data sent to `/api/contact` endpoint
   - Backend validates and stores in database
   - Success/error feedback displayed via toast

2. **Resume Download**:
   - User clicks download resume button
   - Request sent to `/api/resume` endpoint
   - Backend serves PDF file from attached assets
   - File downloaded to user's device

3. **Contact Management**:
   - Admin can access `/api/contacts` to view submissions
   - Data retrieved from database and returned as JSON

## External Dependencies

### Frontend Dependencies
- **React Ecosystem**: React, React DOM, React Hook Form
- **UI Components**: Radix UI primitives, shadcn/ui components
- **Styling**: Tailwind CSS, class-variance-authority, clsx
- **Data Fetching**: TanStack Query
- **Form Validation**: Zod, @hookform/resolvers
- **Date Handling**: date-fns
- **Icons**: Lucide React

### Backend Dependencies
- **Server Framework**: Express.js
- **Database**: Drizzle ORM, @neondatabase/serverless
- **Session Management**: express-session, connect-pg-simple
- **Validation**: Zod, drizzle-zod
- **Development**: tsx, esbuild

### Development Tools
- **Build Tools**: Vite, esbuild
- **Type Checking**: TypeScript
- **CSS Processing**: PostCSS, Autoprefixer
- **Development Server**: Vite dev server with HMR

## Deployment Strategy

### Build Process
1. Frontend builds to `dist/public` directory using Vite
2. Backend compiles to `dist/index.js` using esbuild
3. Static assets served from build directory in production

### Environment Configuration
- **Development**: Uses tsx for TypeScript execution and Vite dev server
- **Production**: Serves compiled JavaScript with static file serving
- **Database**: PostgreSQL connection via DATABASE_URL environment variable

### Scripts
- `dev`: Development server with hot reload
- `build`: Production build for both frontend and backend
- `start`: Production server startup
- `check`: TypeScript type checking
- `db:push`: Database schema migration

## Changelog

Changelog:
- July 08, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.