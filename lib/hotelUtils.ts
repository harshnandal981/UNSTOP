import { Room } from "@/types/hotel";

/**
 * Generate all 97 hotel rooms
 * Floors 1-9: 10 rooms each (101-110, 201-210, ...)
 * Floor 10: 7 rooms (1001-1007)
 */
export function generateHotelRooms(): Room[] {
  const rooms: Room[] = [];

  // Floors 1-9: 10 rooms each
  for (let floor = 1; floor <= 9; floor++) {
    for (let position = 1; position <= 10; position++) {
      rooms.push({
        id: floor * 100 + position,
        floor,
        position,
        status: "available",
      });
    }
  }

  // Floor 10: 7 rooms
  for (let position = 1; position <= 7; position++) {
    rooms.push({
      id: 1000 + position,
      floor: 10,
      position,
      status: "available",
    });
  }

  return rooms;
}

/**
 * Calculate travel time between two rooms
 * Horizontal: 1 min per adjacent room
 * Vertical: 2 min per floor difference
 */
export function calculateTravelTime(roomA: Room, roomB: Room): number {
  const verticalTime = Math.abs(roomA.floor - roomB.floor) * 2;
  const horizontalTime = Math.abs(roomA.position - roomB.position) * 1;
  return verticalTime + horizontalTime;
}

/**
 * Calculate total travel time for a group of rooms
 * (from first to last room in the list)
 */
export function calculateGroupTravelTime(rooms: Room[]): number {
  if (rooms.length <= 1) return 0;
  return calculateTravelTime(rooms[0], rooms[rooms.length - 1]);
}

/**
 * Find the best rooms to book based on availability and travel time
 * Priority:
 * 1. Same floor if possible
 * 2. Minimize total travel time from first to last room
 */
export function findBestRoomsToBook(
  allRooms: Room[],
  requestCount: number
): Room[] {
  if (requestCount <= 0 || requestCount > 5) {
    return [];
  }

  const availableRooms = allRooms.filter((room) => room.status === "available");

  if (availableRooms.length < requestCount) {
    return [];
  }

  // Strategy 1: Try to find rooms on the same floor
  for (let floor = 1; floor <= 10; floor++) {
    const floorRooms = availableRooms.filter((room) => room.floor === floor);
    if (floorRooms.length >= requestCount) {
      // Sort by position to get consecutive or close rooms
      floorRooms.sort((a, b) => a.position - b.position);
      return floorRooms.slice(0, requestCount);
    }
  }

  // Strategy 2: Find rooms minimizing travel time across floors
  // We'll try different combinations and pick the one with minimum travel time
  let bestRooms: Room[] = [];
  let minTravelTime = Infinity;

  // Group available rooms by floor
  const roomsByFloor = new Map<number, Room[]>();
  for (const room of availableRooms) {
    if (!roomsByFloor.has(room.floor)) {
      roomsByFloor.set(room.floor, []);
    }
    roomsByFloor.get(room.floor)!.push(room);
  }

  // Sort rooms in each floor by position
  roomsByFloor.forEach((rooms) => {
    rooms.sort((a, b) => a.position - b.position);
  });

  // Try to allocate rooms starting from each floor
  for (let startFloor = 1; startFloor <= 10; startFloor++) {
    const candidate = allocateRoomsFromFloor(
      roomsByFloor,
      startFloor,
      requestCount
    );
    if (candidate.length === requestCount) {
      const travelTime = calculateGroupTravelTime(candidate);
      if (travelTime < minTravelTime) {
        minTravelTime = travelTime;
        bestRooms = candidate;
      }
    }
  }

  return bestRooms;
}

/**
 * Helper function to allocate rooms starting from a specific floor
 */
function allocateRoomsFromFloor(
  roomsByFloor: Map<number, Room[]>,
  startFloor: number,
  count: number
): Room[] {
  const result: Room[] = [];
  const floors = Array.from(roomsByFloor.keys()).sort((a, b) => a - b);

  // Start from the given floor and expand both up and down
  const startIndex = floors.indexOf(startFloor);
  if (startIndex === -1) return result;

  const floorOrder: number[] = [floors[startIndex]];
  let up = startIndex + 1;
  let down = startIndex - 1;

  while (floorOrder.length < floors.length) {
    if (down >= 0) {
      floorOrder.push(floors[down]);
      down--;
    }
    if (up < floors.length) {
      floorOrder.push(floors[up]);
      up++;
    }
  }

  // Allocate rooms from these floors in order
  for (const floor of floorOrder) {
    const floorRooms = roomsByFloor.get(floor) || [];
    for (const room of floorRooms) {
      if (result.length < count) {
        result.push(room);
      } else {
        return result;
      }
    }
  }

  return result;
}

/**
 * Randomize room occupancy (mark some rooms as occupied)
 */
export function randomizeOccupancy(rooms: Room[], occupancyRate: number = 0.3): Room[] {
  return rooms.map((room) => ({
    ...room,
    status: Math.random() < occupancyRate ? "occupied" : "available",
  }));
}

/**
 * Reset all rooms to available
 */
export function resetAllRooms(rooms: Room[]): Room[] {
  return rooms.map((room) => ({
    ...room,
    status: "available",
  }));
}

/**
 * Book selected rooms
 */
export function bookRooms(allRooms: Room[], roomsToBook: Room[]): Room[] {
  const bookedIds = new Set(roomsToBook.map((r) => r.id));
  return allRooms.map((room) => ({
    ...room,
    status: bookedIds.has(room.id) ? "booked" : room.status,
  }));
}
