import React, { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/AppNavigator";
const colors = {
  background: "#F6F6F1",
  surface: "#FFFFFF",
  text: "#111111",
  muted: "#777771",
  border: "#E7E7E0",
  lime: "#C9F45B",
};

const rides = [
  {
    id: "bike",
    icon: "🏍️",
    name: "VIBE Bike",
    description: "Fast + solo",
    price: "₹42",
    eta: "3 min",
  },
  {
    id: "auto",
    icon: "🛺",
    name: "VIBE Auto",
    description: "Easy + comfy",
    price: "₹68",
    eta: "5 min",
  },
  {
    id: "cab",
    icon: "🚕",
    name: "VIBE Cab",
    description: "Comfort + space",
    price: "₹110",
    eta: "6 min",
  },
];

export default function RideSelectionScreen() {
  const navigation =
  useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [selectedRide, setSelectedRide] = useState("bike");

  const selected = rides.find((ride) => ride.id === selectedRide);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.eyebrow}>VIBE RIDE</Text>
        <Text style={styles.title}>Choose your ride</Text>
        <Text style={styles.subtitle}>
          Pick what fits your vibe.
        </Text>

        <View style={styles.routeCard}>
          <View style={styles.routeRow}>
            <View style={styles.dotGreen} />

            <View>
              <Text style={styles.routeLabel}>PICKUP</Text>
              <Text style={styles.routeValue}>
                Your current location
              </Text>
            </View>
          </View>

          <View style={styles.routeLine} />

          <View style={styles.routeRow}>
            <View style={styles.dotBlack} />

            <View>
              <Text style={styles.routeLabel}>DESTINATION</Text>
              <Text style={styles.routeValue}>College</Text>
            </View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Available rides</Text>

        <View style={styles.rides}>
          {rides.map((ride) => {
            const isSelected = selectedRide === ride.id;

            return (
              <Pressable
                key={ride.id}
                onPress={() => setSelectedRide(ride.id)}
                style={[
                  styles.rideCard,
                  isSelected && styles.rideCardSelected,
                ]}
              >
                <View
                  style={[
                    styles.rideIcon,
                    isSelected && styles.rideIconSelected,
                  ]}
                >
                  <Text style={styles.rideEmoji}>{ride.icon}</Text>
                </View>

                <View style={styles.rideInfo}>
                  <Text style={styles.rideName}>{ride.name}</Text>

                  <Text style={styles.rideDescription}>
                    {ride.description} · {ride.eta} away
                  </Text>
                </View>

                <View style={styles.priceContainer}>
                  <Text style={styles.price}>{ride.price}</Text>

                  <View
                    style={[
                      styles.radio,
                      isSelected && styles.radioSelected,
                    ]}
                  >
                    {isSelected && <View style={styles.radioDot} />}
                  </View>
                </View>
              </Pressable>
            );
          })}
        </View>

        <View style={styles.fareCard}>
          <View>
            <Text style={styles.fareLabel}>ESTIMATED FARE</Text>
            <Text style={styles.farePrice}>
              {selected?.price}
            </Text>
          </View>

          <Text style={styles.fareNote}>
            Final fare may vary
          </Text>
        </View>

        <Pressable
  style={styles.confirmButton}
  onPress={() => navigation.navigate("Home")}>
          <Text style={styles.confirmText}>
            Confirm {selected?.name}
          </Text>

          <Text style={styles.confirmArrow}>→</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },

  container: {
    padding: 24,
    paddingBottom: 40,
  },

  eyebrow: {
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 2,
    color: colors.muted,
    marginBottom: 8,
  },

  title: {
    fontSize: 38,
    lineHeight: 42,
    fontWeight: "900",
    letterSpacing: -1.5,
    color: colors.text,
  },

  subtitle: {
    marginTop: 8,
    fontSize: 14,
    color: colors.muted,
  },

  routeCard: {
    marginTop: 24,
    padding: 18,
    backgroundColor: colors.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },

  routeRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  dotGreen: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#7BC943",
    marginRight: 14,
  },

  dotBlack: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.text,
    marginRight: 14,
  },

  routeLine: {
    height: 20,
    width: 1,
    backgroundColor: colors.border,
    marginLeft: 6,
    marginVertical: 2,
  },

  routeLabel: {
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 1.3,
    color: colors.muted,
  },

  routeValue: {
    marginTop: 3,
    fontSize: 14,
    fontWeight: "800",
    color: colors.text,
  },

  sectionTitle: {
    marginTop: 28,
    marginBottom: 12,
    fontSize: 18,
    fontWeight: "900",
    color: colors.text,
  },

  rides: {
    gap: 10,
  },

  rideCard: {
    minHeight: 82,
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: colors.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
  },

  rideCardSelected: {
    borderColor: colors.text,
    borderWidth: 2,
  },

  rideIcon: {
    width: 52,
    height: 52,
    borderRadius: 17,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
  },

  rideIconSelected: {
    backgroundColor: colors.lime,
  },

  rideEmoji: {
    fontSize: 24,
  },

  rideInfo: {
    flex: 1,
    marginLeft: 14,
  },

  rideName: {
    fontSize: 16,
    fontWeight: "900",
    color: colors.text,
  },

  rideDescription: {
    marginTop: 4,
    fontSize: 11,
    color: colors.muted,
  },

  priceContainer: {
    alignItems: "flex-end",
    gap: 8,
  },

  price: {
    fontSize: 16,
    fontWeight: "900",
    color: colors.text,
  },

  radio: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },

  radioSelected: {
    borderColor: colors.text,
  },

  radioDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.text,
  },

  fareCard: {
    marginTop: 20,
    padding: 18,
    borderRadius: 18,
    backgroundColor: colors.text,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  fareLabel: {
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 1.3,
    color: "#AAAAA4",
  },

  farePrice: {
    marginTop: 4,
    fontSize: 25,
    fontWeight: "900",
    color: "#FFFFFF",
  },

  fareNote: {
    fontSize: 11,
    color: "#AAAAA4",
  },

  confirmButton: {
    marginTop: 16,
    height: 62,
    borderRadius: 20,
    backgroundColor: colors.lime,
    paddingHorizontal: 22,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  confirmText: {
    fontSize: 16,
    fontWeight: "900",
    color: colors.text,
  },

  confirmArrow: {
    fontSize: 24,
    fontWeight: "900",
    color: colors.text,
  },
});
