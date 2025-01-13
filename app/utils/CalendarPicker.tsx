import React, { useState, useEffect } from "react";
import {
  View,
  Button,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import * as Calendar from "expo-calendar";
import DateTimePicker from "@react-native-community/datetimepicker";

const CalendarPicker = ({ onDateChange, initialDate, style }: any) => {
  const [selectedDate, setSelectedDate] = useState(initialDate || null);
  const [showPicker, setShowPicker] = useState(false);
  const width = Dimensions.get("window").width;

  useEffect(() => {
    (async () => {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status !== "granted") {
        console.log("Calendar permission not granted");
      }
    })();
  }, []);

  const getValidDateRange = () => {
    const today = new Date();
    const minDate = new Date();
    minDate.setDate(today.getDate() + 1);
    const maxDate = new Date();
    maxDate.setDate(today.getDate() + 10);
    return { minDate, maxDate };
  };

  const { minDate, maxDate } = getValidDateRange();

  const onChange = (event: any, date: any) => {
    setShowPicker(false);
    if (date) {
      setSelectedDate(date);
      // Call the parent's callback with the selected date
      onDateChange(date);
    }
  };

  return (
    <View
      style={[
        styles.container,
        style,
        {
          display: "flex",
          flexDirection: "row",
          width: width,
        },
      ]}
    >
      <TouchableOpacity onPress={() => setShowPicker(true)}>
        <View
          style={{
            borderRadius: 12,
            // height: 40,
            marginRight: 10,
          }}
        >
          <Text
            style={{
              padding: 10,
              textAlign: "center",
              textAlignVertical: "center",
              backgroundColor: "#0039a6",
              color: "white",
              borderRadius: 6,
            }}
          >
            Select Date
          </Text>
        </View>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={selectedDate || minDate}
          mode="date"
          display="default"
          onChange={onChange}
          minimumDate={minDate}
          maximumDate={maxDate}
        />
      )}

      {selectedDate && (
        <View style={styles.resultContainer}>
          <Text style={styles.dateText}>
            Selected Date: {selectedDate.toLocaleDateString()}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  resultContainer: {
    // marginTop: 20,
    // padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    padding: 10,
  },
  dateText: {
    fontSize: 16,
    textAlign: "center",
    textAlignVertical: "center",
    // marginBottom: 5,
  },
});

export default CalendarPicker;
