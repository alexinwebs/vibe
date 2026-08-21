import React, {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import type { Ride } from "@vibe/types";

import {
  acceptRide,
  getPendingRides,
  getRideTypeLabel,
  goOffline as apiGoOffline,
  goOnline as apiGoOnline,
} from "../api/vibeApi";

import { useDriver } from "../state/DriverContext";

export default function DriverHomeScreen() {
  const {
    driverStatus,
    driverName,
    driverId,
    goOnline,
    goOffline,
  } = useDriver();

  const [pendingRides, setPendingRides] =
    useState<Ride[]>([]);

  const [acceptedRide, setAcceptedRide] =
    useState<Ride | null>(null);

  const [loadingRides, setLoadingRides] =
    useState(false);

  const [acceptingRideId, setAcceptingRideId] =
    useState<string | null>(null);

  const [apiError, setApiError] =
    useState<string | null>(null);

  const isOnline =
    driverStatus === "online";

  const loadPendingRides =
    useCallback(async () => {
      if (!isOnline || acceptedRide) {
        return;
      }

      try {
        setLoadingRides(true);
        setApiError(null);

        const rides =
          await getPendingRides(driverId);

        setPendingRides(rides);
      } catch (error) {
        console.warn(
          "Failed to load pending rides:",
          error,
        );

        setApiError(
          error instanceof Error
            ? error.message
            : "Failed to load rides.",
        );
      } finally {
        setLoadingRides(false);
      }
    }, [
      driverId,
      isOnline,
      acceptedRide,
    ]);

  useEffect(() => {
    if (!isOnline) {
      setPendingRides([]);
      return;
    }

    if (acceptedRide) {
      return;
    }

    loadPendingRides();

    const interval =
      setInterval(
        loadPendingRides,
        3000,
      );

    return () =>
      clearInterval(interval);
  }, [
    isOnline,
    acceptedRide,
    loadPendingRides,
  ]);

  const handleGoOnline = async () => {
    try {
      setApiError(null);

      await apiGoOnline(driverId);

      goOnline();
    } catch (error) {
      console.warn(
        "Failed to go online:",
        error,
      );

      setApiError(
        error instanceof Error
          ? error.message
          : "Failed to go online.",
      );
    }
  };

  const handleGoOffline = async () => {
    try {
      setApiError(null);

      await apiGoOffline(driverId);

      goOffline();
    } catch (error) {
      console.warn(
        "Failed to go offline:",
        error,
      );

      setApiError(
        error instanceof Error
          ? error.message
          : "Failed to go offline.",
      );
    }
  };

  const handleAcceptRide = async (
    ride: Ride,
  ) => {
    if (acceptingRideId || acceptedRide) {
      return;
    }

    try {
      setApiError(null);
      setAcceptingRideId(ride.id);

      const result =
        await acceptRide(
          ride.id,
          driverId,
        );

      setAcceptedRide(result.ride);

      setPendingRides((currentRides) =>
        currentRides.filter(
          (currentRide) =>
            currentRide.id !== ride.id,
        ),
      );
    } catch (error) {
      console.warn(
        "Failed to accept ride:",
        error,
      );

      setApiError(
        error instanceof Error
          ? error.message
          : "Failed to accept ride.",
      );
    } finally {
      setAcceptingRideId(null);
    }
  };

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={
        styles.container
      }
    >
      <View style={styles.header}>
        <View>
          <Text style={styles.eyebrow}>
            VIBE DRIVER
          </Text>

          <Text style={styles.title}>
            Hey, {driverName}.
          </Text>
        </View>

        <View
          style={[
            styles.statusBadge,
            isOnline
              ? styles.onlineBadge
              : styles.offlineBadge,
          ]}
        >
          <View
            style={[
              styles.statusDot,
              isOnline
                ? styles.onlineDot
                : styles.offlineDot,
            ]}
          />

          <Text
            style={[
              styles.statusText,
              isOnline
                ? styles.onlineText
                : styles.offlineText,
            ]}
          >
            {isOnline
              ? "ONLINE"
              : "OFFLINE"}
          </Text>
        </View>
      </View>

      <View style={styles.hero}>
        <Text style={styles.heroEyebrow}>
          DRIVER STATUS
        </Text>

        <Text style={styles.heroTitle}>
          {acceptedRide
            ? "Ride accepted."
            : isOnline
              ? "You're live."
              : "You're offline."}
        </Text>

        <Text style={styles.heroDescription}>
          {acceptedRide
            ? "You have accepted a VIBE ride. Complete this ride before accepting another request."
            : isOnline
              ? "VIBE is checking for new ride requests."
              : "Go online when you're ready to receive ride requests."}
        </Text>

        {!acceptedRide ? (
          <Pressable
            onPress={
              isOnline
                ? handleGoOffline
                : handleGoOnline
            }
            style={({ pressed }) => [
              styles.toggleButton,
              isOnline
                ? styles.offlineButton
                : styles.onlineButton,
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.buttonText}>
              {isOnline
                ? "GO OFFLINE"
                : "GO ONLINE"}
            </Text>

            <Text style={styles.arrow}>
              →
            </Text>
          </Pressable>
        ) : null}
      </View>

      {apiError ? (
        <View style={styles.errorCard}>
          <Text style={styles.errorTitle}>
            Connection problem
          </Text>

          <Text style={styles.errorText}>
            {apiError}
          </Text>
        </View>
      ) : null}

      {acceptedRide ? (
        <View style={styles.acceptedSection}>
          <Text style={styles.sectionTitle}>
            ACTIVE RIDE
          </Text>

          <View style={styles.acceptedCard}>
            <View
              style={styles.acceptedHeader}
            >
              <View>
                <Text
                  style={
                    styles.acceptedEyebrow
                  }
                >
                  DRIVER ASSIGNED
                </Text>

                <Text
                  style={
                    styles.acceptedRideType
                  }
                >
                  {getRideTypeLabel(
                    acceptedRide.rideType,
                  )}
                </Text>
              </View>

              <View
                style={
                  styles.acceptedStatus
                }
              >
                <Text
                  style={
                    styles.acceptedStatusText
                  }
                >
                  ACCEPTED
                </Text>
              </View>
            </View>

            <View style={styles.route}>
              <View
                style={styles.routeLine}
              >
                <View
                  style={styles.pickupDot}
                />

                <View
                  style={
                    styles.addressContainer
                  }
                >
                  <Text
                    style={
                      styles.addressLabel
                    }
                  >
                    PICKUP
                  </Text>

                  <Text
                    style={styles.address}
                  >
                    {
                      acceptedRide.pickupAddress
                    }
                  </Text>
                </View>
              </View>

              <View
                style={styles.verticalLine}
              />

              <View
                style={styles.routeLine}
              >
                <View
                  style={
                    styles.destinationDot
                  }
                />

                <View
                  style={
                    styles.addressContainer
                  }
                >
                  <Text
                    style={
                      styles.addressLabel
                    }
                  >
                    DESTINATION
                  </Text>

                  <Text
                    style={styles.address}
                  >
                    {
                      acceptedRide.destinationAddress
                    }
                  </Text>
                </View>
              </View>
            </View>

            <View
              style={styles.fareRow}
            >
              <Text
                style={styles.fareLabel}
              >
                ESTIMATED FARE
              </Text>

              <Text
                style={styles.fareValue}
              >
                ₹
                {
                  acceptedRide.estimatedFare
                }
              </Text>
            </View>

            <View
              style={styles.assignedCard}
            >
              <Text
                style={styles.assignedTitle}
              >
                Ride assigned successfully
              </Text>

              <Text
                style={styles.assignedText}
              >
                Ride ID: {acceptedRide.id}
              </Text>
            </View>
          </View>
        </View>
      ) : null}

      {!acceptedRide && isOnline ? (
        <View style={styles.requestsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              RIDE REQUESTS
            </Text>

            {loadingRides ? (
              <ActivityIndicator
                size="small"
              />
            ) : null}
          </View>

          {pendingRides.length === 0 ? (
            <View style={styles.emptyCard}>
              <Text style={styles.emptyIcon}>
                ✦
              </Text>

              <Text style={styles.emptyTitle}>
                Waiting for rides
              </Text>

              <Text style={styles.emptyText}>
                New ride requests will appear
                here automatically.
              </Text>
            </View>
          ) : (
            pendingRides.map((ride) => (
              <RideRequestCard
                key={ride.id}
                ride={ride}
                onAccept={handleAcceptRide}
                accepting={
                  acceptingRideId ===
                  ride.id
                }
              />
            ))
          )}
        </View>
      ) : null}

      <View style={styles.statsCard}>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>
            TODAY
          </Text>

          <Text style={styles.statValue}>
            {acceptedRide
              ? `₹${acceptedRide.estimatedFare}`
              : "₹0"}
          </Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.stat}>
          <Text style={styles.statLabel}>
            ACTIVE
          </Text>

          <Text style={styles.statValue}>
            {acceptedRide ? "1" : "0"}
          </Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.stat}>
          <Text style={styles.statLabel}>
            RATING
          </Text>

          <Text style={styles.statValue}>
            ★ 5.0
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

function RideRequestCard({
  ride,
  onAccept,
  accepting,
}: {
  ride: Ride;
  onAccept: (ride: Ride) => void;
  accepting: boolean;
}) {
  return (
    <View style={styles.rideCard}>
      <View style={styles.rideCardHeader}>
        <View>
          <Text style={styles.rideEyebrow}>
            NEW RIDE REQUEST
          </Text>

          <Text style={styles.rideType}>
            {getRideTypeLabel(
              ride.rideType,
            )}
          </Text>
        </View>

        <View style={styles.fareBadge}>
          <Text style={styles.fareText}>
            ₹{ride.estimatedFare}
          </Text>
        </View>
      </View>

      <View style={styles.route}>
        <View style={styles.routeLine}>
          <View style={styles.pickupDot} />

          <View
            style={styles.addressContainer}
          >
            <Text style={styles.addressLabel}>
              PICKUP
            </Text>

            <Text style={styles.address}>
              {ride.pickupAddress}
            </Text>
          </View>
        </View>

        <View style={styles.verticalLine} />

        <View style={styles.routeLine}>
          <View
            style={styles.destinationDot}
          />

          <View
            style={styles.addressContainer}
          >
            <Text style={styles.addressLabel}>
              DESTINATION
            </Text>

            <Text style={styles.address}>
              {ride.destinationAddress}
            </Text>
          </View>
        </View>
      </View>

      <Pressable
        disabled={accepting}
        onPress={() =>
          onAccept(ride)
        }
        style={({ pressed }) => [
          styles.acceptButton,
          accepting &&
            styles.acceptButtonDisabled,
          pressed &&
            !accepting &&
            styles.pressed,
        ]}
      >
        {accepting ? (
          <ActivityIndicator
            size="small"
            color="#FFFFFF"
          />
        ) : (
          <Text
            style={
              styles.acceptButtonText
            }
          >
            ACCEPT RIDE
          </Text>
        )}

        <Text style={styles.comingSoon}>
          {accepting
            ? "ACCEPTING"
            : "NEXT"}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: "#F5F5F0",
  },

  container: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  eyebrow: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 2,
    color: "#777777",
  },

  title: {
    marginTop: 5,
    fontSize: 25,
    fontWeight: "900",
    color: "#111111",
  },

  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#111111",
    borderRadius: 30,
    paddingHorizontal: 11,
    paddingVertical: 8,
  },

  onlineBadge: {
    backgroundColor: "#D7FF3F",
  },

  offlineBadge: {
    backgroundColor: "#FFFFFF",
  },

  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },

  onlineDot: {
    backgroundColor: "#111111",
  },

  offlineDot: {
    backgroundColor: "#888888",
  },

  statusText: {
    fontSize: 8,
    fontWeight: "900",
    letterSpacing: 1,
  },

  onlineText: {
    color: "#111111",
  },

  offlineText: {
    color: "#555555",
  },

  hero: {
    marginTop: 28,
    padding: 20,
    borderRadius: 24,
    backgroundColor: "#111111",
  },

  heroEyebrow: {
    fontSize: 8,
    fontWeight: "900",
    letterSpacing: 2,
    color: "#D7FF3F",
  },

  heroTitle: {
    marginTop: 8,
    fontSize: 32,
    fontWeight: "900",
    color: "#FFFFFF",
  },

  heroDescription: {
    marginTop: 8,
    fontSize: 12,
    lineHeight: 18,
    color: "#BBBBBB",
  },

  toggleButton: {
    marginTop: 22,
    minHeight: 54,
    paddingHorizontal: 18,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: "#111111",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  onlineButton: {
    backgroundColor: "#D7FF3F",
  },

  offlineButton: {
    backgroundColor: "#FFFFFF",
  },

  buttonText: {
    fontSize: 14,
    fontWeight: "900",
    color: "#111111",
  },

  arrow: {
    fontSize: 22,
    fontWeight: "900",
    color: "#111111",
  },

  pressed: {
    opacity: 0.7,
  },

  errorCard: {
    marginTop: 16,
    padding: 15,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: "#FF5C5C",
    backgroundColor: "#FFE4E4",
  },

  errorTitle: {
    fontSize: 12,
    fontWeight: "900",
    color: "#111111",
  },

  errorText: {
    marginTop: 4,
    fontSize: 11,
    color: "#555555",
  },

  acceptedSection: {
    marginTop: 22,
  },

  acceptedCard: {
    marginTop: 10,
    padding: 18,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: "#111111",
    backgroundColor: "#FFFFFF",
  },

  acceptedHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  acceptedEyebrow: {
    fontSize: 8,
    fontWeight: "900",
    letterSpacing: 1.5,
    color: "#49B96B",
  },

  acceptedRideType: {
    marginTop: 4,
    fontSize: 20,
    fontWeight: "900",
    color: "#111111",
  },

  acceptedStatus: {
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 10,
    backgroundColor: "#D7FF3F",
    borderWidth: 2,
    borderColor: "#111111",
  },

  acceptedStatusText: {
    fontSize: 8,
    fontWeight: "900",
    letterSpacing: 1,
    color: "#111111",
  },

  route: {
    marginTop: 20,
  },

  routeLine: {
    flexDirection: "row",
    alignItems: "center",
  },

  pickupDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#111111",
    marginRight: 12,
  },

  destinationDot: {
    width: 10,
    height: 10,
    borderRadius: 2,
    backgroundColor: "#D7FF3F",
    borderWidth: 2,
    borderColor: "#111111",
    marginRight: 12,
  },

  verticalLine: {
    width: 2,
    height: 18,
    backgroundColor: "#CCCCCC",
    marginLeft: 4,
    marginVertical: 2,
  },

  addressContainer: {
    flex: 1,
  },

  addressLabel: {
    fontSize: 7,
    fontWeight: "900",
    letterSpacing: 1,
    color: "#888888",
  },

  address: {
    marginTop: 2,
    fontSize: 13,
    fontWeight: "700",
    color: "#111111",
  },

  fareRow: {
    marginTop: 20,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: "#DDDDDD",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  fareLabel: {
    fontSize: 8,
    fontWeight: "900",
    letterSpacing: 1,
    color: "#777777",
  },

  fareValue: {
    fontSize: 18,
    fontWeight: "900",
    color: "#111111",
  },

  assignedCard: {
    marginTop: 16,
    padding: 13,
    borderRadius: 14,
    backgroundColor: "#EEFFC0",
  },

  assignedTitle: {
    fontSize: 11,
    fontWeight: "900",
    color: "#111111",
  },

  assignedText: {
    marginTop: 4,
    fontSize: 9,
    color: "#666666",
  },

  requestsSection: {
    marginTop: 22,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  sectionTitle: {
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 2,
    color: "#555555",
  },

  emptyCard: {
    padding: 24,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: "#111111",
    backgroundColor: "#EEFFC0",
    alignItems: "center",
  },

  emptyIcon: {
    fontSize: 28,
    color: "#111111",
  },

  emptyTitle: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: "900",
    color: "#111111",
  },

  emptyText: {
    marginTop: 5,
    fontSize: 11,
    lineHeight: 16,
    textAlign: "center",
    color: "#555555",
  },

  rideCard: {
    marginBottom: 14,
    padding: 18,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: "#111111",
    backgroundColor: "#FFFFFF",
  },

  rideCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  rideEyebrow: {
    fontSize: 8,
    fontWeight: "900",
    letterSpacing: 1.5,
    color: "#777777",
  },

  rideType: {
    marginTop: 4,
    fontSize: 20,
    fontWeight: "900",
    color: "#111111",
  },

  fareBadge: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: "#D7FF3F",
    borderWidth: 2,
    borderColor: "#111111",
  },

  fareText: {
    fontSize: 15,
    fontWeight: "900",
    color: "#111111",
  },

  acceptButton: {
    marginTop: 20,
    minHeight: 50,
    borderRadius: 13,
    backgroundColor: "#111111",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },

  acceptButtonDisabled: {
    opacity: 0.55,
  },

  acceptButtonText: {
    fontSize: 12,
    fontWeight: "900",
    color: "#FFFFFF",
  },

  comingSoon: {
    fontSize: 8,
    fontWeight: "900",
    letterSpacing: 1,
    color: "#D7FF3F",
  },

  statsCard: {
    marginTop: 16,
    paddingVertical: 18,
    paddingHorizontal: 10,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: "#111111",
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
  },

  stat: {
    flex: 1,
    alignItems: "center",
  },

  statLabel: {
    fontSize: 7,
    fontWeight: "900",
    letterSpacing: 1,
    color: "#777777",
  },

  statValue: {
    marginTop: 5,
    fontSize: 15,
    fontWeight: "900",
    color: "#111111",
  },

  divider: {
    width: 1,
    height: 32,
    backgroundColor: "#DDDDDD",
  },
});
