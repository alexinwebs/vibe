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

export default function RideInProgressScreen() {
  const navigation =
    useNavigation<NavigationProp>();

  const {
    rideMinutes,
    driverName,
    driverRating,
    driverVehicle,
    driverPlate,
    cancelRide,
  } = useRide();

  const handleEndRide = () => {
    navigation.replace("RideCompleted");
  };

  const handleCancel = () => {
    cancelRide();
    navigation.navigate("Home");
  };

  const minutes = String(
    Math.floor(rideMinutes / 60),
  ).padStart(2, "0");

  const seconds = String(
    rideMinutes % 60,
  ).padStart(2, "0");

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
              You're on the move.
            </Text>
          </View>

          <View style={styles.liveBadge}>
            <View style={styles.liveDot} />

            <Text style={styles.liveText}>
              LIVE
            </Text>
          </View>
        </View>

        {/* RIDE HERO */}
        <View style={styles.rideCard}>
          <View style={styles.rideTop}>
            <View>
              <Text style={styles.rideEyebrow}>
                RIDE TIME
              </Text>

              <Text style={styles.timer}>
                {minutes}:{seconds}
              </Text>
            </View>

            <View style={styles.rideIcon}>
              <Text style={styles.rideEmoji}>
                🛵
              </Text>
            </View>
          </View>

          <View style={styles.routeLine}>
            <View style={styles.routeDotStart} />

            <View style={styles.routeLineInner} />

            <View style={styles.routeDotEnd} />
          </View>

          <View style={styles.routeLabels}>
            <View>
              <Text style={styles.routeLabel}>
                PICKUP
              </Text>

              <Text style={styles.routeValue}>
                You
              </Text>
            </View>

            <View style={styles.destination}>
              <Text style={styles.routeLabel}>
                DESTINATION
              </Text>

              <Text style={styles.routeValue}>
                Your destination
              </Text>
            </View>
          </View>
        </View>

        {/* DRIVER */}
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

            <View style={styles.liveDriverBadge}>
              <Text style={styles.liveDriverText}>
                ON TRIP
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.vehicleRow}>
            <View style={styles.vehicleIcon}>
              <Text style={styles.vehicleEmoji}>
                🛵
              </Text>
            </View>

            <View style={styles.vehicleInfo}>
              <Text style={styles.vehicleName}>
                {driverVehicle ?? "Honda Activa"}
              </Text>

              <Text style={styles.vehiclePlate}>
                {driverPlate ?? "UP 14 AB 4821"}
              </Text>
            </View>

            <View style={styles.verified}>
              <Text style={styles.verifiedText}>
                ✓
              </Text>
            </View>
          </View>
        </View>

        {/* VIBE STATUS */}
        <View style={styles.messageCard}>
          <View style={styles.messageIcon}>
            <Text style={styles.messageEmoji}>
              ✦
            </Text>
          </View>

          <View style={styles.messageContent}>
            <Text style={styles.messageTitle}>
              Smooth sailing.
            </Text>

            <Text style={styles.messageDescription}>
              Sit back, enjoy the ride. We got
              the rest.
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
            onPress={handleEndRide}
          >
            <View>
              <Text style={styles.primaryEyebrow}>
                ARRIVED AT DESTINATION?
              </Text>

              <Text style={styles.primaryText}>
                End ride
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
          Need help? Your ride details are
          available for safety.
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

  liveBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: radius.pill,
    backgroundColor: colors.lime,
    borderWidth: 1.5,
    borderColor: colors.ink,
  },

  liveDot: {
    width: 7,
    height: 7,
    borderRadius: radius.pill,
    backgroundColor: colors.ink,
  },

  liveText: {
    marginLeft: 5,
    fontFamily: fonts.bodyBold,
    fontSize: 7,
    fontWeight: "900",
    letterSpacing: 1,
    color: colors.ink,
  },

  rideCard: {
    marginTop: 22,
    padding: 19,
    borderRadius: radius.xl,
    backgroundColor: colors.ink,
    borderWidth: 2,
    borderColor: colors.ink,
    ...shadows.offset,
  },

  rideTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  rideEyebrow: {
    fontFamily: fonts.bodyBold,
    fontSize: 8,
    fontWeight: "900",
    letterSpacing: 1.4,
    color: colors.lime,
  },

  timer: {
    marginTop: 4,
    fontFamily: fonts.display,
    fontSize: 34,
    lineHeight: 37,
    fontWeight: "900",
    letterSpacing: -1,
    color: colors.surface,
  },

  rideIcon: {
    width: 58,
    height: 58,
    borderRadius: radius.pill,
    backgroundColor: colors.lime,
    alignItems: "center",
    justifyContent: "center",
  },

  rideEmoji: {
    fontSize: 28,
  },

  routeLine: {
    height: 24,
    marginTop: 19,
    flexDirection: "row",
    alignItems: "center",
  },

  routeDotStart: {
    width: 11,
    height: 11,
    borderRadius: radius.pill,
    backgroundColor: colors.lime,
    borderWidth: 2,
    borderColor: colors.surface,
  },

  routeLineInner: {
    flex: 1,
    height: 2,
    marginHorizontal: 7,
    backgroundColor: "#6B6B6B",
  },

  routeDotEnd: {
    width: 11,
    height: 11,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderColor: colors.lime,
  },

  routeLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 2,
  },

  routeLabel: {
    fontFamily: fonts.bodyBold,
    fontSize: 7,
    fontWeight: "900",
    letterSpacing: 1,
    color: "#8F8F8F",
  },

  routeValue: {
    marginTop: 3,
    fontFamily: fonts.bodyBold,
    fontSize: 10,
    fontWeight: "800",
    color: colors.surface,
  },

  destination: {
    alignItems: "flex-end",
  },

  driverCard: {
    marginTop: 14,
    padding: 16,
    borderRadius: radius.xl,
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderColor: colors.ink,
  },

  driverTop: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 51,
    height: 51,
    borderRadius: radius.pill,
    backgroundColor: colors.ink,
    alignItems: "center",
    justifyContent: "center",
  },

  avatarText: {
    fontFamily: fonts.heading,
    fontSize: 21,
    fontWeight: "900",
    color: colors.lime,
  },

  driverInfo: {
    flex: 1,
    marginLeft: 12,
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

  liveDriverBadge: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: radius.md,
    backgroundColor: colors.limeSoft,
  },

  liveDriverText: {
    fontFamily: fonts.bodyBold,
    fontSize: 7,
    fontWeight: "900",
    letterSpacing: 0.7,
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

  vehiclePlate: {
    marginTop: 3,
    fontFamily: fonts.bodyMedium,
    fontSize: 9,
    color: colors.muted,
  },

  verified: {
    width: 27,
    height: 27,
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

  messageCard: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    padding: 14,
    borderRadius: radius.lg,
    backgroundColor: colors.limeSoft,
    borderWidth: 1.5,
    borderColor: colors.ink,
  },

  messageIcon: {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    backgroundColor: colors.lime,
    alignItems: "center",
    justifyContent: "center",
  },

  messageEmoji: {
    fontFamily: fonts.heading,
    fontSize: 20,
    color: colors.ink,
  },

  messageContent: {
    flex: 1,
    marginLeft: 11,
  },

  messageTitle: {
    fontFamily: fonts.bodyBold,
    fontSize: 12,
    fontWeight: "900",
    color: colors.ink,
  },

  messageDescription: {
    marginTop: 3,
    fontFamily: fonts.body,
    fontSize: 9,
    lineHeight: 14,
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