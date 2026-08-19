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
import {
  colors,
  fonts,
  radius,
  shadows,
} from "../theme/theme";

type NavigationProp =
  NativeStackNavigationProp<RootStackParamList, "Home">;

export default function HomeScreen() {
  const navigation =
    useNavigation<NavigationProp>();

  const {
    isVibePlusActive,
  } = useVibePlus();

  const openVibePlus = () => {
    navigation.navigate("VibePlus");
  };

  const openHistory = () => {
    navigation.navigate("RideHistory");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <View>
            <Text style={styles.eyebrow}>
              VIBE
            </Text>

            <Text style={styles.greeting}>
              Yo, Alex 👋
            </Text>
          </View>

          <View style={styles.headerActions}>
            <Pressable
              style={({ pressed }) => [
                styles.historyButton,
                pressed && styles.pressed,
              ]}
              onPress={openHistory}
            >
              <Text style={styles.historyIcon}>
                ↺
              </Text>
            </Pressable>

            <Pressable style={styles.profileButton}>
              <Text style={styles.profileText}>
                A
              </Text>
            </Pressable>
          </View>
        </View>

        {/* HERO */}
        <View style={styles.heroCard}>
          <View style={styles.heroHeader}>
            <View style={styles.heroText}>
              <Text style={styles.heroEyebrow}>
                READY WHEN YOU ARE
              </Text>

              <Text style={styles.heroTitle}>
                Where we{"\n"}vibin'?
              </Text>
            </View>

            <View style={styles.sparkle}>
              <Text style={styles.sparkleText}>
                ✦
              </Text>
            </View>
          </View>

          {/* PICKUP */}
          <View style={styles.routeBox}>
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

          {/* DESTINATION */}
          <Pressable
            style={({ pressed }) => [
              styles.destinationBox,
              pressed && styles.pressed,
            ]}
            onPress={() =>
              navigation.navigate("Destination")
            }
          >
            <View style={styles.destinationIcon}>
              <Text
                style={styles.destinationIconText}
              >
                →
              </Text>
            </View>

            <View style={styles.destinationContent}>
              <Text style={styles.routeLabel}>
                DESTINATION
              </Text>

              <Text style={styles.destinationText}>
                Drop the spot →
              </Text>
            </View>
          </Pressable>
        </View>

        {/* VIBE+ */}
        <Pressable
          style={({ pressed }) => [
            styles.plusCard,
            isVibePlusActive &&
              styles.plusCardActive,
            pressed && styles.pressed,
          ]}
          onPress={openVibePlus}
        >
          <View style={styles.plusLeft}>
            <View
              style={[
                styles.plusBadge,
                isVibePlusActive &&
                  styles.plusBadgeActive,
              ]}
            >
              <Text style={styles.plusBadgeText}>
                VIBE+
              </Text>
            </View>

            <View style={styles.plusCopy}>
              <View style={styles.plusTitleRow}>
                <Text style={styles.plusTitle}>
                  {isVibePlusActive
                    ? "Main character status: ON."
                    : "Need it ASAP?"}
                </Text>

                {isVibePlusActive && (
                  <View style={styles.activeBadge}>
                    <Text
                      style={styles.activeBadgeText}
                    >
                      ACTIVE
                    </Text>
                  </View>
                )}
              </View>

              <Text style={styles.plusDescription}>
                Priority matching. Driver keeps 100%.
              </Text>
            </View>
          </View>

          <View style={styles.plusArrow}>
            <Text style={styles.plusArrowText}>
              →
            </Text>
          </View>
        </Pressable>

        {/* QUICK PICKS */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Quick picks
          </Text>

          <Text style={styles.sectionHint}>
            saved places
          </Text>
        </View>

        <View style={styles.quickRow}>
          <QuickPick
            emoji="🏠"
            title="Home"
            subtitle="locked in"
          />

          <QuickPick
            emoji="🎓"
            title="College"
            subtitle="daily grind"
          />

          <QuickPick
            emoji="☕"
            title="Cafe"
            subtitle="lil recharge"
          />
        </View>

        {/* RIDE OPTIONS */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Your vibe
          </Text>

          <Text style={styles.sectionHint}>
            choose your ride
          </Text>
        </View>

        <RidePreview
          emoji="🛵"
          name="VIBE Bike"
          description="zoom zoom"
          price="₹42"
          backgroundColor={colors.limeSoft}
        />

        <RidePreview
          emoji="🛺"
          name="VIBE Auto"
          description="easy mode"
          price="₹68"
          backgroundColor="#FFE2DE"
        />

        {/* CTA */}
        <Pressable
          style={({ pressed }) => [
            styles.cta,
            pressed && styles.pressed,
          ]}
          onPress={() =>
            navigation.navigate("Destination")
          }
        >
          <Text style={styles.ctaText}>
            Where we vibin'?
          </Text>

          <Text style={styles.ctaArrow}>
            ↗
          </Text>
        </Pressable>

        <Text style={styles.footerText}>
          Built different. Ride better.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

function QuickPick({
  emoji,
  title,
  subtitle,
}: {
  emoji: string;
  title: string;
  subtitle: string;
}) {
  return (
    <Pressable style={styles.quickCard}>
      <Text style={styles.quickEmoji}>
        {emoji}
      </Text>

      <Text style={styles.quickTitle}>
        {title}
      </Text>

      <Text style={styles.quickSubtitle}>
        {subtitle}
      </Text>
    </Pressable>
  );
}

function RidePreview({
  emoji,
  name,
  description,
  price,
  backgroundColor,
}: {
  emoji: string;
  name: string;
  description: string;
  price: string;
  backgroundColor: string;
}) {
  return (
    <View style={styles.rideCard}>
      <View
        style={[
          styles.rideIcon,
          { backgroundColor },
        ]}
      >
        <Text style={styles.rideEmoji}>
          {emoji}
        </Text>
      </View>

      <View style={styles.rideInfo}>
        <Text style={styles.rideName}>
          {name}
        </Text>

        <Text style={styles.rideDescription}>
          {description}
        </Text>
      </View>

      <View style={styles.ridePrice}>
        <Text style={styles.price}>
          {price}
        </Text>

        <Text style={styles.priceLabel}>
          est.
        </Text>
      </View>
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
    paddingBottom: 36,
  },

  pressed: {
    opacity: 0.72,
  },

  /* HEADER */

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
  },

  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  eyebrow: {
    fontFamily: fonts.bodyBold,
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 2,
    color: colors.muted,
    marginBottom: 5,
  },

  greeting: {
    fontFamily: fonts.heading,
    fontSize: 27,
    fontWeight: "900",
    color: colors.ink,
    letterSpacing: -1,
  },

  historyButton: {
    width: 42,
    height: 42,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: colors.ink,
  },

  historyIcon: {
    fontFamily: fonts.bodyBold,
    fontSize: 23,
    fontWeight: "900",
    color: colors.ink,
  },

  profileButton: {
    width: 46,
    height: 46,
    borderRadius: radius.pill,
    backgroundColor: colors.ink,
    alignItems: "center",
    justifyContent: "center",
  },

  profileText: {
    fontFamily: fonts.bodyBold,
    color: colors.surface,
    fontSize: 17,
    fontWeight: "800",
  },

  /* HERO */

  heroCard: {
    backgroundColor: colors.ink,
    borderRadius: 28,
    padding: 22,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: colors.ink,
    ...shadows.offset,
  },

  heroHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },

  heroText: {
    flex: 1,
  },

  heroEyebrow: {
    fontFamily: fonts.bodyBold,
    color: colors.lime,
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1.5,
    marginBottom: 8,
  },

  heroTitle: {
    fontFamily: fonts.display,
    color: colors.surface,
    fontSize: 32,
    lineHeight: 34,
    fontWeight: "900",
    letterSpacing: -1.2,
  },

  sparkle: {
    width: 44,
    height: 44,
    borderRadius: radius.pill,
    backgroundColor: colors.lime,
    alignItems: "center",
    justifyContent: "center",
  },

  sparkleText: {
    fontFamily: fonts.brand,
    fontSize: 25,
    color: colors.ink,
  },

  /* ROUTE */

  routeBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1D1D1D",
    borderRadius: 17,
    padding: 15,
  },

  pickupDot: {
    width: 10,
    height: 10,
    borderRadius: radius.pill,
    backgroundColor: colors.lime,
    marginRight: 13,
  },

  routeContent: {
    flex: 1,
  },

  routeLabel: {
    fontFamily: fonts.bodyBold,
    color: "#969690",
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 1.2,
    marginBottom: 4,
  },

  routeValue: {
    fontFamily: fonts.bodySemibold,
    color: colors.surface,
    fontSize: 14,
    fontWeight: "600",
  },

  routeLine: {
    width: 1,
    height: 15,
    backgroundColor: "#555555",
    marginLeft: 20,
  },

  destinationBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.lime,
    borderRadius: 17,
    padding: 13,
  },

  destinationIcon: {
    width: 34,
    height: 34,
    borderRadius: radius.pill,
    backgroundColor: colors.ink,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  destinationIconText: {
    fontFamily: fonts.bodyBold,
    color: colors.lime,
    fontSize: 18,
    fontWeight: "900",
  },

  destinationContent: {
    flex: 1,
  },

  destinationText: {
    fontFamily: fonts.bodyBold,
    color: colors.ink,
    fontSize: 14,
    fontWeight: "800",
  },

  /* VIBE+ */

  plusCard: {
    minHeight: 78,
    padding: 14,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 2,
    borderColor: colors.ink,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    ...shadows.offsetSmall,
  },

  plusCardActive: {
    backgroundColor: colors.limeSoft,
  },

  plusLeft: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },

  plusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: radius.md,
    backgroundColor: colors.lime,
    borderWidth: 1,
    borderColor: colors.ink,
  },

  plusBadgeActive: {
    backgroundColor: colors.ink,
  },

  plusBadgeText: {
    fontFamily: fonts.heading,
    fontSize: 12,
    fontWeight: "900",
    color: colors.ink,
    letterSpacing: 0.4,
  },

  plusCopy: {
    flex: 1,
    marginLeft: 12,
  },

  plusTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },

  plusTitle: {
    fontFamily: fonts.semibold,
    fontSize: 14,
    fontWeight: "600",
    color: colors.ink,
  },

  plusDescription: {
    marginTop: 3,
    fontFamily: fonts.bodyMedium,
    fontSize: 10,
    color: colors.muted,
  },

  activeBadge: {
    marginLeft: 7,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: radius.pill,
    backgroundColor: colors.ink,
  },

  activeBadgeText: {
    fontFamily: fonts.bodyBold,
    fontSize: 7,
    fontWeight: "900",
    letterSpacing: 0.5,
    color: colors.lime,
  },

  plusArrow: {
    width: 38,
    height: 38,
    borderRadius: radius.pill,
    backgroundColor: colors.ink,
    alignItems: "center",
    justifyContent: "center",
  },

  plusArrowText: {
    fontFamily: fonts.bodyBold,
    color: colors.lime,
    fontSize: 18,
  },

  /* SECTIONS */

  sectionHeader: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: 12,
    marginTop: 26,
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

  /* QUICK PICKS */

  quickRow: {
    flexDirection: "row",
    gap: 10,
  },

  quickCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 19,
    padding: 14,
    borderWidth: 2,
    borderColor: colors.ink,
  },

  quickEmoji: {
    fontSize: 22,
    marginBottom: 10,
  },

  quickTitle: {
    fontFamily: fonts.bodyBold,
    fontSize: 14,
    fontWeight: "800",
    color: colors.ink,
  },

  quickSubtitle: {
    fontFamily: fonts.body,
    marginTop: 3,
    fontSize: 10,
    color: colors.muted,
  },

  /* RIDES */

  rideCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 13,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: colors.ink,
  },

  rideIcon: {
    width: 50,
    height: 50,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 13,
  },

  rideEmoji: {
    fontSize: 24,
  },

  rideInfo: {
    flex: 1,
  },

  rideName: {
    fontFamily: fonts.bodyBold,
    fontSize: 15,
    fontWeight: "900",
    color: colors.ink,
  },

  rideDescription: {
    fontFamily: fonts.body,
    marginTop: 3,
    fontSize: 11,
    color: colors.muted,
  },

  ridePrice: {
    alignItems: "flex-end",
  },

  price: {
    fontFamily: fonts.bodyBold,
    fontSize: 16,
    fontWeight: "900",
    color: colors.ink,
  },

  priceLabel: {
    fontFamily: fonts.body,
    fontSize: 9,
    color: colors.muted,
    marginTop: 2,
  },

  /* CTA */

  cta: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.lime,
    borderRadius: 20,
    paddingVertical: 18,
    paddingHorizontal: 20,
    marginTop: 6,
    borderWidth: 2,
    borderColor: colors.ink,
    ...shadows.offset,
  },

  ctaText: {
    fontFamily: fonts.bodyBold,
    color: colors.ink,
    fontSize: 16,
    fontWeight: "900",
  },

  ctaArrow: {
    fontFamily: fonts.bodyBold,
    color: colors.ink,
    fontSize: 22,
    fontWeight: "900",
  },

  footerText: {
    fontFamily: fonts.bodySemibold,
    textAlign: "center",
    marginTop: 22,
    color: colors.muted,
    fontSize: 11,
    fontWeight: "700",
  },
});