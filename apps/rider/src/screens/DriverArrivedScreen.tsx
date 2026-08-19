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

export default function DriverArrivedScreen() {
  const navigation =
    useNavigation<NavigationProp>();

  const {
    selectedRide,
    driverName,
    driverRating,
    driverVehicle,
    driverPlate,
    startTrip,
    cancelRide,
  } = useRide();

  const handleStartRide = () => {
    startTrip();
    navigation.replace("RideInProgress");
  };

  const handleCancel = () => {
    cancelRide();
    navigation.navigate("Home");
  };

  const vehicleEmoji =
    selectedRide?.type === "VIBE Comfort"
      ? "🛺"
      : selectedRide?.type === "VIBE XL"
        ? "🚕"
        : "🛵";

  const vehicleName =
    selectedRide?.type === "VIBE Comfort"
      ? "Auto Rickshaw"
      : selectedRide?.type === "VIBE XL"
        ? "VIBE Cab"
        : driverVehicle ?? "Honda Activa";

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />

      <View style={styles.container}>
        <View style={styles.header}>
          <View>
            <Text style={styles.eyebrow}>
              VIBE
            </Text>

            <Text style={styles.headerTitle}>
              They're here.
            </Text>
          </View>

          <View style={styles.arrivedBadge}>
            <View style={styles.badgeDot} />

            <Text style={styles.badgeText}>
              ARRIVED
            </Text>
          </View>
        </View>

        <View style={styles.hero}>
          <View style={styles.heroCircle}>
            <Text style={styles.heroEmoji}>
              👀
            </Text>
          </View>

          <Text style={styles.heroTitle}>
            Your ride is here.
          </Text>

          <Text style={styles.heroDescription}>
            Before you hop in, match the vehicle
            and plate with the details below.
          </Text>
        </View>

        <View style={styles.safetyCard}>
          <View style={styles.safetyIcon}>
            <Text style={styles.safetyEmoji}>
              ✓
            </Text>
          </View>

          <View style={styles.safetyContent}>
            <Text style={styles.safetyTitle}>
              Quick safety check
            </Text>

            <Text style={styles.safetyDescription}>
              Confirm your driver's vehicle and
              plate before entering.
            </Text>
          </View>
        </View>

        <View style={styles.driverCard}>
          <View style={styles.driverTop}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {driverName?.charAt(0) ?? "A"}
              </Text>
            </View>

            <View style={styles.driverInfo}>
              <Text style={styles.driverName}>
                {driverName ?? "Arjun"}
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

              <Text style={styles.vehicleLabel}>
                Vehicle
              </Text>
            </View>

            <View style={styles.plateCard}>
              <Text style={styles.plate}>
                {driverPlate ?? "UP 14 AB 4821"}
              </Text>

              <Text style={styles.plateLabel}>
                PLATE
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.vibeCard}>
          <Text style={styles.vibeMark}>
            ✦
          </Text>

          <View style={styles.vibeContent}>
            <Text style={styles.vibeTitle}>
              We have a match.
            </Text>

            <Text style={styles.vibeDescription}>
              Plate matches? Perfect. Time to
              get moving.
            </Text>
          </View>
        </View>

        <View style={styles.actions}>
          <Pressable
            style={({ pressed }) => [
              styles.primaryButton,
              pressed && styles.pressed,
            ]}
            onPress={handleStartRide}
          >
            <View>
              <Text style={styles.primaryEyebrow}>
                DRIVER VERIFIED
              </Text>

              <Text style={styles.primaryText}>
                Start my ride
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
          If anything feels wrong, don't get in.
          Your safety comes first.
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
    paddingBottom: 25,
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

  arrivedBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: radius.pill,
    backgroundColor: colors.lime,
    borderWidth: 1.5,
    borderColor: colors.ink,
  },

  badgeDot: {
    width: 7,
    height: 7,
    borderRadius: radius.pill,
    backgroundColor: colors.ink,
  },

  badgeText: {
    marginLeft: 5,
    fontFamily: fonts.bodyBold,
    fontSize: 7,
    fontWeight: "900",
    letterSpacing: 0.8,
    color: colors.ink,
  },

  hero: {
    alignItems: "center",
    marginTop: 23,
  },

  heroCircle: {
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

  heroEmoji: {
    fontSize: 32,
  },

  heroTitle: {
    marginTop: 16,
    fontFamily: fonts.display,
    fontSize: 31,
    lineHeight: 34,
    fontWeight: "900",
    letterSpacing: -1,
    color: colors.ink,
  },

  heroDescription: {
    maxWidth: 300,
    marginTop: 7,
    textAlign: "center",
    fontFamily: fonts.body,
    fontSize: 11,
    lineHeight: 17,
    color: colors.muted,
  },

  safetyCard: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
    padding: 13,
    borderRadius: radius.lg,
    backgroundColor: colors.limeSoft,
    borderWidth: 1.5,
    borderColor: colors.ink,
  },

  safetyIcon: {
    width: 39,
    height: 39,
    borderRadius: radius.md,
    backgroundColor: colors.lime,
    alignItems: "center",
    justifyContent: "center",
  },

  safetyEmoji: {
    fontFamily: fonts.bodyBold,
    fontSize: 18,
    fontWeight: "900",
    color: colors.ink,
  },

  safetyContent: {
    flex: 1,
    marginLeft: 10,
  },

  safetyTitle: {
    fontFamily: fonts.bodyBold,
    fontSize: 11,
    fontWeight: "900",
    color: colors.ink,
  },

  safetyDescription: {
    marginTop: 2,
    fontFamily: fonts.body,
    fontSize: 8,
    lineHeight: 13,
    color: colors.muted,
  },

  driverCard: {
    marginTop: 11,
    padding: 15,
    borderRadius: radius.xl,
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderColor: colors.ink,
    ...shadows.offsetSmall,
  },

  driverTop: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 50,
    height: 50,
    borderRadius: radius.pill,
    backgroundColor: colors.ink,
    alignItems: "center",
    justifyContent: "center",
  },

  avatarText: {
    fontFamily: fonts.heading,
    fontSize: 20,
    fontWeight: "900",
    color: colors.lime,
  },

  driverInfo: {
    flex: 1,
    marginLeft: 11,
  },

  driverName: {
    fontFamily: fonts.heading,
    fontSize: 16,
    fontWeight: "900",
    color: colors.ink,
  },

  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 3,
  },

  star: {
    fontSize: 10,
    color: colors.ink,
  },

  rating: {
    marginLeft: 4,
    fontFamily: fonts.bodyBold,
    fontSize: 10,
    fontWeight: "800",
    color: colors.ink,
  },

  ratingLabel: {
    marginLeft: 5,
    fontFamily: fonts.body,
    fontSize: 8,
    color: colors.muted,
  },

  verified: {
    width: 26,
    height: 26,
    borderRadius: radius.pill,
    backgroundColor: colors.limeSoft,
    alignItems: "center",
    justifyContent: "center",
  },

  verifiedText: {
    fontFamily: fonts.bodyBold,
    fontSize: 12,
    fontWeight: "900",
    color: colors.ink,
  },

  divider: {
    height: 1,
    backgroundColor: colors.line,
    marginVertical: 13,
  },

  vehicleRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  vehicleIcon: {
    width: 43,
    height: 43,
    borderRadius: radius.md,
    backgroundColor: colors.lime,
    alignItems: "center",
    justifyContent: "center",
  },

  vehicleEmoji: {
    fontSize: 20,
  },

  vehicleInfo: {
    flex: 1,
    marginLeft: 11,
  },

  vehicleName: {
    fontFamily: fonts.bodyBold,
    fontSize: 12,
    fontWeight: "900",
    color: colors.ink,
  },

  vehicleLabel: {
    marginTop: 2,
    fontFamily: fonts.body,
    fontSize: 8,
    color: colors.muted,
  },

  plateCard: {
    alignItems: "flex-end",
  },

  plate: {
    fontFamily: fonts.heading,
    fontSize: 12,
    fontWeight: "900",
    color: colors.ink,
  },

  plateLabel: {
    marginTop: 2,
    fontFamily: fonts.bodyBold,
    fontSize: 7,
    fontWeight: "900",
    letterSpacing: 0.8,
    color: colors.muted,
  },

  vibeCard: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    padding: 13,
    borderRadius: radius.lg,
    backgroundColor: colors.ink,
  },

  vibeMark: {
    fontFamily: fonts.heading,
    fontSize: 22,
    color: colors.lime,
  },

  vibeContent: {
    flex: 1,
    marginLeft: 10,
  },

  vibeTitle: {
    fontFamily: fonts.bodyBold,
    fontSize: 11,
    fontWeight: "900",
    color: colors.surface,
  },

  vibeDescription: {
    marginTop: 2,
    fontFamily: fonts.body,
    fontSize: 8,
    lineHeight: 13,
    color: "#A5A5A5",
  },

  actions: {
    marginTop: "auto",
  },

  primaryButton: {
    minHeight: 60,
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
    minHeight: 46,
    marginTop: 9,
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
    marginTop: 8,
    textAlign: "center",
    fontFamily: fonts.body,
    fontSize: 8,
    lineHeight: 12,
    color: colors.muted,
  },
});