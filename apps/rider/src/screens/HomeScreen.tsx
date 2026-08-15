import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/AppNavigator";
import {
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

const colors = {
  background: "#F6F6F1",
  surface: "#FFFFFF",
  text: "#111111",
  muted: "#777771",
  border: "#E7E7E0",
  lime: "#C9F45B",
  coral: "#FF705F",
  blue: "#DDEAFF",
};

export default function HomeScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.eyebrow}>VIBE RIDER</Text>
            <Text style={styles.greeting}>Yo, Alex 👋</Text>
          </View>

          <Pressable style={styles.profileButton}>
            <Text style={styles.profileText}>A</Text>
          </Pressable>
        </View>

        {/* Main destination card */}
        <View style={styles.heroCard}>
          <View style={styles.heroTop}>
            <View>
              <Text style={styles.heroEyebrow}>READY WHEN YOU ARE</Text>
              <Text style={styles.heroTitle}>Where are you{`\n`}going?</Text>
            </View>

            <View style={styles.sparkle}>
              <Text style={styles.sparkleText}>✦</Text>
            </View>
          </View>

          <View style={styles.routeBox}>
            <View style={styles.routeDot} />
            <View style={styles.routeContent}>
              <Text style={styles.routeLabel}>PICKUP</Text>
              <Text style={styles.routeValue}>Your current location</Text>
            </View>
          </View>

          <View style={styles.routeLine} />

          <Pressable
  style={styles.destinationBox}
  onPress={() => navigation.navigate("Destination")}
>
            <View style={styles.destinationIcon}>
              <Text style={styles.destinationIconText}>→</Text>
            </View>

            <View>
              <Text style={styles.routeLabel}>DESTINATION</Text>
              <Text style={styles.destinationText}>
                Tap to choose your destination
              </Text>
            </View>
          </Pressable>
        </View>

        {/* Quick destinations */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Quick picks</Text>
          <Text style={styles.sectionHint}>saved places</Text>
        </View>

        <View style={styles.quickRow}>
          <QuickPick emoji="🏠" title="Home" subtitle="12 min" />
          <QuickPick emoji="🎓" title="College" subtitle="18 min" />
          <QuickPick emoji="☕" title="Cafe" subtitle="8 min" />
        </View>

        {/* Ride options */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Your vibe</Text>
          <Text style={styles.sectionHint}>choose your ride</Text>
        </View>

        <View style={styles.rideCard}>
          <View style={styles.rideIcon}>
            <Text style={styles.rideEmoji}>🛵</Text>
          </View>

          <View style={styles.rideInfo}>
            <Text style={styles.rideName}>VIBE Bike</Text>
            <Text style={styles.rideDescription}>Fast + solo</Text>
          </View>

          <View style={styles.ridePrice}>
            <Text style={styles.price}>₹42</Text>
            <Text style={styles.priceLabel}>est.</Text>
          </View>
        </View>

        <View style={styles.rideCard}>
          <View style={[styles.rideIcon, styles.rideIconCar]}>
            <Text style={styles.rideEmoji}>🚗</Text>
          </View>

          <View style={styles.rideInfo}>
            <Text style={styles.rideName}>VIBE Auto</Text>
            <Text style={styles.rideDescription}>Easy + comfy</Text>
          </View>

          <View style={styles.ridePrice}>
            <Text style={styles.price}>₹68</Text>
            <Text style={styles.priceLabel}>est.</Text>
          </View>
        </View>

        {/* CTA */}
        <Pressable style={styles.cta}>
          <Text style={styles.ctaText}>Choose destination</Text>
          <Text style={styles.ctaArrow}>↗</Text>
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
      <Text style={styles.quickEmoji}>{emoji}</Text>
      <Text style={styles.quickTitle}>{title}</Text>
      <Text style={styles.quickSubtitle}>{subtitle}</Text>
    </Pressable>
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

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
  },

  eyebrow: {
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 2,
    color: colors.muted,
    marginBottom: 5,
  },

  greeting: {
    fontSize: 27,
    fontWeight: "900",
    color: colors.text,
    letterSpacing: -1,
  },

  profileButton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: colors.text,
    alignItems: "center",
    justifyContent: "center",
  },

  profileText: {
    color: colors.surface,
    fontSize: 17,
    fontWeight: "800",
  },

  heroCard: {
    backgroundColor: colors.text,
    borderRadius: 28,
    padding: 22,
    marginBottom: 26,
  },

  heroTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },

  heroEyebrow: {
    color: colors.lime,
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1.5,
    marginBottom: 8,
  },

  heroTitle: {
    color: colors.surface,
    fontSize: 32,
    lineHeight: 34,
    fontWeight: "900",
    letterSpacing: -1.2,
  },

  sparkle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.lime,
    alignItems: "center",
    justifyContent: "center",
  },

  sparkleText: {
    fontSize: 25,
    color: colors.text,
  },

  routeBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1D1D1D",
    borderRadius: 17,
    padding: 15,
  },

  routeDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.lime,
    marginRight: 13,
  },

  routeContent: {
    flex: 1,
  },

  routeLabel: {
    color: "#969690",
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 1.2,
    marginBottom: 4,
  },

  routeValue: {
    color: colors.surface,
    fontSize: 14,
    fontWeight: "600",
  },

  routeLine: {
    width: 1,
    height: 15,
    backgroundColor: "#555",
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
    borderRadius: 17,
    backgroundColor: colors.text,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  destinationIconText: {
    color: colors.lime,
    fontSize: 18,
    fontWeight: "900",
  },

  destinationText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: "800",
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: 12,
    marginTop: 2,
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: "900",
    color: colors.text,
  },

  sectionHint: {
    marginLeft: 8,
    fontSize: 11,
    color: colors.muted,
    fontWeight: "600",
  },

  quickRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 26,
  },

  quickCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 19,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },

  quickEmoji: {
    fontSize: 22,
    marginBottom: 10,
  },

  quickTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: colors.text,
  },

  quickSubtitle: {
    marginTop: 3,
    fontSize: 10,
    color: colors.muted,
  },

  rideCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 13,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },

  rideIcon: {
    width: 50,
    height: 50,
    borderRadius: 16,
    backgroundColor: colors.blue,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 13,
  },

  rideIconCar: {
    backgroundColor: "#FFE4DE",
  },

  rideEmoji: {
    fontSize: 24,
  },

  rideInfo: {
    flex: 1,
  },

  rideName: {
    fontSize: 15,
    fontWeight: "900",
    color: colors.text,
  },

  rideDescription: {
    marginTop: 3,
    fontSize: 11,
    color: colors.muted,
  },

  ridePrice: {
    alignItems: "flex-end",
  },

  price: {
    fontSize: 16,
    fontWeight: "900",
    color: colors.text,
  },

  priceLabel: {
    fontSize: 9,
    color: colors.muted,
    marginTop: 2,
  },

  cta: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.coral,
    borderRadius: 20,
    paddingVertical: 18,
    paddingHorizontal: 20,
    marginTop: 16,
  },

  ctaText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "900",
  },

  ctaArrow: {
    color: colors.text,
    fontSize: 22,
    fontWeight: "900",
  },

  footerText: {
    textAlign: "center",
    marginTop: 22,
    color: colors.muted,
    fontSize: 11,
    fontWeight: "700",
  },
});
