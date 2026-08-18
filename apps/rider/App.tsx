import React from "react";
import { ActivityIndicator, View } from "react-native";
import { useFonts } from "expo-font";
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
} from "@expo-google-fonts/inter";
import {
  SpaceGrotesk_400Regular,
  SpaceGrotesk_500Medium,
  SpaceGrotesk_600SemiBold,
  SpaceGrotesk_700Bold,
} from "@expo-google-fonts/space-grotesk";
import {
  NavigationContainer,
} from "@react-navigation/native";

import AppNavigator from "./src/navigation/AppNavigator";
import { VibePlusProvider } from "./src/state/VibePlusContext";
import { RideProvider } from "./src/state/RideContext";
import { colors } from "./src/theme/theme";

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black,

    SpaceGrotesk_400Regular,
    SpaceGrotesk_500Medium,
    SpaceGrotesk_600SemiBold,
    SpaceGrotesk_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: colors.background,
        }}
      >
        <ActivityIndicator
          size="small"
          color={colors.ink}
        />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <VibePlusProvider>
        <RideProvider>
          <AppNavigator />
        </RideProvider>
      </VibePlusProvider>
    </NavigationContainer>
  );
}
