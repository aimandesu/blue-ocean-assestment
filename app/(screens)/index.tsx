import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import {
  useForm,
  Controller,
  SubmitHandler,
  FieldValues,
} from "react-hook-form";
import { router } from "expo-router";
import useThemeStyles from "../custom_style";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import {
  BookingState,
  Passenger,
  saveInfo,
} from "../store/Booking/BookingSlice";
import CalendarPicker from "../utils/CalendarPicker";

type FormData = {
  origin: string;
  destination: string;
  noOfPax: string;
};

const Homepage = () => {
  const { themeTextStyle, themeContainerStyle } = useThemeStyles();
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const dispatch = useDispatch<AppDispatch>();
  // const booking: BookingState = useSelector(
  //   (state: RootState) => state.booking
  // );

  // Handle form submission
  const onSubmit: SubmitHandler<FormData> = (data) => {
    const passenger: Passenger = {
      origin: data.origin,
      destination: data.destination,
      noPax: parseInt(data.noOfPax),
      departureDate: selectedDate?.toLocaleDateString() || "",
      returnDate: selectedDate?.toLocaleDateString() || "",
    };
    dispatch(saveInfo(passenger));
    router.push("/(screens)/Coach/CoachSelection");
  };

  return (
    <View style={{ flex: 1 }}>
      <Controller
        control={control}
        name="origin"
        rules={{ required: "Origin is required" }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[inStyles.input]}
            placeholder="Origin"
            placeholderTextColor={"white"}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.origin && (
        <Text style={{ color: "red" }}>{errors.origin.message}</Text>
      )}

      <Controller
        control={control}
        name="destination"
        rules={{ required: "Destination is required" }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[inStyles.input]}
            placeholder="Destination"
            placeholderTextColor={"white"}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.destination && (
        <Text style={{ color: "red" }}>{errors.destination.message}</Text>
      )}

      <Controller
        control={control}
        name="noOfPax"
        rules={{
          required: "Number of pax is required",
          pattern: {
            value: /^[0-9]+$/,
            message: "Only numbers are allowed",
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[inStyles.input]}
            placeholder="No of pax"
            placeholderTextColor={"white"}
            keyboardType="numeric"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.noOfPax && (
        <Text style={{ color: "red" }}>{errors.noOfPax.message}</Text>
      )}

      <CalendarPicker
        onDateChange={handleDateChange}
        initialDate={selectedDate}
        style={inStyles.calendar}
      />

      {/* {selectedDate && (
        <Text style={inStyles.selectedDateText}>
          You selected: {selectedDate.toLocaleDateString()}
        </Text>
      )} */}

      <TouchableOpacity
        onPress={handleSubmit(onSubmit)}
        disabled={Object.keys(errors).length > 0}
        style={[
          inStyles.button,
          {
            backgroundColor:
              Object.keys(errors).length > 0 ? "#cccccc" : "#0039a6",
            width: 200,
            alignSelf: "center",
          },
        ]} // Style button based on errors
      >
        <Text style={{ color: "white", textAlign: "center" }}>Proceed </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Homepage;

export const inStyles = StyleSheet.create({
  calendar: {
    // width: "80%",
    // marginBottom: 20,
  },
  selectedDateText: {
    fontSize: 16,
    color: "#333",
  },
  input: {
    backgroundColor: "#0039a6",
    margin: 10,
    borderRadius: 10,
    color: "white",
    padding: 10,
  },
  button: {
    marginTop: 20,
    padding: 15,
    borderRadius: 20,
  },
});
