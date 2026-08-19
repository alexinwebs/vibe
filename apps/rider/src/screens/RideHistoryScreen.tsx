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
import {
  CompletedRide,
  useRide,
} from "../state/RideContext";
import {
  colors,
  fonts,
  radius,
  shadows,
} from "../theme/theme";

type NavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

function getVehicleEmoji(
  rideType: CompletedRide["rideType"],
) {
  switch (rideType) {
    case "VIBE Comfort":
      return "🛺";

    case "VIBE XL":
      return "🚕";

    default:
      return "🛵";
  }
}

function getVehicleLabel(
  rideType: CompletedRide["rideType"],
) {
  switch (rideType) {
    case "VIBE Comfort":
      return "Auto";

    case "VIBE XL":
      return "Cab";

    default:
      return "Bike";
  }
}

function formatDate(
  isoDate: string,
) {
  const date = new Date(isoDate);

  return date.toLocaleDateString(
    "en-IN",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    },
  );
}

function formatTime(
  isoDate: string,
) {
  const date = new Date(isoDate);

  return date.toLocaleTimeString(
    "en-IN",
    {
      hour: "numeric",
      minute: "2-digit",
    },
  );
}

function formatDuration(
  seconds: number,
) {
  const minutes = Math.floor(
    seconds / 60,
  );

  const remainingSeconds =
    seconds % 60;

  if (minutes === 0) {
    return `${remainingSeconds}s`;
  }

  return `${minutes}m ${remainingSeconds}s`;
}

function RatingDisplay({
  rating,
}: {
  rating: CompletedRide["riderRating"];
}) {
  if (!rating) {
    return (
      <View style={styles.unrated}>
        <Text style={styles.unratedText}>
          NOT RATED
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.ratingDisplay}>
      <Text style={styles.ratingStars}>
        {"★".repeat(rating)}
        <Text style={styles.emptyStars}>
          {"★".repeat(5 - rating)}
        </Text>
      </Text>

      <Text style={styles.ratingNumber}>
        {rating}/5
      </Text>
    </View>
  );
}

function RideHistoryCard({
  ride,
}: {
  ride: CompletedRide;
}) {
  const vehicleEmoji =
    getVehicleEmoji(ride.rideType);

  const vehicleLabel =
    getVehicleLabel(ride.rideType);

  return (
    <View style={styles.rideCard}>
      {/* TOP */}
      <View style={styles.cardTop}>
        <View style={styles.vehicleIcon}>
          <Text style={styles.vehicleEmoji}>
            {vehicleEmoji}
          </Text>
        </View>

        <View style={styles.rideMain}>
          <View style={styles.rideTitleRow}>
            <Text style={styles.rideType}>
              {vehicleLabel}
            </Text>

            <Text style={styles.fare}>
              ₹{ride.fare}
            </Text>
          </View>

          <Text style={styles.destination}>
            {ride.destination.name}
          </Text>

          {ride.destination.address ? (
            <Text
              style={styles.address}
              numberOfLines={1}
            >
              {ride.destination.address}
            </Text>
          ) : null}
        </View>
      </View>

      <View style={styles.divider} />

      {/* DETAILS */}
      <View style={styles.detailsRow}>
        <View style={styles.detail}>
          <Text style={styles.detailLabel}>
            DRIVER
          </Text>

          <Text style={styles.detailValue}>
            {ride.driverName}
          </Text>
        </View>

        <View style={styles.detail}>
          <Text style={styles.detailLabel}>
            DRIVER RATING
          </Text>

          <Text style={styles.detailValue}>
            ★ {ride.driverRating}
          </Text>
        </View>

        <View style={styles.detail}>
          <Text style={styles.detailLabel}>
            DURATION
          </Text>

          <Text style={styles.detailValue}>
            {formatDuration(
              ride.durationSeconds,
            )}
          </Text>
        </View>
      </View>

      {/* RIDER RATING */}
      <View style={styles.riderRatingSection}>
        <View>
          <Text style={styles.riderRatingLabel}>
            YOUR RATING
          </Text>

          <RatingDisplay
            rating={ride.riderRating}
          />
        </View>

        <Text style={styles.feedbackMark}>
          ✦
        </Text>
      </View>

      {/* FOOTER */}
      <View style={styles.bottomRow}>
        <Text style={styles.date}>
          {formatDate(ride.completedAt)}
          {" · "}
          {formatTime(ride.completedAt)}
        </Text>

        <View style={styles.completedBadge}>
          <Text style={styles.completedBadgeText}>
            COMPLETED
          </Text>
        </View>
      </View>
    </View>
  );
}

