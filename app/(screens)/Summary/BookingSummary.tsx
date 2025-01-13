import { BookingState, saveSeat } from "@/app/store/Booking/BookingSlice";
import { AppDispatch, RootState } from "@/app/store/store";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";

const Summary = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { trainSchedule, passenger }: BookingState = useSelector(
    (state: RootState) => state.booking
  );

  const getCurrentlyBookingSeats = () => {
    let selectedSeats: any = [];
    trainSchedule.trainDetails.forEach((coach) => {
      coach.seats.forEach((seat) => {
        if (seat.isCurrentlyBooking === true) {
          selectedSeats.push({
            coachName: coach.coach,
            seatNo: seat.seatNo,
          });
        }
      });
    });
    return selectedSeats;
  };

  const handleSaveSeats = () => {
    if (selectedSeats.length > 0) {
      dispatch(saveSeat());
    }
  };

  const selectedSeats = getCurrentlyBookingSeats();

  return (
    <View
      style={{
        padding: 16,
      }}
    >
      <View
        style={{
          backgroundColor: "white",
          borderRadius: 12,
          padding: 16,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            Booking Summary
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: "#666",
            }}
          >
            {new Date().toLocaleDateString()}
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 16,
          }}
        >
          <View
            style={{
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "600" }}>
              {trainSchedule.departureTime}
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: "#666",
                marginTop: 4,
              }}
            >
              Departure
            </Text>
          </View>
          <View
            style={{
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "600",
              }}
            >
              {trainSchedule.arrivalTime}
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: "#666",
                marginTop: 4,
              }}
            >
              Arrival
            </Text>
          </View>
        </View>

        <View
          style={{
            height: 1,
            backgroundColor: "#E0E0E0",
            marginVertical: 16,
          }}
        />

        <View
          style={{
            gap: 12,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              marginBottom: 8,
            }}
          >
            Selected Seats
          </Text>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 8,
            }}
          >
            {selectedSeats.map((seat: any, index: number) => (
              <View
                key={index}
                style={{
                  backgroundColor: "#E3F2FD",
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  borderRadius: 6,
                }}
              >
                <Text
                  style={{
                    color: "#1976D2",
                    fontWeight: "500",
                  }}
                >
                  {seat.coachName} - {seat.seatNo}
                </Text>
              </View>
            ))}
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color: "#666",
              }}
            >
              Total Passengers:
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
              }}
            >
              {passenger.noPax}
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color: "#666",
              }}
            >
              Total Amount:
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
              }}
            >
              ${trainSchedule.totalAmount * passenger.noPax}
            </Text>
          </View>
        </View>
        <View style={{ marginTop: 20 }}>
          <TouchableOpacity
            onPress={handleSaveSeats}
            disabled={selectedSeats.length === 0}
            style={{
              backgroundColor: selectedSeats.length > 0 ? "#1976D2" : "#BDBDBD",
              paddingVertical: 12,
              borderRadius: 8,
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white", fontSize: 16, fontWeight: "600" }}>
              {selectedSeats.length > 0
                ? `Confirm Booking (${selectedSeats.length} seats)`
                : "Select seats to book"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Summary;
