# Admin Dashboard Theme Documentation

This document provides a comprehensive overview of the theme, colors, hover effects, button styles, and icons used in this admin dashboard project. Use this as a reference to replicate the same design system in other projects.

## Table of Contents
1. [Color Palette](#color-palette)
2. [Button Styles](#button-styles)
3. [Table Hover Effects](#table-hover-effects)
4. [Icons](#icons)
5. [Hover Effects & Animations](#hover-effects--animations)
6. [Shadows & Glows](#shadows--glows)
7. [Typography](#typography)
8. [Status Badges](#status-badges)
9. [Glass Morphism Effects](#glass-morphism-effects)

---

## Color Palette

### Primary Colors
```css
--primary: #3b82f6;        /* Blue - Primary actions */
--primary-dark: #1d4ed8;   /* Dark Blue - Hover states */
--accent: #8b5cf6;         /* Purple - Accent elements */
```

### Semantic Colors
```css
--success: #10b981;        /* Green - Success states */
--warning: #f59e0b;        /* Amber/Orange - Warning states */
--error: #ef4444;          /* Red - Error states */
```

### Background Colors
```css
--background: #ffffff;      /* Light mode background */
--foreground: #171717;     /* Light mode text */
--glass: rgba(255, 255, 255, 0.1);        /* Glass morphism light */
--glass-dark: rgba(0, 0, 0, 0.1);         /* Glass morphism dark */
```

### Dark Mode Colors
```css
--background: #0a0a0a;     /* Dark mode background */
--foreground: #ededed;     /* Dark mode text */
--glass: rgba(255, 255, 255, 0.05);       /* Glass morphism dark mode */
--glass-dark: rgba(0, 0, 0, 0.2);         /* Glass morphism dark mode */
```

### Tailwind Color Classes Used
- **Blue**: `blue-50`, `blue-100`, `blue-500`, `blue-600`, `blue-700`, `blue-800`, `blue-900`
- **Green**: `green-100`, `green-600`, `green-700`, `green-800`, `emerald-500`, `emerald-600`
- **Red**: `red-100`, `red-500`, `red-600`, `red-700`, `red-800`, `red-900`
- **Yellow**: `yellow-100`, `yellow-500`, `amber-500`
- **Purple**: `purple-100`, `purple-500`, `purple-600`
- **Gray**: `gray-50`, `gray-100`, `gray-200`, `gray-300`, `gray-400`, `gray-500`, `gray-600`, `gray-700`, `gray-800`, `gray-900`

---

## Button Styles

### Primary Button (Blue Gradient)
```jsx
className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 hover:shadow-md shadow-sm"
```

**Characteristics:**
- Gradient background: `from-blue-600 to-blue-700`
- Hover: `from-blue-700 to-blue-800`
- Scale transform: `hover:scale-105`
- Shadow: `hover:shadow-md`
- Transition: `duration-300`

### Secondary Button (Green Gradient)
```jsx
className="flex items-center px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-300 transform hover:scale-105 hover:shadow-md shadow-sm"
```

### Standard Primary Button (Solid Blue)
```jsx
className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
```

### Cancel/Secondary Button (Gray)
```jsx
className="px-8 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors duration-200"
```

### Icon Buttons (Edit/Delete)
```jsx
// Edit Button
className="text-blue-600 hover:text-blue-900 transition-colors duration-300 p-2 rounded-full hover:bg-blue-100"

// Delete Button
className="text-red-600 hover:text-red-900 transition-colors duration-300 p-2 rounded-full hover:bg-red-100"
```

### Button Sizes
- **Small**: `px-4 py-2 text-sm`
- **Medium**: `px-6 py-3 text-base`
- **Large**: `px-8 py-3 lg:px-10 lg:py-4 text-base lg:text-lg`

---

## Table Hover Effects

### Standard Table Row Hover
```jsx
className="hover:bg-gray-50 transition-colors duration-200"
```

### Enhanced Table Row Hover (Gradient with Transform)
```jsx
className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-gray-50 transition-all duration-500 ease-out transform hover:scale-[1.02] hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-100 border border-transparent hover:border-blue-200 rounded-lg"
```

**Characteristics:**
- Gradient background on hover: `from-blue-50 to-gray-50`
- Scale transform: `hover:scale-[1.02]`
- Vertical translation: `hover:-translate-y-1`
- Shadow: `hover:shadow-xl hover:shadow-blue-100`
- Border: `hover:border-blue-200`
- Transition: `duration-500 ease-out`

### Table Header
```jsx
className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider border-b border-gray-200 bg-gray-50"
```

### Table Cell
```jsx
className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
```

---

## Icons

### Icon Libraries Used
1. **Lucide React** (`lucide-react`) - Primary icon library
2. **React Icons** (`react-icons`) - Secondary icon library (Feather Icons)

### Common Icons from Lucide React
```jsx
import {
  // Navigation & Actions
  Plus, Edit, Trash2, Search, Filter, X, ArrowLeft,
  // User & Profile
  User, Users, Shield, Mail, Phone, MapPin,
  // Products & Orders
  Package, ShoppingCart, Star, Tag, Building,
  // Services
  Wrench, Calendar, Clock,
  // Status & Feedback
  CheckCircle, AlertCircle, AlertTriangle, Info, Check, CheckCheck,
  // UI Elements
  Bell, Download, Upload, Settings, MoreVertical,
  // Editor
  Bold, Italic, Underline, Strikethrough, List, ListOrdered,
  AlignLeft, AlignCenter, AlignRight, Link, Image, Palette,
  Heading1, Heading2, Heading3, Quote, Code, Undo, Redo,
  // Misc
  TrendingUp, RefreshCw, Loader2
} from 'lucide-react';
```

### Common Icons from React Icons (Feather)
```jsx
import {
  FiX, FiEdit, FiTrash2, FiStar, FiPackage, FiTag,
  FiCalendar, FiUser, FiClock, FiMapPin, FiCheckCircle,
  FiXCircle, FiInfo, FiFilter
} from 'react-icons/fi';
```

### Icon Usage Patterns
- **Size**: Typically `w-4 h-4` (small), `w-5 h-5` (medium), `w-6 h-6` (large)
- **Color**: Inherits from parent or uses semantic colors (`text-blue-600`, `text-red-600`, etc.)
- **Hover Effects**: Icons often have `transition-transform` and may rotate or scale on hover

---

## Hover Effects & Animations

### Card Hover Effect
```css
.hover-lift:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: var(--shadow-heavy), var(--glow);
}
```

### Glow Hover Effect
```css
.hover-glow:hover {
  box-shadow: var(--glow);
  transform: scale(1.05);
}
```

### Crystal Hover Effect (Shimmer)
```css
.hover-crystal {
  position: relative;
  overflow: hidden;
}

.hover-crystal::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

.hover-crystal:hover::before {
  left: 100%;
}

.hover-crystal:hover {
  transform: translateY(-5px) scale(1.03);
  box-shadow: var(--shadow-heavy), var(--glow);
}
```

### Dashboard Card Hover
```jsx
className="bg-white rounded-xl p-6 shadow-lg transition-all duration-500 ease-out transform hover:scale-105 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-100 border border-transparent hover:border-blue-100"
```

### Icon Bounce Animation
```css
@keyframes icon-bounce {
  0%   { transform: translateY(0); }
  30%  { transform: translateY(-8px) rotate(-10deg); }
  60%  { transform: translateY(4px) rotate(10deg); }
  100% { transform: translateY(0); }
}
```

### Animation Classes
- `animate-float`: Floating animation (3s infinite)
- `animate-glow`: Glow pulse animation (2s infinite)
- `animate-pulse-slow`: Slow pulse (3s infinite)
- `animate-slide-in`: Slide in from bottom (0.6s)
- `animate-fade-in`: Fade in (0.4s)
- `animate-scale-in`: Scale in (0.3s)

---

## Shadows & Glows

### Shadow Variables
```css
--shadow-light: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
--shadow-medium: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
--shadow-heavy: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
```

### Glow Effects
```css
--glow: 0 0 20px rgba(59, 130, 246, 0.3);        /* Blue glow */
--glow-accent: 0 0 20px rgba(139, 92, 246, 0.3); /* Purple glow */
```

### Common Shadow Classes
- `shadow-sm`: Small shadow
- `shadow-md`: Medium shadow
- `shadow-lg`: Large shadow
- `shadow-xl`: Extra large shadow
- `shadow-2xl`: 2X large shadow
- `shadow-blue-100`: Blue tinted shadow

---

## Typography

### Font Family
```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
```

### Text Colors
- Primary: `text-gray-900` (dark text)
- Secondary: `text-gray-600` (medium gray)
- Tertiary: `text-gray-500` (light gray)
- Muted: `text-gray-400` (very light gray)

### Text Sizes
- `text-xs`: 0.75rem (12px) - Table headers, badges
- `text-sm`: 0.875rem (14px) - Body text, labels
- `text-base`: 1rem (16px) - Default body
- `text-lg`: 1.125rem (18px) - Subheadings
- `text-xl`: 1.25rem (20px) - Headings
- `text-2xl`: 1.5rem (24px) - Large headings
- `text-3xl`: 1.875rem (30px) - Stats, large numbers

### Font Weights
- `font-medium`: 500 - Labels, buttons
- `font-semibold`: 600 - Headings, important text
- `font-bold`: 700 - Emphasis

---

## Status Badges

### Status Badge Colors
```jsx
// Success/Active
className="bg-green-100 text-green-800" // or "bg-green-100 text-green-700"

// Error/Inactive
className="bg-red-100 text-red-800" // or "bg-red-100 text-red-700"

// Warning/Pending
className="bg-yellow-100 text-yellow-800" // or "bg-amber-500 text-white"

// Info/Processing
className="bg-blue-100 text-blue-800"

// Neutral
className="bg-gray-100 text-gray-800"
```

### Badge Styles
```jsx
// Rounded Full (Pill)
className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"

// Rounded (Standard)
className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800"
```

### Order Status Colors
```jsx
// Completed
className="bg-emerald-500 text-white"

// Pending
className="bg-amber-500 text-white"

// Cancelled
className="bg-red-500 text-white"

// Scheduled
className="bg-blue-500 text-white"

// In Progress
className="bg-purple-500 text-white"
```

---

## Glass Morphism Effects

### Glass Effect Class
```css
.glass {
  background: var(--glass);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: var(--shadow-medium);
}
```

### Glass Dark Class
```css
.glass-dark {
  background: var(--glass-dark);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: var(--shadow-medium);
}
```

---

## Scrollbar Styling

### Custom Scrollbar
```css
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(45deg, #64748b, #94a3b8);
  border-radius: 10px;
  transition: all 0.3s ease;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(45deg, #94a3b8, #64748b);
  box-shadow: 0 0 20px rgba(100, 116, 139, 0.3);
}
```

### Thin Scrollbar (for dropdowns)
```css
.scrollbar-thin {
  scrollbar-width: thin;
  scrollbar-color: #cbd5e0 #f7fafc;
}
```

---

## Focus States

### Focus Ring
```css
.focus-ring:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3), var(--glow);
  transform: scale(1.02);
}
```

### Tailwind Focus Classes
```jsx
className="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
```

---

## Transitions

### Standard Transitions
- `transition-colors`: Color changes (200-300ms)
- `transition-all`: All properties (300ms)
- `transition-transform`: Transform only (200-300ms)

### Transition Durations
- `duration-200`: 200ms (fast)
- `duration-300`: 300ms (standard)
- `duration-500`: 500ms (smooth)

### Transition Timing Functions
- `ease-out`: Standard easing
- `ease-in-out`: Smooth start and end
- `cubic-bezier(0.4, 0, 0.2, 1)`: Custom smooth curve

---

## Implementation Examples

### Example: Dashboard Stat Card
```jsx
<button 
  className="bg-white rounded-xl p-6 shadow-lg transition-all duration-500 ease-out transform hover:scale-105 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-100 border border-transparent hover:border-blue-100 cursor-pointer group"
>
  <div className="flex items-center justify-between">
    <div>
      <p className="text-sm font-medium text-gray-600">Total Users</p>
      <p className="text-3xl font-semibold text-gray-800">{count}</p>
    </div>
    <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center group-hover:bg-blue-600 transition-colors">
      <Users className="w-6 h-6 text-white" />
    </div>
  </div>
</button>
```

### Example: Primary Action Button
```jsx
<button
  className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 hover:shadow-md shadow-sm"
>
  <Plus className="w-4 h-4 mr-2" />
  Add New
</button>
```

### Example: Table Row with Hover
```jsx
<tr className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-gray-50 transition-all duration-500 ease-out transform hover:scale-[1.02] hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-100 border border-transparent hover:border-blue-200 rounded-lg">
  <td className="px-6 py-4 text-sm text-gray-900">Content</td>
</tr>
```

---

## Summary

### Key Design Principles
1. **Gradient Buttons**: Primary actions use blue/green gradients
2. **Smooth Transitions**: All interactions have 200-500ms transitions
3. **Transform Effects**: Hover states use scale and translate transforms
4. **Shadow Depth**: Multiple shadow levels for visual hierarchy
5. **Color Consistency**: Blue for primary, Green for success, Red for danger
6. **Icon Integration**: Lucide React as primary, React Icons as secondary
7. **Glass Morphism**: Used for modern overlay effects
8. **Responsive Design**: Mobile-first with responsive breakpoints

### Color Scheme Summary
- **Primary**: Blue (#3b82f6)
- **Success**: Green (#10b981)
- **Warning**: Amber/Orange (#f59e0b)
- **Error**: Red (#ef4444)
- **Accent**: Purple (#8b5cf6)
- **Neutral**: Gray scale (50-900)

---

**Note**: This theme is designed for a modern, futuristic admin dashboard with smooth animations and professional aesthetics. All colors and effects are optimized for both light and dark mode support.