export default function RideHistoryScreen() {
  const navigation =
    useNavigation<NavigationProp>();

  const { completedRides } =
    useRide();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />

      <View style={styles.container}>
        {/* HEADER */}
        <View style={styles.header}>
          <Pressable
            onPress={() =>
              navigation.goBack()
            }
            style={({ pressed }) => [
              styles.backButton,
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.backArrow}>
              ←
            </Text>
          </Pressable>

          <View style={styles.headerCenter}>
            <Text style={styles.eyebrow}>
              VIBE
            </Text>

            <Text style={styles.headerTitle}>
              Ride history
            </Text>
          </View>

          <View style={styles.countBadge}>
            <Text style={styles.countText}>
              {completedRides.length}
            </Text>
          </View>
        </View>

        {/* EMPTY STATE */}
        {completedRides.length === 0 ? (
          <View style={styles.emptyState}>
            <View style={styles.emptyIcon}>
              <Text style={styles.emptyEmoji}>
                🛣️
              </Text>
            </View>

            <Text style={styles.emptyTitle}>
              No rides yet.
            </Text>

            <Text style={styles.emptyDescription}>
              Your completed rides will show up
              here once you've taken your first
              VIBE.
            </Text>

            <Pressable
              style={({ pressed }) => [
                styles.startButton,
                pressed && styles.pressed,
              ]}
              onPress={() =>
                navigation.navigate(
                  "Destination",
                )
              }
            >
              <Text style={styles.startButtonText}>
                Book a ride
              </Text>

              <Text style={styles.startButtonArrow}>
                →
              </Text>
            </Pressable>
          </View>
        ) : (
          <>
            {/* SUMMARY */}
            <View style={styles.summary}>
              <View>
                <Text style={styles.summaryEyebrow}>
                  YOUR RIDES
                </Text>

                <Text style={styles.summaryTitle}>
                  {completedRides.length}{" "}
                  {completedRides.length === 1
                    ? "ride"
                    : "rides"}{" "}
                  completed
                </Text>
              </View>

              <Text style={styles.summaryMark}>
                ✦
              </Text>
            </View>

            {/* LIST */}
            <ScrollView
              style={styles.scroll}
              contentContainerStyle={
                styles.scrollContent
              }
              showsVerticalScrollIndicator={false}
            >
              {completedRides.map(
                (ride) => (
                  <RideHistoryCard
                    key={ride.id}
                    ride={ride}
                  />
                ),
              )}

              <View
                style={styles.bottomSpace}
              />
            </ScrollView>
          </>
        )}
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
  },

  /* HEADER */

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: radius.pill,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.ink,
  },

  backArrow: {
    fontFamily: fonts.bodyBold,
    fontSize: 20,
    fontWeight: "900",
    color: colors.ink,
  },

  headerCenter: {
    alignItems: "center",
  },

  eyebrow: {
    fontFamily: fonts.bodyBold,
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 2,
    color: colors.muted,
  },

  headerTitle: {
    marginTop: 3,
    fontFamily: fonts.heading,
    fontSize: 20,
    fontWeight: "900",
    color: colors.ink,
  },

  countBadge: {
    minWidth: 42,
    height: 42,
    paddingHorizontal: 9,
    borderRadius: radius.pill,
    backgroundColor: colors.lime,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: colors.ink,
  },

  countText: {
    fontFamily: fonts.heading,
    fontSize: 15,
    fontWeight: "900",
    color: colors.ink,
  },

  /* SUMMARY */

  summary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 24,
    padding: 16,
    borderRadius: radius.xl,
    backgroundColor: colors.ink,
    borderWidth: 2,
    borderColor: colors.ink,
    ...shadows.offsetSmall,
  },

  summaryEyebrow: {
    fontFamily: fonts.bodyBold,
    fontSize: 7,
    fontWeight: "900",
    letterSpacing: 1.2,
    color: colors.lime,
  },

  summaryTitle: {
    marginTop: 4,
    fontFamily: fonts.heading,
    fontSize: 16,
    fontWeight: "900",
    color: colors.surface,
  },

  summaryMark: {
    fontFamily: fonts.heading,
    fontSize: 28,
    color: colors.lime,
  },

  /* LIST */

  scroll: {
    flex: 1,
    marginTop: 14,
  },

  scrollContent: {
    paddingBottom: 10,
  },

  /* CARD */

  rideCard: {
    marginBottom: 11,
    padding: 15,
    borderRadius: radius.xl,
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderColor: colors.ink,
    ...shadows.offsetSmall,
  },

  cardTop: {
    flexDirection: "row",
    alignItems: "center",
  },

  vehicleIcon: {
    width: 48,
    height: 48,
    borderRadius: radius.md,
    backgroundColor: colors.lime,
    alignItems: "center",
    justifyContent: "center",
  },

  vehicleEmoji: {
    fontSize: 23,
  },

  rideMain: {
    flex: 1,
    marginLeft: 12,
  },

  rideTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  rideType: {
    fontFamily: fonts.heading,
    fontSize: 15,
    fontWeight: "900",
    color: colors.ink,
  },

  fare: {
    fontFamily: fonts.heading,
    fontSize: 15,
    fontWeight: "900",
    color: colors.ink,
  },

  destination: {
    marginTop: 3,
    fontFamily: fonts.bodyBold,
    fontSize: 11,
    fontWeight: "800",
    color: colors.ink,
  },

  address: {
    marginTop: 2,
    fontFamily: fonts.body,
    fontSize: 8,
    color: colors.muted,
  },

  divider: {
    height: 1,
    marginVertical: 13,
    backgroundColor: colors.line,
  },

  /* DETAILS */

  detailsRow: {
    flexDirection: "row",
  },

  detail: {
    flex: 1,
  },

  detailLabel: {
    fontFamily: fonts.bodyBold,
    fontSize: 6,
    fontWeight: "900",
    letterSpacing: 0.8,
    color: colors.muted,
  },

  detailValue: {
    marginTop: 3,
    fontFamily: fonts.bodyBold,
    fontSize: 9,
    fontWeight: "800",
    color: colors.ink,
  },

  /* RIDER RATING */

  riderRatingSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 13,
    padding: 10,
    borderRadius: radius.md,
    backgroundColor: colors.limeSoft,
  },

  riderRatingLabel: {
    fontFamily: fonts.bodyBold,
    fontSize: 6,
    fontWeight: "900",
    letterSpacing: 0.9,
    color: colors.muted,
  },

  ratingDisplay: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },

  ratingStars: {
    fontFamily: fonts.bodyBold,
    fontSize: 12,
    fontWeight: "900",
    color: colors.ink,
    letterSpacing: 1,
  },

  emptyStars: {
    color: "#C8C8C2",
  },

  ratingNumber: {
    marginLeft: 7,
    fontFamily: fonts.bodyBold,
    fontSize: 8,
    fontWeight: "900",
    color: colors.ink,
  },

  unrated: {
    marginTop: 4,
  },

  unratedText: {
    fontFamily: fonts.bodyBold,
    fontSize: 7,
    fontWeight: "900",
    letterSpacing: 0.5,
    color: colors.muted,
  },

  feedbackMark: {
    fontFamily: fonts.heading,
    fontSize: 22,
    color: colors.ink,
  },

  /* FOOTER */

  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 13,
  },

  date: {
    fontFamily: fonts.body,
    fontSize: 8,
    color: colors.muted,
  },

  completedBadge: {
    paddingHorizontal: 7,
    paddingVertical: 5,
    borderRadius: radius.md,
    backgroundColor: colors.limeSoft,
  },

  completedBadgeText: {
    fontFamily: fonts.bodyBold,
    fontSize: 6,
    fontWeight: "900",
    letterSpacing: 0.6,
    color: colors.ink,
  },

  /* EMPTY */

  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 25,
    paddingBottom: 60,
  },

  emptyIcon: {
    width: 78,
    height: 78,
    borderRadius: radius.pill,
    backgroundColor: colors.lime,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: colors.ink,
    ...shadows.offsetSmall,
  },

  emptyEmoji: {
    fontSize: 34,
  },

  emptyTitle: {
    marginTop: 20,
    fontFamily: fonts.display,
    fontSize: 30,
    lineHeight: 33,
    fontWeight: "900",
    letterSpacing: -1,
    color: colors.ink,
  },

  emptyDescription: {
    maxWidth: 290,
    marginTop: 8,
    textAlign: "center",
    fontFamily: fonts.body,
    fontSize: 11,
    lineHeight: 17,
    color: colors.muted,
  },

  startButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    minHeight: 56,
    marginTop: 22,
    paddingHorizontal: 18,
    borderRadius: radius.xl,
    backgroundColor: colors.ink,
    borderWidth: 2,
    borderColor: colors.ink,
    ...shadows.offset,
  },

  startButtonText: {
    fontFamily: fonts.heading,
    fontSize: 15,
    fontWeight: "900",
    color: colors.surface,
  },

  startButtonArrow: {
    fontFamily: fonts.bodyBold,
    fontSize: 20,
    color: colors.lime,
  },

  pressed: {
    opacity: 0.7,
  },

  bottomSpace: {
    height: 20,
  },
});