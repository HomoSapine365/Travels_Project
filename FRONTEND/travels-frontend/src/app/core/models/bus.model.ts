export interface Bus {
  id: number;
  bus_name: string;
  number: string;
  origin: string;
  destination: string;
  features?: string | string[];
  start_time?: string; 
  reach_time?: string;
  no_of_seats?: number;
  price?: number;
}

export interface Seat {
  id: number;
  bus: number | Bus;
  seat_number: string;
  is_booked: boolean;
}
