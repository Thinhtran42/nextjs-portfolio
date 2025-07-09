# Thinh Tran - Portfolio Website

A modern, responsive portfolio website showcasing my journey as a Backend Developer, built with Next.js and TypeScript. Features a beautiful macOS-inspired glassmorphism design with floating animations and smooth transitions.

## ✨ Features

- **macOS-Style Design** - Glassmorphism effects with floating orbs and blur backgrounds
- **Responsive Layout** - Optimized for all screen sizes
- **Dark/Light Theme** - Automatic theme switching with `next-themes`
- **Smooth Animations** - Custom CSS animations with intersection observers
- **Interactive Components** - Hover effects and transitions
- **SEO Optimized** - Complete metadata and structured data
- **TypeScript** - Full type safety throughout the codebase

## 🛠️ Tech Stack

- **Framework:** Next.js 13.5.1
- **Language:** TypeScript
- **Styling:** Tailwind CSS with custom macOS-style utilities
- **UI Components:** Shadcn/ui + Radix UI primitives
- **Icons:** Lucide React
- **Theme Management:** next-themes
- **Animations:** Custom CSS with tailwindcss-animate

## 🎨 Design Highlights

- **Glassmorphism UI** - Translucent cards with backdrop blur effects
- **Floating Orbs** - Animated background elements with gradient colors
- **macOS-inspired** - Clean, modern aesthetic inspired by Apple's design language
- **Gradient Backgrounds** - Dynamic color shifting backgrounds
- **Hover Interactions** - 3D transform effects on cards and buttons

## 📂 Project Sections

- **Hero** - Animated typewriter effect showcasing multiple developer roles
- **About** - Professional background and passion for clean code
- **Skills** - Categorized tech stack (Backend, Mobile, Database, DevOps)
- **Projects** - Featured work including APIs, microservices, and mobile apps
- **Experience** - Professional timeline with Golang and .NET experience
- **Contact** - Social links and contact information

## 🚀 Quick Start

1. **Clone the repository**

   ```bash
   git clone https://github.com/Thinhtran42/portfolio
   cd project
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run development server**

   ```bash
   npm run dev
   ```

4. **Open browser**
   Visit `http://localhost:3000`

## 📁 Project Structure

```
├── app/
│   ├── globals.css          # Custom macOS styles & animations
│   ├── layout.tsx           # Root layout with metadata
│   └── page.tsx            # Main page composition
├── components/
│   ├── ui/                 # Shadcn/ui components (30+ components)
│   ├── hero.tsx            # Animated hero section
│   ├── about.tsx           # About section
│   ├── skills.tsx          # Skills with categorized layout
│   ├── projects.tsx        # Featured projects showcase
│   ├── experience.tsx      # Professional timeline
│   ├── contact.tsx         # Contact information
│   └── theme-provider.tsx  # Theme management
├── hooks/
│   └── use-toast.ts        # Toast notifications
├── lib/
│   └── utils.ts            # Utility functions
└── public/
    └── images/
        └── avatar.png      # Profile image
```

## 🔧 Customization

### Personal Information

- **Name & Title:** `app/layout.tsx` (metadata) + `components/hero.tsx`
- **Avatar:** Replace `public/images/avatar.png`
- **Social Links:** Update GitHub/LinkedIn URLs in `components/hero.tsx`

### Content Updates

- **Skills:** Edit categories and technologies in `components/skills.tsx`
- **Projects:** Add your projects array in `components/projects.tsx`
- **Experience:** Update work history in `components/experience.tsx`
- **About:** Modify description in `components/about.tsx`

### Styling

- **Colors:** Adjust gradient colors in `app/globals.css`
- **Animations:** Customize floating orb animations
- **Glass Effects:** Modify backdrop blur and transparency values

## 🎯 Featured Technologies

**Backend Development:**

- Golang, C#/.NET, Python/FastAPI, Java/Spring Boot

**Mobile Development:**

- Android Development, Kotlin, Jetpack Compose

**Databases:**

- MongoDB, PostgreSQL, SQL Server, Redis

**Tools & DevOps:**

- Git/GitHub, Docker, Microservices, RESTful APIs

---

**Built with ❤️ by Thinh Tran** | Backend Developer | Ho Chi Minh City, Vietnam
