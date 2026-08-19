import React from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import type { RootStackParamList } from "../navigation/AppNavigator";
import { useVibePlus } from "../state/VibePlusContext";
import { useRide } from "../state/RideContext";
import {
  colors,
  fonts,
  radius,
  shadows,
} from "../theme/theme";

type NavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

export default function ConfirmRideScreen() {
  const navigation =
    useNavigation<NavigationProp>();

  const { isVibePlusActive } =
    useVibePlus();

  const {
    destination,
    selectedRide,
    startRide,
  } = useRide();

  const ride = selectedRide;

  const rideLabel =
    ride?.type === "VIBE Go"
      ? "Bike"
      : ride?.type === "VIBE Comfort"
        ? "Auto"
        : ride?.type === "VIBE XL"
          ? "Cab"
          : "Ride";

  const rideEmoji =
    ride?.type === "VIBE Go"
      ? "🛵"
      : ride?.type === "VIBE Comfort"
        ? "🛺"
        : ride?.type === "VIBE XL"
          ? "🚕"
          : "🚗";

  const commission =
    isVibePlusActive || !ride
      ? 0
      : Math.round(ride.price * 0.1);

  const driverReceives = ride
    ? ride.price - commission
    : 0;

  const handleConfirm = () => {
    if (!ride || !destination) {
      return;
    }

    startRide();
    navigation.navigate("FindingDriver");
  };

  const handleBack = () => {
    navigation.navigate("RideSelection");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Pressable
            style={styles.backButton}
            onPress={handleBack}
          >
            <Text style={styles.backText}>
              ‹
            </Text>
          </Pressable>

          <View style={styles.headerCenter}>
            <Text style={styles.eyebrow}>
              VIBE
            </Text>

            <Text style={styles.headerTitle}>
              One last look.
            </Text>
          </View>

          <View style={styles.headerSpacer} />
        </View>

        <View style={styles.heroCard}>
          <View style={styles.heroTop}>
            <View>
              <Text style={styles.heroEyebrow}>
                {isVibePlusActive
                  ? "VIBE+ PRIORITY"
                  : "YOU'RE LOCKED IN"}
              </Text>

              <Text style={styles.heroTitle}>
                Ready to roll?
              </Text>
            </View>

            <View style={styles.heroIcon}>
              <Text style={styles.heroEmoji}>
                {rideEmoji}
              </Text>
            </View>
          </View>

          <View style={styles.route}>
            <View style={styles.routeRow}>
              <View style={styles.pickupDot} />

              <View style={styles.routeContent}>
                <Text style={styles.routeLabel}>
                  PICKUP
                </Text>

                <Text style={styles.routeValue}>
                  You are here 📍
                </Text>
              </View>
            </View>

            <View style={styles.routeLine} />

            <View style={styles.routeRow}>
              <View style={styles.destinationDot} />

              <View style={styles.routeContent}>
                <Text style={styles.routeLabel}>
                  DESTINATION
                </Text>

                <Text style={styles.routeValue}>
                  {destination?.name ??
                    "No destination selected"}
                </Text>

                {destination?.address ? (
                  <Text
                    style={styles.routeAddress}
                    numberOfLines={1}
                  >
                    {destination.address}
                  </Text>
                ) : null}
              </View>
            </View>
          </View>
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.sectionEyebrow}>
            YOUR RIDE
          </Text>

          <View style={styles.summaryRow}>
            <View>
              <Text style={styles.summaryLabel}>
                Ride
              </Text>

              <Text style={styles.summaryValue}>
                {rideLabel}
              </Text>
            </View>

            <Text style={styles.summaryEmoji}>
              {rideEmoji}
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.summaryRow}>
            <View>
              <Text style={styles.summaryLabel}>
                ETA
              </Text>

              <Text style={styles.summaryValue}>
                {ride?.eta ?? "--"} min
              </Text>
            </View>

            <View style={styles.etaBadge}>
              <Text style={styles.etaText}>
                FAST
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.fareCard}>
          <View style={styles.fareHeader}>
            <Text style={styles.sectionEyebrow}>
              FARE BREAKDOWN
            </Text>

            {isVibePlusActive && (
              <View style={styles.plusBadge}>
                <Text style={styles.plusBadgeText}>
                  VIBE+
                </Text>
              </View>
            )}
          </View>

          <View style={styles.fareRow}>
            <Text style={styles.fareLabel}>
              Ride fare
            </Text>

            <Text style={styles.fareValue}>
              ₹{ride?.price ?? 0}
            </Text>
          </View>

          <View style={styles.fareRow}>
            <Text style={styles.fareLabel}>
              VIBE commission
            </Text>

            <Text
              style={[
                styles.fareValue,
                isVibePlusActive &&
                  styles.zeroCommission,
              ]}
            >
              ₹{commission}
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.fareRow}>
            <Text style={styles.totalLabel}>
              Driver receives
            </Text>

            <Text style={styles.totalValue}>
              ₹{driverReceives}
            </Text>
          </View>
        </View>

        {isVibePlusActive && (
          <View style={styles.vibePlusCard}>
            <Text style={styles.vibePlusTitle}>
              ⚡ VIBE+ is active
            </Text>

            <Text
              style={styles.vibePlusDescription}
            >
              Priority matching is on. The driver
              keeps 100% of the fare.
            </Text>
          </View>
        )}

        <Pressable
          disabled={!ride || !destination}
          style={({ pressed }) => [
            styles.confirmButton,
            pressed && styles.confirmPressed,
            (!ride || !destination) &&
              styles.confirmDisabled,
          ]}
          onPress={handleConfirm}
        >
          <View>
            <Text style={styles.confirmEyebrow}>
              {isVibePlusActive
                ? "PRIORITY ENERGY"
                : "READY TO ROLL"}
            </Text>

            <Text style={styles.confirmText}>
              {isVibePlusActive
                ? "Lock it in ⚡"
                : "Let's roll →"}
            </Text>
          </View>

          <Text style={styles.confirmPrice}>
            ₹{ride?.price ?? 0}
          </Text>
        </Pressable>

        <Text style={styles.legal}>
          Free cancellation before your driver
          arrives. No drama.
        </Text>
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
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 40,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 22,
  },

  backButton: {
    width: 44,
    height: 44,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: colors.ink,
  },

  backText: {
    fontFamily: fonts.bodyMedium,
    fontSize: 32,
    lineHeight: 34,
    color: colors.ink,
    marginTop: -3,
  },

  headerCenter: {
    flex: 1,
    marginLeft: 14,
  },

  headerSpacer: {
    width: 44,
  },

  eyebrow: {
    fontFamily: fonts.bodyBold,
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1.8,
    color: colors.muted,
    marginBottom: 3,
  },

  headerTitle: {
    fontFamily: fonts.heading,
    fontSize: 21,
    fontWeight: "900",
    color: colors.ink,
  },

  heroCard: {
    backgroundColor: colors.ink,
    borderRadius: 28,
    padding: 20,
    borderWidth: 2,
    borderColor: colors.ink,
    ...shadows.offset,
  },

  heroTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  heroEyebrow: {
    fontFamily: fonts.bodyBold,
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 1.5,
    color: colors.lime,
    marginBottom: 6,
  },

  heroTitle: {
    fontFamily: fonts.display,
    fontSize: 29,
    lineHeight: 31,
    fontWeight: "900",
    letterSpacing: -1,
    color: colors.surface,
  },

  heroIcon: {
    width: 52,
    height: 52,
    borderRadius: radius.pill,
    backgroundColor: colors.lime,
    alignItems: "center",
    justifyContent: "center",
  },

  heroEmoji: {
    fontSize: 27,
  },

  route: {
    backgroundColor: "#1D1D1D",
    borderRadius: 18,
    padding: 15,
  },

  routeRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  routeContent: {
    flex: 1,
    marginLeft: 13,
  },

  routeLabel: {
    fontFamily: fonts.bodyBold,
    fontSize: 8,
    fontWeight: "900",
    letterSpacing: 1.3,
    color: "#969690",
  },

  routeValue: {
    fontFamily: fonts.bodySemibold,
    marginTop: 4,
    fontSize: 14,
    fontWeight: "700",
    color: colors.surface,
  },

  routeAddress: {
    fontFamily: fonts.body,
    marginTop: 3,
    fontSize: 9,
    color: "#969690",
  },

  pickupDot: {
    width: 11,
    height: 11,
    borderRadius: radius.pill,
    backgroundColor: colors.lime,
  },

  destinationDot: {
    width: 11,
    height: 11,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
  },

  routeLine: {
    width: 1,
    height: 17,
    backgroundColor: "#555555",
    marginLeft: 5,
    marginVertical: 3,
  },

  summaryCard: {
    marginTop: 18,
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    padding: 18,
    borderWidth: 2,
    borderColor: colors.ink,
  },

  sectionEyebrow: {
    fontFamily: fonts.bodyBold,
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 1.4,
    color: colors.muted,
  },

  summaryRow: {
    marginTop: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  summaryLabel: {
    fontFamily: fonts.body,
    fontSize: 11,
    color: colors.muted,
  },

  summaryValue: {
    marginTop: 3,
    fontFamily: fonts.heading,
    fontSize: 21,
    fontWeight: "900",
    color: colors.ink,
  },

  summaryEmoji: {
    fontSize: 32,
  },

  etaBadge: {
    backgroundColor: colors.lime,
    borderRadius: radius.md,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1.5,
    borderColor: colors.ink,
  },

  etaText: {
    fontFamily: fonts.bodyBold,
    fontSize: 8,
    fontWeight: "900",
    letterSpacing: 1,
    color: colors.ink,
  },

  divider: {
    height: 1,
    backgroundColor: colors.line,
    marginVertical: 15,
  },

  fareCard: {
    marginTop: 14,
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    padding: 18,
    borderWidth: 2,
    borderColor: colors.ink,
  },

  fareHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  plusBadge: {
    backgroundColor: colors.lime,
    borderRadius: radius.md,
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderWidth: 1.5,
    borderColor: colors.ink,
  },

  plusBadgeText: {
    fontFamily: fonts.bodyBold,
    fontSize: 9,
    fontWeight: "900",
    color: colors.ink,
  },

  fareRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 14,
  },

  fareLabel: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.muted,
  },

  fareValue: {
    fontFamily: fonts.bodyBold,
    fontSize: 13,
    fontWeight: "800",
    color: colors.ink,
  },

  zeroCommission: {
    color: "#579000",
  },

  totalLabel: {
    fontFamily: fonts.bodyBold,
    fontSize: 13,
    fontWeight: "900",
    color: colors.ink,
  },

  totalValue: {
    fontFamily: fonts.heading,
    fontSize: 24,
    fontWeight: "900",
    color: colors.ink,
  },

  vibePlusCard: {
    marginTop: 14,
    backgroundColor: colors.lime,
    borderRadius: radius.xl,
    padding: 17,
    borderWidth: 2,
    borderColor: colors.ink,
    ...shadows.offset,
  },

  vibePlusTitle: {
    fontFamily: fonts.heading,
    fontSize: 17,
    fontWeight: "900",
    color: colors.ink,
  },

  vibePlusDescription: {
    marginTop: 4,
    fontFamily: fonts.body,
    fontSize: 11,
    lineHeight: 16,
    color: colors.ink,
  },

  confirmButton: {
    minHeight: 76,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 16,
    paddingHorizontal: 20,
    backgroundColor: colors.lime,
    borderRadius: radius.xl,
    borderWidth: 2,
    borderColor: colors.ink,
    ...shadows.offset,
  },

  confirmPressed: {
    opacity: 0.72,
  },

  confirmDisabled: {
    opacity: 0.5,
  },

  confirmEyebrow: {
    fontFamily: fonts.bodyBold,
    fontSize: 8,
    fontWeight: "900",
    letterSpacing: 1.4,
    color: colors.muted,
    marginBottom: 2,
  },

  confirmText: {
    fontFamily: fonts.heading,
    fontSize: 19,
    fontWeight: "900",
    color: colors.ink,
  },

  confirmPrice: {
    fontFamily: fonts.heading,
    fontSize: 20,
    fontWeight: "900",
    color: colors.ink,
  },

  legal: {
    marginTop: 14,
    paddingHorizontal: 10,
    textAlign: "center",
    fontFamily: fonts.body,
    fontSize: 9,
    lineHeight: 14,
    color: colors.muted,
  },
});