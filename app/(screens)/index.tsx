import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import {
  useForm,
  Controller,
  SubmitHandler,
  FieldValues,
} from "react-hook-form";
import { Picker } from "@react-native-picker/picker"; // Add this for dropdown
import { router } from "expo-router";
import useThemeStyles from "../custom_style";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store/store";
import { Passenger, saveInfo } from "../store/Booking/BookingSlice";
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
      {/* Origin Dropdown */}
      <Controller
        control={control}
        name="origin"
        rules={{ required: "Origin is required" }}
        render={({ field: { onChange, value } }) => (
          <View style={inStyles.pickerContainer}>
            <Picker
              selectedValue={value}
              onValueChange={onChange}
              style={inStyles.picker}
            >
              <Picker.Item label="Select Origin" value="" />
              <Picker.Item label="Kuala Lumpur" value="Kuala Lumpur" />
              <Picker.Item label="Penang" value="Penang" />
              <Picker.Item label="Johor Bahru" value="Johor Bahru" />
              <Picker.Item label="Ipoh" value="Ipoh" />
            </Picker>
            {errors.origin && (
              <Text style={{ color: "whitesmoke", padding: 10 }}>
                {errors.origin.message}
              </Text>
            )}
          </View>
        )}
      />

      {/* Destination Dropdown */}
      <Controller
        control={control}
        name="destination"
        rules={{ required: "Destination is required" }}
        render={({ field: { onChange, value } }) => (
          <View style={inStyles.pickerContainer}>
            <Picker
              selectedValue={value}
              onValueChange={onChange}
              style={inStyles.picker}
            >
              <Picker.Item label="Select Destination" value="" />
              <Picker.Item label="Kuala Lumpur" value="Kuala Lumpur" />
              <Picker.Item label="Penang" value="Penang" />
              <Picker.Item label="Johor Bahru" value="Johor Bahru" />
              <Picker.Item label="Ipoh" value="Ipoh" />
            </Picker>
            {errors.destination && (
              <Text style={{ color: "whitesmoke", padding: 10 }}>
                {errors.destination.message}
              </Text>
            )}
          </View>
        )}
      />

      {/* Pax Input */}
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
        <Text style={{ color: themeTextStyle.color, padding: 10 }}>
          {errors.noOfPax.message}
        </Text>
      )}

      {/* Calendar */}
      <CalendarPicker
        onDateChange={handleDateChange}
        initialDate={selectedDate}
      />

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
        ]}
      >
        <Text style={{ color: "white", textAlign: "center" }}>Proceed </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Homepage;

export const inStyles = StyleSheet.create({
  pickerContainer: {
    margin: 10,
    backgroundColor: "#0039a6",
    borderRadius: 10,
  },
  picker: {
    color: "white",
  },
  input: {
    backgroundColor: "#0039a6",
    margin: 10,
    borderRadius: 10,
    color: "white",
    paddingLeft: 10,
  },
  button: {
    marginTop: 20,
    padding: 15,
    borderRadius: 20,
  },
});
