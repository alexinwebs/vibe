import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RideSelectionScreen from "../screens/RideSelectionScreen";
import HomeScreen from "../screens/HomeScreen";
import DestinationScreen from "../screens/DestinationScreen";

export type RootStackParamList = {
  Home: undefined;
  Destination: undefined;
  RideSelection: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="Destination"
          component={DestinationScreen}
        />
	<Stack.Screen
  name="RideSelection"
  component={RideSelectionScreen}
/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
