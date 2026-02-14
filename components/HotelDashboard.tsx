'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Controls from './Controls';
import HotelGrid from './HotelGrid';

export type RoomStatus = 'available' | 'occupied' | 'booked';

export interface Room {
  id: number;
  floor: number;
  position: number;
  status: RoomStatus;
}

/**
 * Generate all 97 hotel rooms across 10 floors
 * Floors 1-9: 10 rooms each (101-110, 201-210, etc.)
 * Floor 10: 7 rooms (1001-1007)
 */
const generateHotelRooms = (): Room[] => {
  const rooms: Room[] = [];
  
  // Floors 1-9: 10 rooms each
  for (let floor = 1; floor <= 9; floor++) {
    for (let position = 1; position <= 10; position++) {
      rooms.push({
        id: floor * 100 + position,
        floor,
        position,
        status: 'available',
      });
    }
  }
  
  // Floor 10: 7 rooms only
  for (let position = 1; position <= 7; position++) {
    rooms.push({
      id: 1000 + position,
      floor: 10,
      position,
      status: 'available',
    });
  }
  
  return rooms;
};

/**
 * Calculate travel time between two rooms
 * Vertical: 2 minutes per floor difference
 * Horizontal: 1 minute per room position difference
 */
const calculateTravelTime = (roomA: Room, roomB: Room): number => {
  const verticalTime = Math.abs(roomA.floor - roomB.floor) * 2;
  const horizontalTime = Math.abs(roomA.position - roomB.position) * 1;
  return verticalTime + horizontalTime;
};

/**
 * Find the best rooms to book based on optimization rules:
 * 1. Prefer same floor
 * 2. Minimize total travel time span between first and last room
 */
const findBestRoomsToBook = (rooms: Room[], count: number): Room[] => {
  const availableRooms = rooms.filter(r => r.status === 'available');
  
  if (availableRooms.length < count) {
    return [];
  }
  
  // Try to book on same floor first
  const roomsByFloor = availableRooms.reduce((acc, room) => {
    if (!acc[room.floor]) acc[room.floor] = [];
    acc[room.floor].push(room);
    return acc;
  }, {} as Record<number, Room[]>);
  
  // Check if any single floor has enough rooms
  for (const floor in roomsByFloor) {
    const floorRooms = roomsByFloor[floor];
    if (floorRooms.length >= count) {
      // Sort by position and take consecutive or closest rooms
      const sorted = floorRooms.sort((a, b) => a.position - b.position);
      return sorted.slice(0, count);
    }
  }
  
  // If not possible on same floor, find best combination minimizing travel time
  // Generate all combinations and evaluate
  let bestCombination: Room[] = [];
  let minTravelTime = Infinity;
  
  const combinations = generateCombinations(availableRooms, count);
  
  for (const combo of combinations) {
    const sorted = combo.sort((a, b) => 
      a.floor === b.floor ? a.position - b.position : a.floor - b.floor
    );
    const travelTime = calculateTravelTime(sorted[0], sorted[sorted.length - 1]);
    
    if (travelTime < minTravelTime) {
      minTravelTime = travelTime;
      bestCombination = sorted;
    }
  }
  
  return bestCombination;
};

/**
 * Generate all combinations of k elements from array
 * Optimized for small k (max 5)
 */
function generateCombinations<T>(arr: T[], k: number): T[][] {
  if (k === 1) return arr.map(el => [el]);
  if (k === arr.length) return [arr];
  
  const result: T[][] = [];
  
  function backtrack(start: number, current: T[]) {
    if (current.length === k) {
      result.push([...current]);
      return;
    }
    
    // Optimization: limit combinations to 1000 max for performance
    if (result.length >= 1000) return;
    
    for (let i = start; i <= arr.length - (k - current.length); i++) {
      current.push(arr[i]);
      backtrack(i + 1, current);
      current.pop();
    }
  }
  
  backtrack(0, []);
  return result;
}

export default function HotelDashboard() {
  const [rooms, setRooms] = useState<Room[]>(generateHotelRooms());
  const [roomCount, setRoomCount] = useState<number>(1);
  const [travelTime, setTravelTime] = useState<number | null>(null);
  const [message, setMessage] = useState<string>('');

  /**
   * Book rooms using optimization algorithm
   */
  const bookRooms = () => {
    const bestRooms = findBestRoomsToBook(rooms, roomCount);
    
    if (bestRooms.length === 0) {
      setMessage(`❌ Not enough rooms available! Only ${rooms.filter(r => r.status === 'available').length} rooms free.`);
      setTravelTime(null);
      return;
    }
    
    // Update room statuses
    const updatedRooms = rooms.map(room => {
      const isBooked = bestRooms.find(r => r.id === room.id);
      if (isBooked) {
        return { ...room, status: 'booked' as RoomStatus };
      }
      return room;
    });
    
    setRooms(updatedRooms);
    
    // Calculate and display travel time
    const sorted = bestRooms.sort((a, b) => 
      a.floor === b.floor ? a.position - b.position : a.floor - b.floor
    );
    const time = calculateTravelTime(sorted[0], sorted[sorted.length - 1]);
    setTravelTime(time);
    
    const roomIds = bestRooms.map(r => r.id).join(', ');
    setMessage(`✅ Booked ${roomCount} room(s): ${roomIds}`);
  };

  /**
   * Randomly mark rooms as occupied
   */
  const randomizeOccupancy = () => {
    const updatedRooms = rooms.map(room => {
      // 30% chance of being occupied if currently available
      if (room.status === 'available' && Math.random() < 0.3) {
        return { ...room, status: 'occupied' as RoomStatus };
      }
      return room;
    });
    
    setRooms(updatedRooms);
    setMessage('🎲 Random occupancy applied');
    setTravelTime(null);
  };

  /**
   * Reset all rooms to available
   */
  const resetAll = () => {
    setRooms(generateHotelRooms());
    setTravelTime(null);
    setMessage('🔄 All rooms reset');
    setRoomCount(1);
  };

  const stats = useMemo(() => {
    const available = rooms.filter(r => r.status === 'available').length;
    const occupied = rooms.filter(r => r.status === 'occupied').length;
    const booked = rooms.filter(r => r.status === 'booked').length;
    return { available, occupied, booked };
  }, [rooms]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-5xl font-bold bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 bg-clip-text text-transparent mb-2">
          ✨ Le Grand Hotel
        </h1>
        <p className="text-slate-400 text-lg">Premium Room Reservation System</p>
      </motion.div>

      {/* Stats Bar */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="grid grid-cols-3 gap-4 mb-6"
      >
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-4 text-center">
          <div className="text-emerald-400 text-2xl font-bold">{stats.available}</div>
          <div className="text-slate-400 text-sm">Available</div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-4 text-center">
          <div className="text-rose-400 text-2xl font-bold">{stats.occupied}</div>
          <div className="text-slate-400 text-sm">Occupied</div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-4 text-center">
          <div className="text-amber-400 text-2xl font-bold">{stats.booked}</div>
          <div className="text-slate-400 text-sm">Booked</div>
        </div>
      </motion.div>

      {/* Controls */}
      <Controls
        roomCount={roomCount}
        setRoomCount={setRoomCount}
        onBook={bookRooms}
        onRandomize={randomizeOccupancy}
        onReset={resetAll}
        message={message}
        travelTime={travelTime}
      />

      {/* Hotel Grid */}
      <HotelGrid rooms={rooms} />
    </div>
  );
}