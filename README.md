# Luxe Grand Hotel - Premium Room Reservation System

A premium, luxury hotel room reservation system built with Next.js App Router, featuring intelligent booking algorithms and smooth animations.

## Features

### Hotel Model
- **97 rooms** across **10 floors**
  - Floors 1-9: 10 rooms each (101-110, 201-210, ..., 901-910)
  - Floor 10: 7 rooms (1001-1007)
- Layout: Lift/stairs on the LEFT, rooms arranged left-to-right

### Travel Time Rules
- **Horizontal**: 1 minute per adjacent room
- **Vertical**: 2 minutes per floor difference

### Booking Features
- Book **1-5 rooms** at a time
- **Smart allocation algorithm**:
  1. Prioritizes rooms on the **same floor**
  2. If not possible, minimizes **total travel time** between first and last room
  3. Allocates across floors if needed, optimizing travel time
- **Random Occupancy** button for testing scenarios
- **Reset All** button to clear bookings and occupancy
- Real-time **travel time calculation** and display
- Live stats: Available, Occupied, and Booked room counts

### UI/UX
- **Luxury 5-star dashboard** with dark theme and gold accents
- **Glassmorphism** panels with backdrop blur
- Smooth **micro-interactions** and animations
- **Hover glow effects** on available rooms
- Animated booking transitions using **Framer Motion**
- Elegant typography for floor labels
- Room status indicators:
  - **Available**: Neutral (○)
  - **Occupied**: Gray/Red (✕)
  - **Booked**: Gold/Green (✓)

## Tech Stack

- **Next.js 16** (App Router)
- **TypeScript**
- **TailwindCSS** (with custom gold color palette)
- **Framer Motion** (for animations)

## Project Structure

```
├── app/
│   ├── page.tsx           # Main reservation page (client component)
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/
│   ├── Room.tsx           # Individual room component
│   └── FloorView.tsx      # Floor visualization component
├── lib/
│   └── hotelUtils.ts      # Core booking logic and utilities
├── types/
│   └── hotel.ts           # TypeScript type definitions
├── tailwind.config.ts     # TailwindCSS configuration
├── tsconfig.json          # TypeScript configuration
└── next.config.js         # Next.js configuration
```

## Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/harshnandal981/UNSTOP.git
cd UNSTOP
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

### Build for Production

```bash
npm run build
npm start
```

## How to Use

1. **Enter the number of rooms** you want to book (1-5)
2. Click **"Book Rooms"** to allocate rooms using the smart algorithm
3. View the **travel time** calculated between the first and last booked room
4. Use **"Random Occupancy"** to simulate a partially occupied hotel
5. Click **"Reset All"** to clear all bookings and start fresh

## Booking Algorithm

The system uses an intelligent algorithm to find the best rooms:

### Strategy 1: Same Floor Priority
- Searches each floor to find enough available rooms on a single floor
- Returns consecutive or nearby rooms on the same floor

### Strategy 2: Cross-Floor Optimization
- If single floor is not possible, allocates rooms across multiple floors
- Minimizes total travel time from first to last room
- Considers both vertical (floor difference) and horizontal (room position) distances

### Example Calculations

**Same floor booking (5 rooms on Floor 1)**:
- Rooms: 101, 102, 103, 104, 105
- Travel time: 4 minutes (horizontal distance from 101 to 105)

**Cross-floor booking scenario**:
- Vertical: 2 floors × 2 min/floor = 4 minutes
- Horizontal: 3 rooms × 1 min/room = 3 minutes
- Total: 7 minutes

## Security

- ✅ CodeQL security scan passed with 0 vulnerabilities
- ✅ Input validation prevents invalid room counts
- ✅ Safe state management to prevent booking occupied rooms
- ✅ Preserved booking state during random occupancy updates

## Screenshots

### Initial State - All Rooms Available
![Initial State](https://github.com/user-attachments/assets/36c6375e-acc7-48d4-bf51-afbe1707a813)

### Single Room Booking
![Single Booking](https://github.com/user-attachments/assets/2967a51d-416b-4bf4-a980-fae2cb762e7b)

### Multiple Rooms Booking (Same Floor)
![Multiple Bookings](https://github.com/user-attachments/assets/90bc14a9-3753-41d8-abf6-0c40d31a5500)

### Booking with Partial Occupancy
![With Occupancy](https://github.com/user-attachments/assets/1eb6a274-4056-4b85-998a-492714214069)

## License

ISC

## Author

Built with ❤️ for UNSTOP
