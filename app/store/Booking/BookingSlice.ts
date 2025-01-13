import trainDataSchedule from "@/app/data/train_schedule";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const STORAGE_KEY = "booking";

interface SeatDetails {
  seatNo: string;
  user: string;
  isBooked: boolean;
  isCurrentlyBooking: boolean | null;
}

interface CoachDetails {
  coach: string;
  seats: SeatDetails[];
  seatAvailability: number;
}

export interface TrainSchedule {
  trainNo: number;
  departureTime: string;
  arrivalTime: string;
  totalAmount: number;
  trainDetails: CoachDetails[];
}

export interface Passenger {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate: string;
  noPax: number;
}

export interface BookingState {
  trainSchedule: TrainSchedule;
  passenger: Passenger;
}

const initialState: BookingState = {
  trainSchedule: {
    trainNo: 0,
    departureTime: "",
    arrivalTime: "",
    totalAmount: 0,
    trainDetails: [],
  },
  passenger: {
    origin: "",
    destination: "",
    departureDate: "",
    returnDate: "",
    noPax: 0,
  },
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    saveInfo: (state, action: PayloadAction<Passenger>) => {
      // const payload = action.payload;
      state.passenger = action.payload;
    },
    bookSeat: (
      state,
      action: PayloadAction<{
        coachName: string;
        seatNo: string;
      }>
    ) => {
      const updatedTrainSchedule = {
        ...state.trainSchedule,
        trainDetails: state.trainSchedule.trainDetails.map((coach) =>
          coach.coach === action.payload.coachName
            ? {
                ...coach,
                seats: coach.seats.map((seat) =>
                  seat.seatNo === action.payload.seatNo && !seat.isBooked
                    ? {
                        ...seat,
                        isCurrentlyBooking:
                          seat.isCurrentlyBooking === true ? null : true,
                      }
                    : seat
                ),
              }
            : coach
        ),
      };

      state.trainSchedule = updatedTrainSchedule;

      // const targetSeat = updatedTrainSchedule.trainDetails
      //   .find((coach) => coach.coach === action.payload.coachName)
      //   ?.seats.find((seat) => seat.seatNo === action.payload.seatNo);

      // if (targetSeat && !targetSeat.isBooked) {
      //   if (targetSeat.isCurrentlyBooking === null) {
      //     state.passenger.noPax += 1;
      //   } else if (targetSeat.isCurrentlyBooking === true) {
      //     state.passenger.noPax -= 1;
      //   }
      // }

      // state.trainSchedule = updatedTrainSchedule;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      loadTrainSchedule.fulfilled,
      (state, action: PayloadAction<TrainSchedule | null>) => {
        if (action.payload) {
          state.trainSchedule = action.payload;
        }
      }
    );
    builder.addCase(saveSeat.fulfilled, (state, action) => {
      state.trainSchedule = action.payload;
    });
  },
});

//extraReducers

export const saveSeat = createAsyncThunk(
  "booking/saveSeat",
  async (_, { getState }) => {
    const state = getState() as { booking: BookingState };
    const updatedTrainSchedule = {
      ...state.booking.trainSchedule,
      trainDetails: state.booking.trainSchedule.trainDetails.map((coach) => ({
        ...coach,
        seats: coach.seats.map((seat) => ({
          ...seat,
          isBooked: seat.isCurrentlyBooking === true ? true : seat.isBooked,
          isCurrentlyBooking: null,
        })),
        seatAvailability:
          coach.seatAvailability -
          coach.seats.filter((seat) => seat.isCurrentlyBooking === true).length,
      })),
    };

    try {
      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(updatedTrainSchedule)
      );

      return updatedTrainSchedule;
    } catch (error) {
      throw new Error("Failed to save train schedule to storage");
    }
  }
);

export const loadTrainSchedule: any = createAsyncThunk(
  "booking/loadTrainSchedule",
  async () => {
    try {
      const trainScheduleString = await AsyncStorage.getItem(STORAGE_KEY);
      if (trainScheduleString) {
        console.log("using data from storage key");

        return JSON.parse(trainScheduleString);
      }
      return trainDataSchedule;
    } catch (error) {
      throw new Error("Failed to load train schedule from storage");
    }
  }
);

export const { saveInfo, bookSeat } = bookingSlice.actions;
export default bookingSlice.reducer;
