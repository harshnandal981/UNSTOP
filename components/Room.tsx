"use client";

import { Room as RoomType } from "@/types/hotel";
import { motion } from "framer-motion";

interface RoomProps {
  room: RoomType;
}

export default function Room({ room }: RoomProps) {
  const getStatusColors = () => {
    switch (room.status) {
      case "available":
        return "bg-slate-700/50 border-slate-600 hover:border-slate-500";
      case "occupied":
        return "bg-red-900/30 border-red-800 cursor-not-allowed";
      case "booked":
        return "bg-gradient-to-br from-gold-600/40 to-gold-700/40 border-gold-500 shadow-lg shadow-gold-500/20";
      default:
        return "bg-slate-700/50 border-slate-600";
    }
  };

  const getStatusIcon = () => {
    switch (room.status) {
      case "available":
        return "○";
      case "occupied":
        return "✕";
      case "booked":
        return "✓";
      default:
        return "○";
    }
  };

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={room.status === "available" ? { scale: 1.05, y: -2 } : {}}
      className={`
        relative
        h-16 
        rounded-lg 
        border-2 
        flex 
        flex-col 
        items-center 
        justify-center
        transition-all 
        duration-300
        ${getStatusColors()}
        ${room.status === "available" ? "hover:shadow-lg hover:shadow-gold-500/10" : ""}
      `}
    >
      <div className="text-xs font-semibold text-slate-300">{room.id}</div>
      <div className="text-lg text-gold-400">{getStatusIcon()}</div>
    </motion.div>
  );
}
