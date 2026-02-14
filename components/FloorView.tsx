"use client";

import { Room as RoomType } from "@/types/hotel";
import Room from "./Room";
import { motion } from "framer-motion";

interface FloorViewProps {
  floor: number;
  rooms: RoomType[];
}

export default function FloorView({ floor, rooms }: FloorViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: floor * 0.05 }}
      className="mb-6"
    >
      <div className="flex items-center gap-4 mb-3">
        <div className="w-24 text-right">
          <div className="text-gold-400 font-bold text-lg">Floor {floor}</div>
          <div className="text-slate-500 text-xs">
            {rooms.length} room{rooms.length !== 1 ? "s" : ""}
          </div>
        </div>
        
        {/* Lift/Stairs indicator */}
        <div className="flex items-center justify-center w-16 h-16 bg-slate-800/50 border-2 border-slate-600 rounded-lg">
          <div className="text-2xl">🛗</div>
        </div>

        {/* Rooms */}
        <div className="flex-1 grid grid-cols-10 gap-2">
          {rooms.map((room) => (
            <Room key={room.id} room={room} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
