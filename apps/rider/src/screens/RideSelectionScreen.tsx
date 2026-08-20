import React, { useMemo, useState } from "react";
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
import { useRide } from "../state/RideContext";
import { useVibePlus } from "../state/VibePlusContext";
import {
  colors,
  fonts,
  radius,
  shadows,
} from "../theme/theme";

type NavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

type Ride = {
  type:
    | "VIBE Go"
    | "VIBE Comfort"
    | "VIBE XL";
  emoji: string;
  fare: number;
  eta: number;
  description: string;
};

const rides: Ride[] = [
  {
    type: "VIBE Go",
    emoji: "🛵",
    fare: 72,
    eta: 5,
    description: "Zoomies mode",
  },
  {
    type: "VIBE Comfort",
    emoji: "🛺",
    fare: 108,
    eta: 4,
    description: "Wallet said thank you",
  },
  {
    type: "VIBE XL",
    emoji: "🚕",
    fare: 168,
    eta: 7,
    description: "Comfy era",
  },
];

export default function RideSelectionScreen() {
  const navigation =
    useNavigation<NavigationProp>();

  const {
    destination,
    selectedRide: contextRide,
    setSelectedRide,
  } = useRide();

  const {
    isVibePlusActive,
    isLoading,
  } = useVibePlus();

  const initialRide =
    rides.find(
      (ride) =>
        ride.type === contextRide?.type,
    ) ?? rides[0];

  const [selectedRide, setLocalSelectedRide] =
    useState<Ride>(initialRide);

  const commission = useMemo(() => {
    if (isVibePlusActive) {
      return 0;
    }

    return Math.round(
      selectedRide.fare * 0.1,
    );
  }, [
    selectedRide.fare,
    isVibePlusActive,
  ]);

  const driverReceives =
    selectedRide.fare - commission;

  const selectRide = (ride: Ride) => {
    setLocalSelectedRide(ride);
  };

  const continueToConfirm = () => {
    setSelectedRide({
      type: selectedRide.type,
      price: selectedRide.fare,
      eta: selectedRide.eta,
    });

    navigation.navigate("ConfirmRide");
  };

  const openVibePlus = () => {
    navigation.navigate("VibePlus");
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
            onPress={() =>
              navigation.navigate("Destination")
            }
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
              Pick your vibe.
            </Text>
          </View>

          <View style={styles.headerSpacer} />
        </View>

        <View style={styles.destinationCard}>
          <View style={styles.destinationDot} />

          <View style={styles.destinationInfo}>
            <Text style={styles.destinationLabel}>
              YOU'RE GOING TO
            </Text>

            <Text style={styles.destinationName}>
              {destination?.name ??
                "No destination selected"}
            </Text>

            {destination?.address ? (
              <Text
                style={styles.destinationAddress}
                numberOfLines={1}
              >
                {destination.address}
              </Text>
            ) : null}
          </View>

          <Text style={styles.destinationArrow}>
            →
          </Text>
        </View>

        <View style={styles.pickBanner}>
          <View style={styles.pickBadge}>
            <Text style={styles.pickBadgeText}>
              VIBE PICK
            </Text>
          </View>

          <View style={styles.pickCopy}>
            <Text style={styles.pickTitle}>
              Main character pick ✦
            </Text>

            <Text style={styles.pickDescription}>
              Fastest way there. We did the math.
            </Text>
          </View>

          <Text style={styles.pickSpark}>
            ✦
          </Text>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Choose your vibe
          </Text>

          <Text style={styles.sectionHint}>
            no bad choices
          </Text>
        </View>

        <View style={styles.rideList}>
          {rides.map((ride) => {
            const selected =
              selectedRide.type === ride.type;

            return (
              <Pressable
                key={ride.type}
                onPress={() =>
                  selectRide(ride)
                }
                style={({ pressed }) => [
                  styles.rideCard,
                  selected &&
                    styles.rideCardSelected,
                  pressed &&
                    styles.pressed,
                ]}
              >
                <View
                  style={[
                    styles.rideIcon,
                    selected &&
                      styles.rideIconSelected,
                  ]}
                >
                  <Text style={styles.rideEmoji}>
                    {ride.emoji}
                  </Text>
                </View>

                <View style={styles.rideInfo}>
                  <View style={styles.rideNameRow}>
                    <Text style={styles.rideName}>
                      {ride.type}
                    </Text>

                    {selected && (
                      <View
                        style={
                          styles.selectedBadge
                        }
                      >
                        <Text
                          style={
                            styles.selectedBadgeText
                          }
                        >
                          LOCKED
                        </Text>
                      </View>
                    )}
                  </View>

                  <Text style={styles.rideMeta}>
                    {ride.eta} min away ·{" "}
                    {ride.description}
                  </Text>
                </View>

                <View style={styles.ridePrice}>
                  <Text style={styles.price}>
                    ₹{ride.fare}
                  </Text>

                  <Text style={styles.priceLabel}>
                    est.
                  </Text>
                </View>
              </Pressable>
            );
          })}
        </View>

        <View style={styles.plusSectionHeader}>
          <View>
            <Text style={styles.plusEyebrow}>
              {isVibePlusActive
                ? "MAIN CHARACTER STATUS"
                : "WANT PRIORITY ENERGY?"}
            </Text>

            <Text style={styles.plusSectionTitle}>
              VIBE+
            </Text>
          </View>

          <View style={styles.plusPriceBadge}>
            <Text style={styles.plusPrice}>
              {isVibePlusActive
                ? "ACTIVE"
                : "₹99"}
            </Text>

            {!isVibePlusActive && (
              <Text style={styles.plusMonth}>
                / month
              </Text>
            )}
          </View>
        </View>

        <Pressable
          onPress={openVibePlus}
          style={({ pressed }) => [
            styles.plusCard,
            isVibePlusActive &&
              styles.plusCardActive,
            pressed && styles.pressed,
          ]}
        >
          <View style={styles.plusTopRow}>
            <View
              style={[
                styles.plusSelector,
                isVibePlusActive &&
                  styles.plusSelectorActive,
              ]}
            >
              {isVibePlusActive && (
                <Text style={styles.check}>
                  ✓
                </Text>
              )}
            </View>

            <View style={styles.plusMain}>
              <View style={styles.plusTitleRow}>
                <Text style={styles.plusTitle}>
                  {isVibePlusActive
                    ? "VIBE+ is active."
                    : "Need to move different?"}
                </Text>

                <View style={styles.priorityBadge}>
                  <Text
                    style={
                      styles.priorityBadgeText
                    }
                  >
                    PRIORITY
                  </Text>
                </View>
              </View>

              <Text
                style={styles.plusDescription}
              >
                {isVibePlusActive
                  ? "Priority matching is on. Driver gets 100%."
                  : "Priority matching + 100% driver payout. Say less."}
              </Text>
            </View>
          </View>

          <View style={styles.plusDivider} />

          <View style={styles.plusBenefits}>
            <Benefit text="Priority matching" />
            <Benefit text="Target acceptance within 1 min" />
            <Benefit text="₹0 VIBE commission" />
          </View>
        </Pressable>

        <View style={styles.receipt}>
          <View style={styles.receiptHeader}>
            <Text style={styles.receiptEyebrow}>
              TRANSPARENT FARE
            </Text>

            {isVibePlusActive && (
              <View style={styles.activeBadge}>
                <Text
                  style={styles.activeBadgeText}
                >
                  VIBE+ ACTIVE
                </Text>
              </View>
            )}
          </View>

          <View style={styles.receiptLine}>
            <Text style={styles.receiptLabel}>
              Estimated fare
            </Text>

            <Text style={styles.receiptValue}>
              ₹{selectedRide.fare}
            </Text>
          </View>

          <View style={styles.receiptLine}>
            <Text style={styles.receiptLabel}>
              VIBE commission
            </Text>

            <Text
              style={[
                styles.receiptValue,
                styles.greenText,
              ]}
            >
              ₹{commission}
            </Text>
          </View>

          <View style={styles.receiptDivider} />

          <View style={styles.receiptLine}>
            <Text style={styles.driverLabel}>
              Driver receives
            </Text>

            <Text style={styles.driverValue}>
              ₹{driverReceives}
            </Text>
          </View>

          <View style={styles.payoutNote}>
            <Text style={styles.payoutEmoji}>
              {isVibePlusActive
                ? "⚡"
                : "💚"}
            </Text>

            <Text style={styles.payoutText}>
              {isVibePlusActive
                ? "They keep every rupee. Big W."
                : "Driver gets 90%. VIBE keeps 10%."}
            </Text>
          </View>
        </View>

        <Pressable
          disabled={
            isLoading || !destination
          }
          style={({ pressed }) => [
            styles.cta,
            pressed && styles.ctaPressed,
            isLoading &&
              styles.ctaDisabled,
            !destination &&
              styles.ctaDisabled,
          ]}
          onPress={continueToConfirm}
        >
          <View>
            <Text style={styles.ctaEyebrow}>
              {isVibePlusActive
                ? "PRIORITY ENERGY"
                : "READY TO ROLL"}
            </Text>

            <Text style={styles.ctaText}>
              {isVibePlusActive
                ? "Lock it in ⚡"
                : "Let's roll →"}
            </Text>
          </View>

          <Text style={styles.ctaPrice}>
            ₹{selectedRide.fare}
          </Text>
        </Pressable>

        <Text style={styles.footer}>
          Free cancellation before your driver
          arrives. No drama.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

function Benefit({
  text,
}: {
  text: string;
}) {
  return (
    <View style={styles.benefit}>
      <View style={styles.benefitDot}>
        <Text style={styles.benefitCheck}>
          ✓
        </Text>
      </View>

      <Text style={styles.benefitText}>
        {text}
      </Text>
    </View>
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

  pressed: {
    opacity: 0.72,
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

  destinationCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: 14,
    borderWidth: 2,
    borderColor: colors.ink,
    marginBottom: 14,
  },

  destinationDot: {
    width: 12,
    height: 12,
    borderRadius: radius.pill,
    backgroundColor: colors.lime,
    borderWidth: 2,
    borderColor: colors.ink,
  },

  destinationInfo: {
    flex: 1,
    marginLeft: 13,
  },

  destinationLabel: {
    fontFamily: fonts.bodyBold,
    fontSize: 8,
    fontWeight: "900",
    letterSpacing: 1.4,
    color: colors.muted,
  },

  destinationName: {
    fontFamily: fonts.bodyBold,
    marginTop: 3,
    fontSize: 15,
    fontWeight: "900",
    color: colors.ink,
  },

  destinationAddress: {
    fontFamily: fonts.body,
    marginTop: 2,
    fontSize: 9,
    color: colors.muted,
  },

  destinationArrow: {
    fontFamily: fonts.bodyBold,
    fontSize: 22,
    color: colors.ink,
  },

  pickBanner: {
    minHeight: 72,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.lime,
    borderRadius: radius.lg,
    padding: 13,
    borderWidth: 2,
    borderColor: colors.ink,
    ...shadows.offsetSmall,
  },

  pickBadge: {
    backgroundColor: colors.ink,
    paddingHorizontal: 9,
    paddingVertical: 8,
    borderRadius: radius.md,
  },

  pickBadgeText: {
    fontFamily: fonts.bodyBold,
    color: colors.lime,
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 0.8,
  },

  pickCopy: {
    flex: 1,
    marginLeft: 11,
  },

  pickTitle: {
    fontFamily: fonts.bodyBold,
    fontSize: 14,
    fontWeight: "900",
    color: colors.ink,
  },

  pickDescription: {
    fontFamily: fonts.body,
    marginTop: 2,
    fontSize: 10,
    color: "#55554F",
  },

  pickSpark: {
    fontFamily: fonts.brand,
    fontSize: 25,
    color: colors.ink,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "baseline",
    marginTop: 27,
    marginBottom: 12,
  },

  sectionTitle: {
    fontFamily: fonts.heading,
    fontSize: 19,
    fontWeight: "900",
    color: colors.ink,
  },

  sectionHint: {
    fontFamily: fonts.bodySemibold,
    marginLeft: 8,
    fontSize: 11,
    color: colors.muted,
    fontWeight: "600",
  },

  rideList: {
    gap: 10,
  },

  rideCard: {
    minHeight: 78,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: 13,
    borderWidth: 2,
    borderColor: colors.ink,
  },

  rideCardSelected: {
    backgroundColor: colors.limeSoft,
    ...shadows.offsetSmall,
  },

  rideIcon: {
    width: 50,
    height: 50,
    borderRadius: 16,
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
    marginLeft: 13,
  },

  rideNameRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  rideName: {
    fontFamily: fonts.bodyBold,
    fontSize: 15,
    fontWeight: "900",
    color: colors.ink,
  },

  selectedBadge: {
    marginLeft: 7,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: radius.pill,
    backgroundColor: colors.ink,
  },

  selectedBadgeText: {
    fontFamily: fonts.bodyBold,
    fontSize: 7,
    fontWeight: "900",
    letterSpacing: 0.5,
    color: colors.lime,
  },

  rideMeta: {
    fontFamily: fonts.body,
    marginTop: 4,
    fontSize: 10,
    color: colors.muted,
  },

  ridePrice: {
    alignItems: "flex-end",
    marginLeft: 8,
  },

  price: {
    fontFamily: fonts.bodyBold,
    fontSize: 17,
    fontWeight: "900",
    color: colors.ink,
  },

  priceLabel: {
    fontFamily: fonts.body,
    marginTop: 1,
    fontSize: 9,
    color: colors.muted,
  },

  plusSectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 28,
    marginBottom: 10,
  },

  plusEyebrow: {
    fontFamily: fonts.bodyBold,
    fontSize: 8,
    fontWeight: "900",
    letterSpacing: 1.5,
    color: colors.muted,
    marginBottom: 2,
  },

  plusSectionTitle: {
    fontFamily: fonts.heading,
    fontSize: 23,
    fontWeight: "900",
    color: colors.ink,
  },

  plusPriceBadge: {
    flexDirection: "row",
    alignItems: "baseline",
    backgroundColor: colors.surface,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: radius.md,
    borderWidth: 2,
    borderColor: colors.ink,
  },

  plusPrice: {
    fontFamily: fonts.bodyBold,
    fontSize: 14,
    fontWeight: "900",
    color: colors.ink,
  },

  plusMonth: {
    fontFamily: fonts.body,
    fontSize: 9,
    color: colors.muted,
    marginLeft: 2,
  },

  plusCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    padding: 16,
    borderWidth: 2,
    borderColor: colors.ink,
  },

  plusCardActive: {
    backgroundColor: colors.limeSoft,
    ...shadows.offset,
  },

  plusTopRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  plusSelector: {
    width: 26,
    height: 26,
    borderRadius: radius.pill,
    borderWidth: 2,
    borderColor: colors.ink,
    alignItems: "center",
    justifyContent: "center",
  },

  plusSelectorActive: {
    backgroundColor: colors.ink,
  },

  check: {
    fontFamily: fonts.bodyBold,
    fontSize: 15,
    fontWeight: "900",
    color: colors.lime,
  },

  plusMain: {
    flex: 1,
    marginLeft: 12,
  },

  plusTitleRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  plusTitle: {
    fontFamily: fonts.bodyBold,
    fontSize: 15,
    fontWeight: "900",
    color: colors.ink,
  },

  priorityBadge: {
    marginLeft: 7,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: radius.pill,
    backgroundColor: colors.ink,
  },

  priorityBadgeText: {
    fontFamily: fonts.bodyBold,
    fontSize: 7,
    fontWeight: "900",
    color: colors.lime,
    letterSpacing: 0.5,
  },

  plusDescription: {
    fontFamily: fonts.body,
    marginTop: 4,
    fontSize: 10,
    color: colors.muted,
  },

  plusDivider: {
    height: 1,
    backgroundColor: colors.line,
    marginVertical: 14,
  },

  plusBenefits: {
    gap: 8,
  },

  benefit: {
    flexDirection: "row",
    alignItems: "center",
  },

  benefitDot: {
    width: 20,
    height: 20,
    borderRadius: radius.pill,
    backgroundColor: colors.lime,
    alignItems: "center",
    justifyContent: "center",
  },

  benefitCheck: {
    fontFamily: fonts.bodyBold,
    fontSize: 11,
    fontWeight: "900",
    color: colors.ink,
  },

  benefitText: {
    fontFamily: fonts.bodyMedium,
    marginLeft: 8,
    fontSize: 10,
    color: colors.ink,
  },

  receipt: {
    marginTop: 16,
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    padding: 18,
    borderWidth: 2,
    borderColor: colors.ink,
  },

  receiptHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },

  receiptEyebrow: {
    fontFamily: fonts.bodyBold,
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 1.4,
    color: colors.muted,
  },

  activeBadge: {
    paddingHorizontal: 7,
    paddingVertical: 4,
    borderRadius: radius.pill,
    backgroundColor: colors.lime,
    borderWidth: 1,
    borderColor: colors.ink,
  },

  activeBadgeText: {
    fontFamily: fonts.bodyBold,
    fontSize: 7,
    fontWeight: "900",
    letterSpacing: 0.4,
    color: colors.ink,
  },

  receiptLine: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 9,
  },

  receiptLabel: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.muted,
  },

  receiptValue: {
    fontFamily: fonts.bodyBold,
    fontSize: 13,
    fontWeight: "800",
    color: colors.ink,
  },

  greenText: {
    color: "#4D8A00",
  },

  receiptDivider: {
    height: 1,
    backgroundColor: colors.line,
    marginVertical: 5,
  },

  driverLabel: {
    fontFamily: fonts.bodyBold,
    fontSize: 13,
    fontWeight: "800",
    color: colors.ink,
  },

  driverValue: {
    fontFamily: fonts.heading,
    fontSize: 19,
    fontWeight: "900",
    color: colors.ink,
  },

  payoutNote: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
    paddingTop: 9,
    borderTopWidth: 1,
    borderTopColor: colors.line,
  },

  payoutEmoji: {
    fontSize: 14,
  },

  payoutText: {
    flex: 1,
    fontFamily: fonts.bodyMedium,
    marginLeft: 7,
    fontSize: 9,
    color: colors.muted,
  },

  cta: {
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

  ctaPressed: {
    opacity: 0.72,
  },

  ctaDisabled: {
    opacity: 0.5,
  },

  ctaEyebrow: {
    fontFamily: fonts.bodyBold,
    fontSize: 8,
    fontWeight: "900",
    letterSpacing: 1.4,
    color: "#5F5F59",
    marginBottom: 2,
  },

  ctaText: {
    fontFamily: fonts.heading,
    fontSize: 19,
    fontWeight: "900",
    color: colors.ink,
  },

  ctaPrice: {
    fontFamily: fonts.heading,
    fontSize: 20,
    fontWeight: "900",
    color: colors.ink,
  },

  footer: {
    fontFamily: fonts.body,
    marginTop: 17,
    textAlign: "center",
    fontSize: 10,
    color: colors.muted,
  },
});