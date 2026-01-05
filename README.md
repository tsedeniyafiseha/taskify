# Taskify - Premium Task Marketplace Platform

A modern, production-ready task marketplace platform for Christchurch, New Zealand. Built with Next.js 16, TypeScript, Tailwind CSS, and Framer Motion with **real images from Unsplash**.

## 🎨 Design Features

### Advanced UI/UX (Airtasker-Inspired)
- **Real Images**: Professional stock photos from Unsplash for tasks, categories, and taskers
- **Image Overlays**: Gradient overlays on images for better text readability
- **Glassmorphism Effects**: Modern glass-like components with backdrop blur
- **Gradient Animations**: Smooth animated gradients throughout the interface
- **Micro-interactions**: Hover effects, scale animations, and smooth transitions
- **Floating Elements**: Animated task cards with parallax effects
- **Mesh Gradients**: Sophisticated background patterns
- **Shimmer Effects**: Loading and hover shimmer animations
- **Scroll Animations**: Elements animate into view as you scroll
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop
- **Avatar Integration**: Real user avatars from Pravatar

### Professional UI Components
- **Testimonials Section**: Customer reviews with ratings and avatars
- **Trust Badges**: 6 trust indicators with gradient icons
- **Stats Counter**: Animated counting numbers with live stats
- **CTA Section**: Dual-column call-to-action with image grid
- **Newsletter**: Email subscription with success animation
- **FAQ Accordion**: Expandable questions with smooth animations
- **Comparison Table**: Feature comparison with checkmarks
- **Social Proof**: Real-time activity indicators

### Image Sources
- **Task Images**: Unsplash (cleaning, delivery, handyman, gardening, etc.)
- **Category Images**: Unsplash (category-specific professional photos)
- **Tasker Profiles**: Unsplash backgrounds + Pravatar avatars
- **All images optimized**: Next.js Image component with lazy loading

### Color System
- Black & White primary palette
- Gradient accents for categories and CTAs
- Subtle neutral tones for depth
- Status-based color coding (emerald for open, amber for in-progress)

## 📱 Pages

### 1. Landing Page (`/`)
- Hero section with animated floating task cards
- Animated stats bar with live metrics
- **Popular categories grid with real images**
- **Recent tasks showcase with task photos**
- How it works section
- **Featured taskers with profile images**
- Full-width footer

### 2. Browse Tasks (`/tasks`)
- Advanced filtering sidebar
- Category navigation bar
- Grid/List view toggle
- **Task cards with real images**
- Real-time task filtering
- Sort by newest, budget, offers
- Location-based filtering

### 3. Post a Task (`/post-task`)
- Multi-step form (4 steps)
  - Step 1: Task details (title, category, description)
  - Step 2: Location & date
  - Step 3: Budget (total or hourly)
  - Step 4: Review & submit
- Progress indicator
- Form validation
- Success confirmation

### 4. Become a Tasker (`/become-tasker`)
- Landing page with benefits
- How it works for taskers
- Application form with:
  - Personal information
  - Contact details
  - Location selection
  - Skills/categories
  - Experience level
  - Vehicle/tools checkboxes
- Success confirmation

### 5. How It Works (`/how-it-works`)
- Separate flows for posters and taskers
- Step-by-step guides
- Trust & safety features
- Dual CTAs

## 🎯 Key Features

### Visual Enhancements
- **Task Cards**: Feature images, gradient overlays, status badges on images
- **Category Cards**: Background images with glassmorphic icons
- **Tasker Profiles**: Profile photos with completion rate bars
- **Image Optimization**: Next.js Image component for performance
- **Lazy Loading**: Images load as you scroll

### For Task Posters
- Post tasks for free
- Receive multiple offers
- Compare tasker profiles with photos
- Secure payment system
- Review and rating system

### For Taskers
- Browse available tasks with images
- Make competitive offers
- Build reputation with profile photo
- Flexible schedule
- Secure payments

### Trust & Safety
- Verified tasker badges
- Rating and review system
- Secure payment escrow
- Insurance coverage
- Identity verification

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Images**: Next.js Image + Unsplash + Pravatar
- **Font**: System fonts (SF Pro Display, Inter)

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## 📂 Project Structure

```
taskify/
├── src/
│   ├── app/
│   │   ├── page.tsx                 # Landing page
│   │   ├── tasks/page.tsx           # Browse tasks
│   │   ├── post-task/page.tsx       # Post task form
│   │   ├── become-tasker/page.tsx   # Tasker signup
│   │   ├── how-it-works/page.tsx    # Info page
│   │   ├── layout.tsx               # Root layout
│   │   └── globals.css              # Global styles
│   ├── components/
│   │   ├── Header.tsx               # Navigation header
│   │   ├── Hero.tsx                 # Hero section
│   │   ├── Footer.tsx               # Footer
│   │   ├── TaskCard.tsx             # Task card with image
│   │   ├── TaskList.tsx             # Task list with filters
│   │   ├── CategoryBar.tsx          # Category navigation
│   │   ├── FilterSidebar.tsx        # Filter controls
│   │   ├── PopularCategories.tsx    # Category grid with images
│   │   ├── FeaturedTaskers.tsx      # Tasker profiles with photos
│   │   ├── RecentTasks.tsx          # Recent tasks with images
│   │   └── HowItWorksSection.tsx    # How it works
│   ├── data/
│   │   └── mockData.ts              # Mock data with image URLs
│   └── types/
│       └── index.ts                 # TypeScript types
├── next.config.ts                   # Next.js config (image domains)
└── public/                          # Static assets
```

## 🎨 Animation Features

- **Entrance Animations**: Staggered fade-in and slide-up effects
- **Hover Effects**: Scale, lift, and glow on hover
- **Image Zoom**: Images scale on hover
- **Scroll Parallax**: Elements move at different speeds
- **Floating Cards**: Continuous floating animation
- **Gradient Shifts**: Animated background gradients
- **Shimmer Loading**: Skeleton loading states
- **Micro-interactions**: Button presses, icon rotations
- **Page Transitions**: Smooth navigation transitions

## 🌍 Christchurch Localization

- All locations updated to Christchurch suburbs
- NZD currency throughout
- Local branding and messaging
- Christchurch-specific stats and metrics

## 📊 Mock Data

Includes realistic mock data for:
- 12 sample tasks with real Unsplash images
- 4 featured taskers with profile photos
- 10 categories with category-specific images
- 15 Christchurch locations
- Platform statistics
- Real avatars from Pravatar

## 🖼️ Image Configuration

Images are configured in `next.config.ts`:
```typescript
images: {
  remotePatterns: [
    { protocol: 'https', hostname: 'images.unsplash.com' },
    { protocol: 'https', hostname: 'i.pravatar.cc' },
  ],
}
```

## 🎯 Design Inspiration

This platform is inspired by:
- **Airtasker**: Task cards with images, category layout
- **Airbnb**: Clean design, image-first approach
- **Upwork**: Professional tasker profiles
- **Fiverr**: Category browsing experience

## 📄 License

This project is built for demonstration purposes.

## 🤝 Contributing

This is a showcase project. Feel free to fork and customize for your needs.

---

Built with ❤️ in Christchurch, New Zealand
