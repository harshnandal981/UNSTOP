export type RoomStatus = "available" | "occupied" | "booked";

export interface Room {
  id: number;
  floor: number;
  position: number; // 1-10 for floors 1-9, 1-7 for floor 10
  status: RoomStatus;
}

export interface BookingResult {
  success: boolean;
  rooms: Room[];
  travelTime: number;
  message: string;
}
