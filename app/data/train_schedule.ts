import { TrainSchedule } from "../store/Booking/BookingSlice";

const trainDataSchedule: TrainSchedule = {
  trainNo: 1,
  departureTime: "08:00 AM",
  arrivalTime: "02:00 PM",
  totalAmount: 200,
  trainDetails: [
    {
      coach: "coach A",
      seats: Array.from({ length: 20 }, (_, index) => ({
        seatNo: `A${index + 1}`,
        user: index < 5 ? `user${index + 1}` : "", // First 5 seats are booked
        isBooked: index < 5, // True for booked seats
        isCurrentlyBooking: index < 5 ? false : null,
      })),
      seatAvailability: 15, // 5 booked, 15 available
    },
    {
      coach: "coach B",
      seats: Array.from({ length: 20 }, (_, index) => ({
        seatNo: `B${index + 1}`,
        user: index === 10 ? "user6" : "", // Seat B11 is booked
        isBooked: index === 10, // True for seat B11
        isCurrentlyBooking: index === 10 ? false : null,
      })),
      seatAvailability: 19, // 1 booked, 19 available
    },
    {
      coach: "coach C",
      seats: Array.from({ length: 20 }, (_, index) => ({
        seatNo: `C${index + 1}`,
        user: "", // All seats are available
        isBooked: false, // No seats booked
        isCurrentlyBooking: false,
      })),
      seatAvailability: 20, // All 20 available
    },
    {
      coach: "coach D",
      seats: Array.from({ length: 20 }, (_, index) => ({
        seatNo: `D${index + 1}`,
        user: index < 3 ? `user${index + 7}` : "", // First 3 seats are booked
        isBooked: index < 3, // True for booked seats
        isCurrentlyBooking: index < 3 ? false : null,
      })),
      seatAvailability: 17, // 3 booked, 17 available
    },
    {
      coach: "coach E",
      seats: Array.from({ length: 20 }, (_, index) => ({
        seatNo: `E${index + 1}`,
        user: index % 3 == 0 ? `user${index + 1}` : "",
        isBooked: index % 3 == 0, // No seats booked
        isCurrentlyBooking: index % 3 == 0 ? false : null,
      })),
      seatAvailability: 20, // All 20 available
    },
    {
      coach: "coach F",
      seats: Array.from({ length: 20 }, (_, index) => ({
        seatNo: `F${index + 1}`,
        user: index === 19 ? "user10" : "", // Seat F20 is booked
        isBooked: index === 19, // True for seat F20
        isCurrentlyBooking: index === 19 ? false : null,
      })),
      seatAvailability: 19, // 1 booked, 19 available
    },
  ],
};
export default trainDataSchedule;
