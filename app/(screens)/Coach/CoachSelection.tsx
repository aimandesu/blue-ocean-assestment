import {
  View,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import useThemeStyles from "@/app/custom_style";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store/store";
import {
  BookingState,
  bookSeat,
  loadTrainSchedule,
} from "@/app/store/Booking/BookingSlice";
import { Snackbar } from "react-native-paper";
import { router } from "expo-router";

interface CustomSnackbarProps {
  visible: boolean;
  onDismiss: () => void;
  duration?: number;
  message: string;
}

const CustomSnackbar: React.FC<CustomSnackbarProps> = ({
  visible,
  onDismiss,
  duration = 2000,
  message,
}) => {
  return (
    <Snackbar visible={visible} onDismiss={onDismiss} duration={duration}>
      {message}
    </Snackbar>
  );
};

const CoachSelection = () => {
  const { themeTextStyle, themeContainerStyle } = useThemeStyles();
  const width = Dimensions.get("window").width;

  const [selectedCoach, setSelectedCoach] = useState<string | null>("coach A");
  const [visible, setVisible] = useState(false);
  const [proceed, setProceed] = useState(false);

  const toggleError = () => setVisible(!visible);
  const toggleProceed = () => setProceed(!proceed);

  const dispatch = useDispatch<AppDispatch>();
  const booking: BookingState = useSelector(
    (state: RootState) => state.booking
  );

  const [passengerCount, setPassengerCount] = useState(booking.passenger.noPax);

  useEffect(() => {
    dispatch(loadTrainSchedule());
  }, [dispatch]);

  if (!booking?.trainSchedule) {
    return (
      <View>
        <Text>loading...</Text>
      </View>
    );
  }

  const selectedTrainDetails = selectedCoach
    ? booking.trainSchedule.trainDetails.find((e) => e.coach === selectedCoach)
    : null;

  return (
    <View
      style={{
        padding: 10,
        display: "flex",
        backgroundColor: "#0039a6",
        flex: 1,
        borderTopEndRadius: 30,
        borderTopStartRadius: 30,
      }}
    >
      <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={{ display: "flex", flexDirection: "row" }}>
            {booking.trainSchedule.trainDetails.map((e, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => setSelectedCoach(e.coach)}
                >
                  <View style={{ paddingHorizontal: 10, alignItems: "center" }}>
                    <Text style={{ color: "white" }}>{e.coach}</Text>
                    <View
                      style={{
                        height: 5,
                        width: width * 0.2,
                        backgroundColor:
                          e.coach == selectedCoach ? "white" : "gray",
                        borderRadius: 12,
                      }}
                    />
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
        {selectedCoach && (
          <>
            <Text style={{ color: "white", marginVertical: 20 }}>
              Seats in {selectedCoach}
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
              }}
            >
              {selectedTrainDetails?.seats.map((seat, index) => (
                <TouchableOpacity
                  key={seat.seatNo}
                  onPress={() => {
                    if (
                      !seat.isBooked &&
                      (passengerCount >= 1 || seat.isCurrentlyBooking == true)
                    ) {
                      // && seat.isCurrentlyBooking === null
                      dispatch(
                        bookSeat({
                          coachName: selectedCoach,
                          seatNo: seat.seatNo,
                        })
                      );
                      if (seat.isCurrentlyBooking == true) {
                        setPassengerCount(passengerCount + 1);
                      } else {
                        setPassengerCount(passengerCount - 1);
                      }
                    } else if (seat.isBooked) {
                      return;
                    } else {
                      toggleError();
                    }
                  }}
                >
                  <View
                    style={{
                      backgroundColor: seat.isBooked
                        ? "gray"
                        : seat.isCurrentlyBooking === true
                        ? "blue"
                        : "green",
                      height: 30,
                      width: 30,
                      margin: 5,
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 5,
                    }}
                  >
                    <Text style={{ color: "white" }}>{seat.seatNo}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}
      </View>

      {passengerCount != 0 ? (
        <Text style={{ paddingTop: 20, color: "white", fontSize: 20 }}>
          {passengerCount} pax more no selected
        </Text>
      ) : (
        <Text style={{ paddingTop: 20, color: "white", fontSize: 20 }}>
          All pax has been selected
        </Text>
      )}
      <View
        style={{
          marginTop: 15,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        {["gray", "green", "blue"].map((color, index) => (
          <View
            key={index}
            style={{ paddingHorizontal: 1, alignItems: "center" }}
          >
            <Text style={{ color: "white" }}>
              {index == 0 ? "booked" : index == 1 ? "available" : "booking"}
            </Text>
            <View
              key={index}
              style={{
                height: 5,
                width: width * 0.2,
                backgroundColor: color,
                borderRadius: 12,
                margin: 5,
              }}
            />
          </View>
        ))}
      </View>
      <View style={{ flex: 1 }} />
      <View
        style={{
          alignSelf: "flex-end",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            if (passengerCount == 0) {
              router.push("/(screens)/Summary/BookingSummary");
            } else {
              toggleProceed();
            }
          }}
        >
          <Text
            style={{
              width: width * 0.2,
              height: 30,
              textAlign: "center",
              textAlignVertical: "center",
              backgroundColor: "white",
              color: "black",
              borderRadius: 12,
            }}
          >
            Proceed
          </Text>
        </TouchableOpacity>
      </View>
      <CustomSnackbar
        visible={visible}
        onDismiss={toggleError}
        duration={3000}
        message="You have picked all pax from your booking"
      />
      <CustomSnackbar
        visible={proceed}
        onDismiss={toggleProceed}
        duration={3000}
        message="You have not picked all available pax from your selection"
      />
    </View>
  );
};

export default CoachSelection;
