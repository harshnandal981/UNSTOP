# 🏨 The Royal Palace - Hotel Reservation System

A production-grade luxury hotel room reservation system built with Next.js 14, TypeScript, TailwindCSS, and Framer Motion.

## ✨ Features

### Core Functionality
- **97 Rooms Across 10 Floors**: Floors 1-9 have 10 rooms each, Floor 10 has 7 rooms
- **Intelligent Booking Algorithm**: Optimizes room selection to minimize travel time
- **Travel Time Calculation**: Vertical (2 min/floor) + Horizontal (1 min/room)
- **Real-time Availability**: Visual feedback for available, occupied, and booked rooms
- **Random Occupancy Generator**: Simulate realistic hotel occupancy
- **Complete Reset**: Clear all bookings and occupancy states

### Booking Logic
1. **Same-Floor Priority**: Attempts to book all rooms on the same floor first
2. **Travel Time Optimization**: If multi-floor booking is needed, minimizes the total travel span
3. **Greedy Algorithm**: Selects rooms closest to lift when possible
4. **Smart Allocation**: Maximum 5 rooms per booking

### Luxury UI Design
- **Dark Theme with Gold Accents**: Premium 5-star hotel aesthetics
- **Glassmorphism Panels**: Modern backdrop-blur effects
- **Smooth Animations**: Framer Motion powered transitions
- **Interactive Room Cards**: Hover effects with detailed tooltips
- **Responsive Grid Layout**: Adapts to all screen sizes
- **Real-time Stats Display**: Booked rooms count and travel time

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository
```bash
git clone https://github.com/harshnandal981/UNSTOP.git
cd UNSTOP
git checkout feature/hotel-reservation-system
```

2. Install dependencies
```bash
npm install
```

3. Run the development server
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
├── app/
│   ├── page.tsx           # Main page component
│   ├── layout.tsx         # Root layout with metadata
│   └── globals.css        # Global styles with custom scrollbar
├── components/
│   ├── HotelDashboard.tsx # Main dashboard with booking logic
│   ├── Controls.tsx       # Control panel with inputs and buttons
│   ├── HotelGrid.tsx      # Grid container for all floors
│   ├── FloorRow.tsx       # Individual floor with lift indicator
│   └── RoomCard.tsx       # Individual room card with animations
├── package.json           # Dependencies and scripts
├── tailwind.config.ts     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
└── next.config.js         # Next.js configuration
```

## 🎯 Algorithm Details

### Room Generation
- Floors 1-9: Rooms X01 to X10 (where X is floor number)
- Floor 10: Rooms 1001 to 1007
- Total: 97 rooms

### Travel Time Formula
```typescript
travelTime = |floorA - floorB| * 2 + |positionA - positionB| * 1
```

### Booking Strategy
1. **Check Same Floor**: Find any floor with enough available rooms
2. **Multi-Floor Fallback**: Use greedy algorithm to minimize travel span
3. **Greedy Selection**: Start with one room, iteratively add closest available rooms
4. **Optimization**: Evaluate multiple starting points to find global minimum

### Travel Span Calculation
The system calculates the maximum travel time between any two rooms in the booked set to ensure guests have minimal walking distance.

## 🎨 Design System

### Color Palette
- **Background**: Slate 950 → Slate 900 gradient
- **Primary Accent**: Amber 400 → Yellow 500
- **Success (Booked)**: Emerald 500 → Teal 500
- **Error (Occupied)**: Red 950 → Red 900
- **Neutral**: Slate 800 borders and panels

### Typography
- **Headings**: Inter font family, bold weights
- **Body**: Inter regular
- **Labels**: Uppercase tracking with amber accents

### Animation Timing
- **Fade In**: 0.3-0.5s
- **Hover Scale**: 1.02-1.1x
- **Stagger Delay**: 0.02-0.05s per item
- **Glow Pulse**: 2s infinite loop

## 🔧 Technical Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS 3.4+
- **Animations**: Framer Motion 11+
- **Icons**: Heroicons (embedded SVG)
- **Font**: Inter (Google Fonts)

## 📊 Status States

| State | Color | Border | Shadow | Description |
|-------|-------|--------|--------|-------------|
| Available | Slate 800 | Slate 700 | None | Ready for booking |
| Booked | Emerald/Teal | Emerald 500 | Glow | Recently reserved |
| Occupied | Red 950 | Red 900 | None | Already taken |

## 🎮 User Controls

### Number Input
- Range: 1-5 rooms
- Real-time validation
- Accessible keyboard controls

### Book Rooms Button
- Primary action with gradient background
- Executes booking algorithm
- Shows alert if insufficient rooms

### Random Occupancy Button
- 30% probability per room
- Preserves existing bookings
- Simulates realistic scenarios

### Reset All Button
- Clears all bookings and occupancy
- Resets travel time to 0
- Regenerates initial state

## 🏗️ Build and Deploy

### Production Build
```bash
npm run build
npm start
```

### Environment
- Node.js 18+
- Next.js 14.2.5
- React 18.3.1

### Deployment
Ready for deployment on:
- Vercel (recommended)
- Netlify
- AWS Amplify
- Any Node.js hosting platform

## 📄 License

MIT License - feel free to use this project for learning or commercial purposes.

## 👨‍💻 Author

Built with ❤️ for UNSTOP challenge

---

**Note**: This is a production-ready application with complete functionality, optimized algorithms, and luxury UI/UX design.