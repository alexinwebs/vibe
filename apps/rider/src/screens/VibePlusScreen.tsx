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
  NativeStackNavigationProp<RootStackParamList>;

export default function VibePlusScreen() {
  const navigation =
    useNavigation<NavigationProp>();

  const {
    isVibePlusActive,
    isLoading,
    activateVibePlus,
    deactivateVibePlus,
  } = useVibePlus();

  const handleActivate = async () => {
    await activateVibePlus();
    navigation.goBack();
  };

  const handleDeactivate = async () => {
    await deactivateVibePlus();
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
          <Pressable
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backText}>‹</Text>
          </Pressable>

          <Text style={styles.headerLabel}>
            VIBE+
          </Text>

          <View style={styles.headerSpacer} />
        </View>

        {/* HERO */}
        <View style={styles.hero}>
          <View style={styles.heroTop}>
            <View style={styles.logoBox}>
              <Text style={styles.logoText}>
                V+
              </Text>
            </View>

            <View style={styles.activePill}>
              <Text style={styles.activePillText}>
                {isVibePlusActive
                  ? "ACTIVE"
                  : "PRIORITY MODE"}
              </Text>
            </View>
          </View>

          <Text style={styles.heroEyebrow}>
            {isVibePlusActive
              ? "YOU'RE LOCKED IN."
              : "SAY LESS."}
          </Text>

          <Text style={styles.heroTitle}>
            {isVibePlusActive
              ? "Priority is\non."
              : "Your ride gets\npriority."}
          </Text>

          <Text style={styles.heroDescription}>
            {isVibePlusActive
              ? "VIBE+ is active. Your requests get priority matching and your driver keeps 100% of the ride fare."
              : "When you need to move fast, VIBE+ puts your request at the front of the matching queue."}
          </Text>
        </View>

        {/* PRICE */}
        <View style={styles.priceCard}>
          <View>
            <Text style={styles.priceEyebrow}>
              MEMBERSHIP
            </Text>

            <View style={styles.priceRow}>
              <Text style={styles.price}>
                ₹99
              </Text>

              <Text style={styles.month}>
                / month
              </Text>
            </View>
          </View>

          <View style={styles.cancelBadge}>
            <Text style={styles.cancelText}>
              Cancel anytime
            </Text>
          </View>
        </View>

        {/* BENEFITS */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            What's the move?
          </Text>
        </View>

        <Benefit
          number="01"
          title="Priority matching"
          description="Your ride request gets priority over regular requests."
          icon="⚡"
        />

        <Benefit
          number="02"
          title="Target ≤ 1 minute"
          description="We aim to get your ride accepted within one minute."
          icon="⏱"
        />

        <Benefit
          number="03"
          title="Driver keeps 100%"
          description="Your subscription removes VIBE's 10% ride commission."
          icon="💯"
        />

        <Benefit
          number="04"
          title="Better driver incentives"
          description="More money reaches drivers, giving them a stronger reason to accept."
          icon="💚"
        />

        {/* ECONOMICS */}
        <View style={styles.economicsCard}>
          <Text style={styles.economicsEyebrow}>
            THE VIBE+ DIFFERENCE
          </Text>

          <View style={styles.comparison}>
            <View style={styles.comparisonColumn}>
              <Text style={styles.comparisonLabel}>
                REGULAR
              </Text>

              <Text style={styles.comparisonValue}>
                90%
              </Text>

              <Text style={styles.comparisonSubtext}>
                driver payout
              </Text>
            </View>

            <View style={styles.comparisonDivider}>
              <Text style={styles.comparisonArrow}>
                →
              </Text>
            </View>

            <View
              style={[
                styles.comparisonColumn,
                styles.comparisonHighlight,
              ]}
            >
              <Text style={styles.comparisonLabel}>
                VIBE+
              </Text>

              <Text style={styles.comparisonValue}>
                100%
              </Text>

              <Text style={styles.comparisonSubtext}>
                driver payout
              </Text>
            </View>
          </View>

          <Text style={styles.economicsNote}>
            You pay for priority. Your driver gets
            the full ride fare.
          </Text>
        </View>

        {/* ACTION */}
        {isLoading ? (
          <View style={styles.loadingCard}>
            <Text style={styles.loadingText}>
              Checking your VIBE+ status...
            </Text>
          </View>
        ) : isVibePlusActive ? (
          <>
            <View style={styles.activeCard}>
              <View style={styles.activeIcon}>
                <Text style={styles.activeIconText}>
                  ✓
                </Text>
              </View>

              <View style={styles.activeContent}>
                <Text style={styles.activeTitle}>
                  VIBE+ is active.
                </Text>

                <Text style={styles.activeDescription}>
                  You're getting priority matching
                  and 100% driver payout.
                </Text>
              </View>
            </View>

            <Pressable
              style={({ pressed }) => [
                styles.manageButton,
                pressed &&
                  styles.manageButtonPressed,
              ]}
              onPress={handleDeactivate}
            >
              <Text style={styles.manageText}>
                Cancel VIBE+
              </Text>
            </Pressable>
          </>
        ) : (
          <Pressable
            style={({ pressed }) => [
              styles.cta,
              pressed && styles.ctaPressed,
            ]}
            onPress={handleActivate}
          >
            <View>
              <Text style={styles.ctaEyebrow}>
                PROTOTYPE ACTIVATION · ₹99 / MONTH
              </Text>

              <Text style={styles.ctaText}>
                Get VIBE+ →
              </Text>
            </View>

            <Text style={styles.ctaSpark}>
              ✦
            </Text>
          </Pressable>
        )}

        <Text style={styles.legal}>
          Prototype note: subscription payment will
          be connected to the backend/payment system
          in the next stage.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

function Benefit({
  number,
  title,
  description,
  icon,
}: {
  number: string;
  title: string;
  description: string;
  icon: string;
}) {
  return (
    <View style={styles.benefitCard}>
      <View style={styles.benefitNumber}>
        <Text style={styles.benefitNumberText}>
          {number}
        </Text>
      </View>

      <View style={styles.benefitIcon}>
        <Text style={styles.benefitIconText}>
          {icon}
        </Text>
      </View>

      <View style={styles.benefitContent}>
        <Text style={styles.benefitTitle}>
          {title}
        </Text>

        <Text style={styles.benefitDescription}>
          {description}
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
    paddingBottom: 40,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18,
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

  headerLabel: {
    fontFamily: fonts.heading,
    fontSize: 20,
    fontWeight: "900",
    letterSpacing: -0.5,
    color: colors.ink,
  },

  headerSpacer: {
    width: 44,
  },

  hero: {
    backgroundColor: colors.ink,
    borderRadius: 30,
    padding: 22,
    borderWidth: 2,
    borderColor: colors.ink,
    ...shadows.offset,
  },

  heroTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 34,
  },

  logoBox: {
    width: 54,
    height: 54,
    borderRadius: 18,
    backgroundColor: colors.lime,
    alignItems: "center",
    justifyContent: "center",
  },

  logoText: {
    fontFamily: fonts.heading,
    fontSize: 20,
    fontWeight: "900",
    color: colors.ink,
  },

  activePill: {
    paddingHorizontal: 9,
    paddingVertical: 7,
    borderRadius: radius.pill,
    backgroundColor: "#1D1D1D",
    borderWidth: 1,
    borderColor: colors.lime,
  },

  activePillText: {
    fontFamily: fonts.bodyBold,
    fontSize: 8,
    fontWeight: "900",
    letterSpacing: 0.7,
    color: colors.lime,
  },

  heroEyebrow: {
    fontFamily: fonts.bodyBold,
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1.7,
    color: colors.lime,
    marginBottom: 8,
  },

  heroTitle: {
    fontFamily: fonts.display,
    fontSize: 36,
    lineHeight: 37,
    fontWeight: "900",
    letterSpacing: -1.5,
    color: colors.surface,
  },

  heroDescription: {
    fontFamily: fonts.body,
    marginTop: 16,
    fontSize: 12,
    lineHeight: 18,
    color: "#B7B7B1",
  },

  priceCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    padding: 18,
    marginTop: 16,
    borderWidth: 2,
    borderColor: colors.ink,
  },

  priceEyebrow: {
    fontFamily: fonts.bodyBold,
    fontSize: 8,
    fontWeight: "900",
    letterSpacing: 1.4,
    color: colors.muted,
    marginBottom: 2,
  },

  priceRow: {
    flexDirection: "row",
    alignItems: "baseline",
  },

  price: {
    fontFamily: fonts.heading,
    fontSize: 28,
    fontWeight: "900",
    color: colors.ink,
  },

  month: {
    fontFamily: fonts.bodyMedium,
    marginLeft: 3,
    fontSize: 11,
    color: colors.muted,
  },

  cancelBadge: {
    paddingHorizontal: 9,
    paddingVertical: 7,
    borderRadius: radius.pill,
    backgroundColor: colors.background,
  },

  cancelText: {
    fontFamily: fonts.bodyMedium,
    fontSize: 9,
    color: colors.muted,
  },

  sectionHeader: {
    marginTop: 28,
    marginBottom: 12,
  },

  sectionTitle: {
    fontFamily: fonts.heading,
    fontSize: 20,
    fontWeight: "900",
    color: colors.ink,
  },

  benefitCard: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 82,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: 12,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: colors.ink,
  },

  benefitNumber: {
    width: 26,
    height: 26,
    borderRadius: radius.pill,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.ink,
  },

  benefitNumberText: {
    fontFamily: fonts.bodyBold,
    fontSize: 8,
    fontWeight: "900",
    color: colors.lime,
  },

  benefitIcon: {
    width: 46,
    height: 46,
    borderRadius: 15,
    backgroundColor: colors.limeSoft,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },

  benefitIconText: {
    fontSize: 22,
  },

  benefitContent: {
    flex: 1,
    marginLeft: 12,
  },

  benefitTitle: {
    fontFamily: fonts.bodyBold,
    fontSize: 14,
    fontWeight: "900",
    color: colors.ink,
  },

  benefitDescription: {
    fontFamily: fonts.body,
    marginTop: 3,
    fontSize: 10,
    lineHeight: 14,
    color: colors.muted,
  },

  economicsCard: {
    marginTop: 16,
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    padding: 18,
    borderWidth: 2,
    borderColor: colors.ink,
  },

  economicsEyebrow: {
    fontFamily: fonts.bodyBold,
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 1.4,
    color: colors.muted,
    marginBottom: 16,
  },

  comparison: {
    flexDirection: "row",
    alignItems: "center",
  },

  comparisonColumn: {
    flex: 1,
    padding: 14,
    borderRadius: radius.lg,
    backgroundColor: colors.background,
  },

  comparisonHighlight: {
    backgroundColor: colors.limeSoft,
    borderWidth: 1,
    borderColor: colors.ink,
  },

  comparisonLabel: {
    fontFamily: fonts.bodyBold,
    fontSize: 8,
    fontWeight: "900",
    letterSpacing: 1,
    color: colors.muted,
  },

  comparisonValue: {
    fontFamily: fonts.heading,
    marginTop: 5,
    fontSize: 28,
    fontWeight: "900",
    color: colors.ink,
  },

  comparisonSubtext: {
    fontFamily: fonts.body,
    marginTop: 1,
    fontSize: 9,
    color: colors.muted,
  },

  comparisonDivider: {
    width: 38,
    alignItems: "center",
    justifyContent: "center",
  },

  comparisonArrow: {
    fontFamily: fonts.bodyBold,
    fontSize: 19,
    color: colors.ink,
  },

  economicsNote: {
    fontFamily: fonts.bodyMedium,
    marginTop: 14,
    fontSize: 10,
    lineHeight: 15,
    color: colors.muted,
  },

  loadingCard: {
    minHeight: 78,
    marginTop: 16,
    borderRadius: radius.xl,
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderColor: colors.ink,
    alignItems: "center",
    justifyContent: "center",
  },

  loadingText: {
    fontFamily: fonts.bodyMedium,
    fontSize: 11,
    color: colors.muted,
  },

  activeCard: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
    padding: 16,
    backgroundColor: colors.limeSoft,
    borderRadius: radius.xl,
    borderWidth: 2,
    borderColor: colors.ink,
    ...shadows.offsetSmall,
  },

  activeIcon: {
    width: 44,
    height: 44,
    borderRadius: radius.pill,
    backgroundColor: colors.ink,
    alignItems: "center",
    justifyContent: "center",
  },

  activeIconText: {
    fontFamily: fonts.bodyBold,
    fontSize: 20,
    fontWeight: "900",
    color: colors.lime,
  },

  activeContent: {
    flex: 1,
    marginLeft: 12,
  },

  activeTitle: {
    fontFamily: fonts.bodyBold,
    fontSize: 15,
    fontWeight: "900",
    color: colors.ink,
  },

  activeDescription: {
    fontFamily: fonts.body,
    marginTop: 3,
    fontSize: 10,
    lineHeight: 14,
    color: colors.muted,
  },

  manageButton: {
    marginTop: 10,
    minHeight: 48,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderColor: colors.ink,
    alignItems: "center",
    justifyContent: "center",
  },

  manageButtonPressed: {
    opacity: 0.7,
  },

  manageText: {
    fontFamily: fonts.bodyBold,
    fontSize: 12,
    fontWeight: "900",
    color: colors.ink,
  },

  cta: {
    minHeight: 78,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.lime,
    borderRadius: radius.xl,
    paddingHorizontal: 20,
    marginTop: 16,
    borderWidth: 2,
    borderColor: colors.ink,
    ...shadows.offset,
  },

  ctaPressed: {
    opacity: 0.72,
  },

  ctaEyebrow: {
    fontFamily: fonts.bodyBold,
    fontSize: 8,
    fontWeight: "900",
    letterSpacing: 1.3,
    color: "#5F5F59",
    marginBottom: 2,
  },

  ctaText: {
    fontFamily: fonts.heading,
    fontSize: 20,
    fontWeight: "900",
    color: colors.ink,
  },

  ctaSpark: {
    fontFamily: fonts.brand,
    fontSize: 30,
    color: colors.ink,
  },

  legal: {
    fontFamily: fonts.body,
    marginTop: 16,
    paddingHorizontal: 10,
    textAlign: "center",
    fontSize: 9,
    lineHeight: 14,
    color: colors.muted,
  },
});