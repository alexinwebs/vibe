import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import type { RootStackParamList } from "../navigation/AppNavigator";
import { useRide } from "../state/RideContext";
import {
  colors,
  fonts,
  radius,
  shadows,
} from "../theme/theme";

type NavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

export default function DriverFoundScreen() {
  const navigation =
    useNavigation<NavigationProp>();

  const {
    selectedRide,
    driverName,
    driverRating,
    driverVehicle,
    driverPlate,
    startDriverArrival,
    cancelRide,
  } = useRide();

  const handleStartTracking = () => {
    startDriverArrival();
    navigation.navigate("DriverArriving");
  };

  const handleCancel = () => {
    cancelRide();
    navigation.navigate("Home");
  };

  const rideType = selectedRide?.type;

  const vehicleEmoji =
    rideType === "VIBE Comfort"
      ? "🛺"
      : rideType === "VIBE XL"
        ? "🚕"
        : "🛵";

  const vehicleName =
    rideType === "VIBE Comfort"
      ? "Auto Rickshaw"
      : rideType === "VIBE XL"
        ? "VIBE Cab"
        : driverVehicle ?? "Honda Activa";

  const vehicleDescription =
    rideType === "VIBE Comfort"
      ? "Auto"
      : rideType === "VIBE XL"
        ? "Cab"
        : "Bike";

  const eta = selectedRide?.eta ?? 4;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />

      <View style={styles.container}>
        {/* HEADER */}
        <View style={styles.header}>
          <View>
            <Text style={styles.eyebrow}>
              VIBE
            </Text>

            <Text style={styles.headerTitle}>
              You're locked in.
            </Text>
          </View>

          <View style={styles.foundBadge}>
            <Text style={styles.foundBadgeText}>
              FOUND
            </Text>
          </View>
        </View>

        {/* HERO */}
        <View style={styles.hero}>
          <View style={styles.checkCircle}>
            <Text style={styles.check}>
              ✓
            </Text>
          </View>

          <Text style={styles.heroTitle}>
            Driver found.
          </Text>

          <Text style={styles.heroDescription}>
            Your {vehicleDescription.toLowerCase()} is
            on the way. Main character energy
            activated.
          </Text>
        </View>

        {/* DRIVER CARD */}
        <View style={styles.driverCard}>
          <View style={styles.driverTop}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {driverName?.charAt(0) ?? "A"}
              </Text>
            </View>

            <View style={styles.driverInfo}>
              <Text style={styles.driverName}>
                {driverName ?? "Your driver"}
              </Text>

              <View style={styles.ratingRow}>
                <Text style={styles.star}>
                  ★
                </Text>

                <Text style={styles.rating}>
                  {driverRating ?? "4.9"}
                </Text>

                <Text style={styles.ratingLabel}>
                  top rated
                </Text>
              </View>
            </View>

            <View style={styles.verified}>
              <Text style={styles.verifiedText}>
                ✓
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

          {/* VEHICLE */}
          <View style={styles.vehicleRow}>
            <View style={styles.vehicleIcon}>
              <Text style={styles.vehicleEmoji}>
                {vehicleEmoji}
              </Text>
            </View>

            <View style={styles.vehicleInfo}>
              <Text style={styles.vehicleName}>
                {vehicleName}
              </Text>

              <Text style={styles.vehiclePlate}>
                {driverPlate ?? "UP 14 AB 4821"}
              </Text>
            </View>

            <View style={styles.etaBadge}>
              <Text style={styles.etaNumber}>
                {eta}
              </Text>

              <Text style={styles.etaLabel}>
                min
              </Text>
            </View>
          </View>
        </View>

        {/* STATUS */}
        <View style={styles.statusCard}>
          <View style={styles.statusDot} />

          <View style={styles.statusContent}>
            <Text style={styles.statusTitle}>
              Driver is heading to you
            </Text>

            <Text style={styles.statusDescription}>
              Your driver has accepted the ride.
            </Text>
          </View>
        </View>

        {/* ACTIONS */}
        <View style={styles.actions}>
          <Pressable
            style={({ pressed }) => [
              styles.primaryButton,
              pressed && styles.pressed,
            ]}
            onPress={handleStartTracking}
          >
            <View>
              <Text style={styles.primaryEyebrow}>
                RIDE CONFIRMED
              </Text>

              <Text style={styles.primaryText}>
                Track my ride
              </Text>
            </View>

            <Text style={styles.primaryArrow}>
              →
            </Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.secondaryButton,
              pressed && styles.pressed,
            ]}
            onPress={handleCancel}
          >
            <Text style={styles.secondaryText}>
              Cancel ride
            </Text>
          </Pressable>
        </View>

        <Text style={styles.footer}>
          Driver details are shared for your
          safety.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },

  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 28,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  eyebrow: {
    fontFamily: fonts.bodyBold,
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 2,
    color: colors.muted,
  },

  headerTitle: {
    marginTop: 4,
    fontFamily: fonts.heading,
    fontSize: 21,
    fontWeight: "900",
    color: colors.ink,
  },

  foundBadge: {
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: radius.pill,
    backgroundColor: colors.lime,
    borderWidth: 1.5,
    borderColor: colors.ink,
  },

  foundBadgeText: {
    fontFamily: fonts.bodyBold,
    fontSize: 8,
    fontWeight: "900",
    letterSpacing: 1,
    color: colors.ink,
  },

  hero: {
    alignItems: "center",
    marginTop: 34,
  },

  checkCircle: {
    width: 72,
    height: 72,
    borderRadius: radius.pill,
    backgroundColor: colors.lime,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: colors.ink,
    ...shadows.offsetSmall,
  },

  check: {
    fontFamily: fonts.heading,
    fontSize: 38,
    fontWeight: "900",
    color: colors.ink,
  },

  heroTitle: {
    marginTop: 20,
    fontFamily: fonts.display,
    fontSize: 34,
    lineHeight: 36,
    fontWeight: "900",
    letterSpacing: -1.2,
    color: colors.ink,
  },

  heroDescription: {
    maxWidth: 290,
    marginTop: 8,
    textAlign: "center",
    fontFamily: fonts.body,
    fontSize: 12,
    lineHeight: 18,
    color: colors.muted,
  },

  driverCard: {
    marginTop: 24,
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    padding: 17,
    borderWidth: 2,
    borderColor: colors.ink,
    ...shadows.offsetSmall,
  },

  driverTop: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 54,
    height: 54,
    borderRadius: radius.pill,
    backgroundColor: colors.ink,
    alignItems: "center",
    justifyContent: "center",
  },

  avatarText: {
    fontFamily: fonts.heading,
    fontSize: 22,
    fontWeight: "900",
    color: colors.lime,
  },

  driverInfo: {
    flex: 1,
    marginLeft: 13,
  },

  driverName: {
    fontFamily: fonts.heading,
    fontSize: 17,
    fontWeight: "900",
    color: colors.ink,
  },

  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },

  star: {
    fontSize: 11,
    color: colors.ink,
  },

  rating: {
    marginLeft: 4,
    fontFamily: fonts.bodyBold,
    fontSize: 11,
    fontWeight: "800",
    color: colors.ink,
  },

  ratingLabel: {
    marginLeft: 5,
    fontFamily: fonts.body,
    fontSize: 9,
    color: colors.muted,
  },

  verified: {
    width: 28,
    height: 28,
    borderRadius: radius.pill,
    backgroundColor: colors.limeSoft,
    alignItems: "center",
    justifyContent: "center",
  },

  verifiedText: {
    fontFamily: fonts.bodyBold,
    fontSize: 13,
    fontWeight: "900",
    color: colors.ink,
  },

  divider: {
    height: 1,
    backgroundColor: colors.line,
    marginVertical: 15,
  },

  vehicleRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  vehicleIcon: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    backgroundColor: colors.lime,
    alignItems: "center",
    justifyContent: "center",
  },

  vehicleEmoji: {
    fontSize: 21,
  },

  vehicleInfo: {
    flex: 1,
    marginLeft: 12,
  },

  vehicleName: {
    fontFamily: fonts.bodyBold,
    fontSize: 13,
    fontWeight: "900",
    color: colors.ink,
  },

  vehiclePlate: {
    marginTop: 3,
    fontFamily: fonts.bodyMedium,
    fontSize: 10,
    color: colors.muted,
  },

  etaBadge: {
    alignItems: "center",
    justifyContent: "center",
    minWidth: 48,
    paddingVertical: 7,
    borderRadius: radius.md,
    backgroundColor: colors.ink,
  },

  etaNumber: {
    fontFamily: fonts.heading,
    fontSize: 17,
    fontWeight: "900",
    color: colors.lime,
  },

  etaLabel: {
    fontFamily: fonts.bodyBold,
    fontSize: 7,
    fontWeight: "800",
    color: colors.surface,
  },

  statusCard: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 13,
    padding: 14,
    borderRadius: radius.lg,
    backgroundColor: colors.limeSoft,
    borderWidth: 1.5,
    borderColor: colors.ink,
  },

  statusDot: {
    width: 10,
    height: 10,
    borderRadius: radius.pill,
    backgroundColor: colors.lime,
    borderWidth: 1.5,
    borderColor: colors.ink,
  },

  statusContent: {
    flex: 1,
    marginLeft: 11,
  },

  statusTitle: {
    fontFamily: fonts.bodyBold,
    fontSize: 12,
    fontWeight: "900",
    color: colors.ink,
  },

  statusDescription: {
    marginTop: 3,
    fontFamily: fonts.body,
    fontSize: 9,
    color: colors.muted,
  },

  actions: {
    marginTop: "auto",
  },

  primaryButton: {
    minHeight: 62,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    borderRadius: radius.xl,
    backgroundColor: colors.ink,
    borderWidth: 2,
    borderColor: colors.ink,
    ...shadows.offset,
  },

  primaryEyebrow: {
    fontFamily: fonts.bodyBold,
    fontSize: 7,
    fontWeight: "900",
    letterSpacing: 1.2,
    color: colors.lime,
    marginBottom: 2,
  },

  primaryText: {
    fontFamily: fonts.heading,
    fontSize: 16,
    fontWeight: "900",
    color: colors.surface,
  },

  primaryArrow: {
    fontFamily: fonts.bodyBold,
    fontSize: 20,
    color: colors.lime,
  },

  secondaryButton: {
    minHeight: 48,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.xl,
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderColor: colors.ink,
  },

  secondaryText: {
    fontFamily: fonts.bodyBold,
    fontSize: 12,
    fontWeight: "900",
    color: colors.ink,
  },

  pressed: {
    opacity: 0.7,
  },

  footer: {
    marginTop: 10,
    textAlign: "center",
    fontFamily: fonts.body,
    fontSize: 8,
    color: colors.muted,
  },
});