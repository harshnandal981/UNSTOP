"use client";

import { useState, useEffect } from "react";
import { Room } from "@/types/hotel";
import {
  generateHotelRooms,
  findBestRoomsToBook,
  bookRooms,
  randomizeOccupancy,
  resetAllRooms,
  calculateGroupTravelTime,
} from "@/lib/hotelUtils";
import FloorView from "@/components/FloorView";
import { motion } from "framer-motion";

export default function HotelReservationPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [requestCount, setRequestCount] = useState<number>(1);
  const [lastBookedRooms, setLastBookedRooms] = useState<Room[]>([]);
  const [travelTime, setTravelTime] = useState<number>(0);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    setRooms(generateHotelRooms());
  }, []);

  const handleBook = () => {
    const roomsToBook = findBestRoomsToBook(rooms, requestCount);
    
    if (roomsToBook.length === 0) {
      setMessage(`Cannot book ${requestCount} room(s). Not enough available rooms.`);
      setLastBookedRooms([]);
      setTravelTime(0);
      return;
    }

    const updatedRooms = bookRooms(rooms, roomsToBook);
    setRooms(updatedRooms);
    setLastBookedRooms(roomsToBook);
    
    const time = calculateGroupTravelTime(roomsToBook);
    setTravelTime(time);
    
    const roomIds = roomsToBook.map(r => r.id).join(", ");
    setMessage(`Successfully booked ${roomsToBook.length} room(s): ${roomIds}`);
  };

  const handleRandomOccupancy = () => {
    const randomRooms = randomizeOccupancy(rooms, 0.4);
    setRooms(randomRooms);
    setMessage("Random occupancy applied (40% occupied)");
    setLastBookedRooms([]);
    setTravelTime(0);
  };

  const handleReset = () => {
    const resetRooms = resetAllRooms(rooms);
    setRooms(resetRooms);
    setMessage("All rooms reset to available");
    setLastBookedRooms([]);
    setTravelTime(0);
  };

  const groupRoomsByFloor = () => {
    const floors: { [key: number]: Room[] } = {};
    rooms.forEach((room) => {
      if (!floors[room.floor]) {
        floors[room.floor] = [];
      }
      floors[room.floor].push(room);
    });
    return floors;
  };

  const floorGroups = groupRoomsByFloor();
  const availableCount = rooms.filter((r) => r.status === "available").length;
  const occupiedCount = rooms.filter((r) => r.status === "occupied").length;
  const bookedCount = rooms.filter((r) => r.status === "booked").length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-gold-400 to-gold-600 bg-clip-text text-transparent mb-4">
            Luxe Grand Hotel
          </h1>
          <p className="text-slate-400 text-lg">Premium Room Reservation System</p>
        </motion.div>

        {/* Control Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8 p-6 rounded-2xl bg-slate-800/40 backdrop-blur-lg border border-slate-700/50 shadow-2xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Booking Input */}
            <div>
              <label className="block text-sm font-medium text-gold-400 mb-2">
                Number of Rooms
              </label>
              <input
                type="number"
                min="1"
                max="5"
                value={requestCount}
                onChange={(e) => {
                  const value = parseInt(e.target.value) || 1;
                  setRequestCount(Math.max(1, Math.min(5, value)));
                }}
                className="w-full px-4 py-3 rounded-lg bg-slate-900/50 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Book Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleBook}
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-gold-600 to-gold-700 text-slate-900 font-bold hover:from-gold-500 hover:to-gold-600 transition-all shadow-lg shadow-gold-500/20 self-end"
            >
              Book Rooms
            </motion.button>

            {/* Random Occupancy Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRandomOccupancy}
              className="px-6 py-3 rounded-lg bg-slate-700/50 border border-slate-600 hover:border-gold-500 transition-all self-end"
            >
              Random Occupancy
            </motion.button>

            {/* Reset Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleReset}
              className="px-6 py-3 rounded-lg bg-slate-700/50 border border-slate-600 hover:border-red-500 transition-all self-end"
            >
              Reset All
            </motion.button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-700">
              <div className="text-2xl font-bold text-green-400">{availableCount}</div>
              <div className="text-sm text-slate-400">Available</div>
            </div>
            <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-700">
              <div className="text-2xl font-bold text-red-400">{occupiedCount}</div>
              <div className="text-sm text-slate-400">Occupied</div>
            </div>
            <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-700">
              <div className="text-2xl font-bold text-gold-400">{bookedCount}</div>
              <div className="text-sm text-slate-400">Booked</div>
            </div>
          </div>

          {/* Message and Travel Time */}
          {message && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-6 p-4 rounded-lg bg-slate-900/50 border border-gold-500/30"
            >
              <p className="text-gold-300">{message}</p>
              {lastBookedRooms.length > 0 && (
                <p className="text-slate-400 text-sm mt-2">
                  Travel time (first to last room): {travelTime} minutes
                </p>
              )}
            </motion.div>
          )}
        </motion.div>

        {/* Hotel Visualization */}
        <div className="p-6 rounded-2xl bg-slate-800/40 backdrop-blur-lg border border-slate-700/50 shadow-2xl">
          <h2 className="text-2xl font-bold text-gold-400 mb-6">Hotel Layout</h2>
          
          {/* Legend */}
          <div className="flex gap-6 mb-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-slate-700 border border-slate-600"></div>
              <span className="text-slate-400">Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-red-900/30 border border-red-800"></div>
              <span className="text-slate-400">Occupied</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-gradient-to-br from-gold-600/40 to-gold-700/40 border border-gold-500"></div>
              <span className="text-slate-400">Booked</span>
            </div>
          </div>

          {/* Floors */}
          <div className="space-y-2">
            {Object.keys(floorGroups)
              .map(Number)
              .sort((a, b) => b - a)
              .map((floor) => (
                <FloorView
                  key={floor}
                  floor={floor}
                  rooms={floorGroups[floor]}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
