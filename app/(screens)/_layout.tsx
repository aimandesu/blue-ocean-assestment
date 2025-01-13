import { Stack } from "expo-router";
import useThemeStyles from "../custom_style";

export default function ScreenLayout() {
  const { themeTextStyle, themeContainerStyle, statusBarStyle } =
    useThemeStyles();

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTintColor: themeTextStyle.color,
          title: "Homepage",
          statusBarBackgroundColor: statusBarStyle,
          headerShadowVisible: false,
          contentStyle: themeContainerStyle,
          headerStyle: themeContainerStyle,
        }}
      />
      <Stack.Screen
        name="Coach/CoachSelection"
        options={{
          headerTintColor: themeTextStyle.color,
          title: "Coach",
          statusBarBackgroundColor: statusBarStyle,
          headerShadowVisible: false,
          contentStyle: themeContainerStyle,
          headerStyle: themeContainerStyle,
        }}
      />
      <Stack.Screen
        name="Summary/BookingSummary"
        options={{
          headerTintColor: themeTextStyle.color,
          title: "Summary",
          statusBarBackgroundColor: statusBarStyle,
          headerShadowVisible: false,
          contentStyle: themeContainerStyle,
          headerStyle: themeContainerStyle,
        }}
      />
    </Stack>
  );
}
