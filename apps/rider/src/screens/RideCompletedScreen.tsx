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

export default function RideCompletedScreen() {
  const navigation =
    useNavigation<NavigationProp>();

  const {
    rideMinutes,
    driverName,
    driverRating,
    driverVehicle,
    driverPlate,
    saveCompletedRide,
    resetRide,
  } = useRide();

  const handleDone = () => {
    saveCompletedRide();
    resetRide();
    navigation.replace("Home");
  };

  const handleRate = () => {
    // Rating flow will be added later.
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
              Ride complete.
            </Text>
          </View>

          <View style={styles.doneBadge}>
            <Text style={styles.doneBadgeText}>
              DONE
            </Text>
          </View>
        </View>

        {/* HERO */}
        <View style={styles.hero}>
          <View style={styles.heroCircle}>
            <Text style={styles.heroEmoji}>
              ✦
            </Text>
          </View>

          <Text style={styles.heroTitle}>
            You made it.
          </Text>

          <Text style={styles.heroDescription}>
            Smooth ride. No drama. That's a
            W in our books.
          </Text>
        </View>

        {/* SUMMARY */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>
              RIDE TIME
            </Text>

            <Text style={styles.summaryValue}>
              {minutes}:{seconds}
            </Text>
          </View>

          <View style={styles.summaryDivider} />

          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>
              DRIVER
            </Text>

            <Text
              style={styles.summaryValue}
              numberOfLines={1}
            >
              {driverName ?? "Arjun"}
            </Text>
          </View>
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
                  rider rating
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

            <Text style={styles.completedText}>
              COMPLETED
            </Text>
          </View>
        </View>

        {/* RATING */}
        <View style={styles.ratingCard}>
          <Text style={styles.ratingTitle}>
            How was the vibe?
          </Text>

          <Text style={styles.ratingDescription}>
            Give your driver some love.
          </Text>

          <View style={styles.stars}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Pressable
                key={star}
                onPress={handleRate}
                style={({ pressed }) => [
                  styles.starButton,
                  pressed && styles.starPressed,
                ]}
              >
                <Text style={styles.starIcon}>
                  ★
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* ACTION */}
        <View style={styles.actions}>
          <Pressable
            style={({ pressed }) => [
              styles.primaryButton,
              pressed && styles.pressed,
            ]}
            onPress={handleDone}
          >
            <View>
              <Text style={styles.primaryEyebrow}>
                RIDE COMPLETE
              </Text>

              <Text style={styles.primaryText}>
                Back to VIBE
              </Text>
            </View>

            <Text style={styles.primaryArrow}>
              →
            </Text>
          </Pressable>
        </View>

        <Text style={styles.footer}>
          Thanks for riding with VIBE. Stay
          iconic.
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

  doneBadge: {
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: radius.pill,
    backgroundColor: colors.lime,
    borderWidth: 1.5,
    borderColor: colors.ink,
  },

  doneBadgeText: {
    fontFamily: fonts.bodyBold,
    fontSize: 8,
    fontWeight: "900",
    letterSpacing: 1,
    color: colors.ink,
  },

  hero: {
    alignItems: "center",
    marginTop: 23,
  },

  heroCircle: {
    width: 68,
    height: 68,
    borderRadius: radius.pill,
    backgroundColor: colors.lime,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: colors.ink,
    ...shadows.offsetSmall,
  },

  heroEmoji: {
    fontFamily: fonts.heading,
    fontSize: 32,
    fontWeight: "900",
    color: colors.ink,
  },

  heroTitle: {
    marginTop: 15,
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

  summaryCard: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 17,
    padding: 15,
    borderRadius: radius.xl,
    backgroundColor: colors.ink,
    borderWidth: 2,
    borderColor: colors.ink,
  },

  summaryItem: {
    flex: 1,
  },

  summaryDivider: {
    width: 1,
    height: 35,
    marginHorizontal: 12,
    backgroundColor: "#555555",
  },

  summaryLabel: {
    fontFamily: fonts.bodyBold,
    fontSize: 7,
    fontWeight: "900",
    letterSpacing: 1,
    color: colors.lime,
  },

  summaryValue: {
    marginTop: 4,
    fontFamily: fonts.heading,
    fontSize: 16,
    fontWeight: "900",
    color: colors.surface,
  },

  driverCard: {
    marginTop: 11,
    padding: 15,
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

  vehiclePlate: {
    marginTop: 3,
    fontFamily: fonts.bodyMedium,
    fontSize: 9,
    color: colors.muted,
  },

  completedText: {
    fontFamily: fonts.bodyBold,
    fontSize: 7,
    fontWeight: "900",
    letterSpacing: 0.6,
    color: colors.muted,
  },

  ratingCard: {
    marginTop: 10,
    padding: 14,
    borderRadius: radius.lg,
    backgroundColor: colors.limeSoft,
    borderWidth: 1.5,
    borderColor: colors.ink,
  },

  ratingTitle: {
    fontFamily: fonts.bodyBold,
    fontSize: 12,
    fontWeight: "900",
    color: colors.ink,
  },

  ratingDescription: {
    marginTop: 2,
    fontFamily: fonts.body,
    fontSize: 8,
    color: colors.muted,
  },

  stars: {
    flexDirection: "row",
    marginTop: 7,
  },

  starButton: {
    width: 39,
    height: 34,
    marginRight: 6,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.ink,
  },

  starIcon: {
    fontSize: 17,
    color: colors.ink,
  },

  starPressed: {
    opacity: 0.6,
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