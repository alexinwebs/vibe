import React, { useEffect } from "react";
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

export default function DriverArrivingScreen() {
  const navigation =
    useNavigation<NavigationProp>();

  const {
    rideStatus,
    etaMinutes,
    selectedRide,
    driverName,
    driverRating,
    driverVehicle,
    driverPlate,
    cancelRide,
  } = useRide();

  useEffect(() => {
    if (rideStatus !== "driver_arrived") {
      return;
    }

    navigation.replace("DriverArrived");
  }, [rideStatus, navigation]);

  const handleCancel = () => {
    cancelRide();
    navigation.navigate("Home");
  };

  const eta = etaMinutes ?? 0;

  const progress = Math.min(
    100,
    Math.max(8, 100 - eta * 28),
  );

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
        {/* HEADER */}
        <View style={styles.header}>
          <View>
            <Text style={styles.eyebrow}>
              VIBE
            </Text>

            <Text style={styles.headerTitle}>
              Your ride is moving.
            </Text>
          </View>

          <View style={styles.statusBadge}>
            <View style={styles.statusDot} />

            <Text style={styles.statusText}>
              ON THE WAY
            </Text>
          </View>
        </View>

        {/* ETA HERO */}
        <View style={styles.etaCard}>
          <View style={styles.etaTop}>
            <View>
              <Text style={styles.etaEyebrow}>
                DRIVER ETA
              </Text>

              <Text style={styles.etaTitle}>
                {eta > 0
                  ? `${eta} min away`
                  : "They're here 👀"}
              </Text>
            </View>

            <View style={styles.etaIcon}>
              <Text style={styles.etaEmoji}>
                {vehicleEmoji}
              </Text>
            </View>
          </View>

          <View style={styles.progressTrack}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${progress}%`,
                },
              ]}
            />

            <View
              style={[
                styles.progressDot,
                {
                  left: `${Math.min(
                    94,
                    progress,
                  )}%`,
                },
              ]}
            />
          </View>

          <View style={styles.progressLabels}>
            <Text style={styles.progressLabel}>
              Driver
            </Text>

            <Text style={styles.progressLabel}>
              You
            </Text>
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

              <Text style={styles.vehiclePlate}>
                {driverPlate ?? "UP 14 AB 4821"}
              </Text>
            </View>

            <View style={styles.plateBadge}>
              <Text style={styles.plateText}>
                MATCHED
              </Text>
            </View>
          </View>
        </View>

        {/* STATUS MESSAGE */}
        <View style={styles.messageCard}>
          <View style={styles.messageIcon}>
            <Text style={styles.messageEmoji}>
              ✨
            </Text>
          </View>

          <View style={styles.messageContent}>
            <Text style={styles.messageTitle}>
              Main character moment.
            </Text>

            <Text style={styles.messageDescription}>
              Your driver is pulling up. Keep an
              eye out for your match.
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
            onPress={() => {}}
          >
            <View>
              <Text style={styles.primaryEyebrow}>
                RIDE STATUS
              </Text>

              <Text style={styles.primaryText}>
                Driver is coming
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
    paddingBottom: 26,
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
    fontSize: 20,
    fontWeight: "900",
    color: colors.ink,
  },

  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: radius.pill,
    backgroundColor: colors.limeSoft,
    borderWidth: 1.5,
    borderColor: colors.ink,
  },

  statusDot: {
    width: 7,
    height: 7,
    borderRadius: radius.pill,
    backgroundColor: colors.lime,
    borderWidth: 1,
    borderColor: colors.ink,
  },

  statusText: {
    marginLeft: 5,
    fontFamily: fonts.bodyBold,
    fontSize: 7,
    fontWeight: "900",
    letterSpacing: 0.8,
    color: colors.ink,
  },

  etaCard: {
    marginTop: 22,
    padding: 19,
    borderRadius: radius.xl,
    backgroundColor: colors.ink,
    borderWidth: 2,
    borderColor: colors.ink,
    ...shadows.offset,
  },

  etaTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  etaEyebrow: {
    fontFamily: fonts.bodyBold,
    fontSize: 8,
    fontWeight: "900",
    letterSpacing: 1.4,
    color: colors.lime,
  },

  etaTitle: {
    marginTop: 5,
    fontFamily: fonts.display,
    fontSize: 28,
    lineHeight: 31,
    fontWeight: "900",
    letterSpacing: -0.8,
    color: colors.surface,
  },

  etaIcon: {
    width: 56,
    height: 56,
    borderRadius: radius.pill,
    backgroundColor: colors.lime,
    alignItems: "center",
    justifyContent: "center",
  },

  etaEmoji: {
    fontSize: 27,
  },

  progressTrack: {
    height: 7,
    marginTop: 25,
    borderRadius: radius.pill,
    backgroundColor: "#3A3A3A",
    position: "relative",
    overflow: "visible",
  },

  progressFill: {
    height: 7,
    borderRadius: radius.pill,
    backgroundColor: colors.lime,
  },

  progressDot: {
    position: "absolute",
    top: -4,
    width: 15,
    height: 15,
    marginLeft: -7,
    borderRadius: radius.pill,
    backgroundColor: colors.lime,
    borderWidth: 2,
    borderColor: colors.surface,
  },

  progressLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },

  progressLabel: {
    fontFamily: fonts.bodyBold,
    fontSize: 8,
    fontWeight: "800",
    color: "#8F8F8F",
  },

  driverCard: {
    marginTop: 14,
    padding: 17,
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
    width: 52,
    height: 52,
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
    fontSize: 17,
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

  divider: {
    height: 1,
    backgroundColor: colors.line,
    marginVertical: 14,
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

  plateBadge: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: radius.md,
    backgroundColor: colors.ink,
  },

  plateText: {
    fontFamily: fonts.bodyBold,
    fontSize: 7,
    fontWeight: "900",
    letterSpacing: 0.7,
    color: colors.lime,
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
    fontSize: 18,
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
    marginTop: 9,
    textAlign: "center",
    fontFamily: fonts.body,
    fontSize: 8,
    color: colors.muted,
  },
});