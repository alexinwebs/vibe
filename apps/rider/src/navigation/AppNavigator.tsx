import React from "react";
import {
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";
import DestinationScreen from "../screens/DestinationScreen";
import RideSelectionScreen from "../screens/RideSelectionScreen";
import VibePlusScreen from "../screens/VibePlusScreen";
import ConfirmRideScreen from "../screens/ConfirmRideScreen";
import FindingDriverScreen from "../screens/FindingDriverScreen";
import DriverFoundScreen from "../screens/DriverFoundScreen";
import DriverArrivingScreen from "../screens/DriverArrivingScreen";
import DriverArrivedScreen from "../screens/DriverArrivedScreen";
import RideInProgressScreen from "../screens/RideInProgressScreen";
import RideCompletedScreen from "../screens/RideCompletedScreen";
import RideHistoryScreen from "../screens/RideHistoryScreen";

export type RootStackParamList = {
  Home: undefined;
  Destination: undefined;
  RideSelection: undefined;
  VibePlus: undefined;
  ConfirmRide: undefined;
  FindingDriver: undefined;
  DriverFound: undefined;
  DriverArriving: undefined;
  DriverArrived: undefined;
  RideInProgress: undefined;
  RideCompleted: undefined;
  RideHistory: undefined;
};

const Stack =
  createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
      />

      <Stack.Screen
        name="Destination"
        component={DestinationScreen}
      />

      <Stack.Screen
        name="RideSelection"
        component={RideSelectionScreen}
      />

      <Stack.Screen
        name="VibePlus"
        component={VibePlusScreen}
      />

      <Stack.Screen
        name="ConfirmRide"
        component={ConfirmRideScreen}
      />

      <Stack.Screen
        name="FindingDriver"
        component={FindingDriverScreen}
      />

      <Stack.Screen
        name="DriverFound"
        component={DriverFoundScreen}
      />

      <Stack.Screen
        name="DriverArriving"
        component={DriverArrivingScreen}
      />

      <Stack.Screen
        name="DriverArrived"
        component={DriverArrivedScreen}
      />

      <Stack.Screen
        name="RideInProgress"
        component={RideInProgressScreen}
      />

      <Stack.Screen
        name="RideCompleted"
        component={RideCompletedScreen}
      />

      <Stack.Screen
        name="RideHistory"
        component={RideHistoryScreen}
      />
    </Stack.Navigator>
  );
}