import React from "react";

import {
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

import DriverHomeScreen from "../screens/DriverHomeScreen";

export type RootStackParamList = {
  DriverHome: undefined;
};

const Stack =
  createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="DriverHome"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="DriverHome"
        component={DriverHomeScreen}
      />
    </Stack.Navigator>
  );
}