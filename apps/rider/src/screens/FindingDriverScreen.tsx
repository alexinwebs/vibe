import React, { useEffect } from "react";
import {
  ActivityIndicator,
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

export default function FindingDriverScreen() {
  const navigation =
    useNavigation<NavigationProp>();

  const {
    rideStatus,
    cancelRide,
  } = useRide();

  useEffect(() => {
    if (rideStatus === "driver_found") {
      navigation.navigate("DriverFound");
    }
  }, [rideStatus, navigation]);

  const handleCancel = () => {
    cancelRide();
    navigation.navigate("Home");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />

      <View style={styles.container}>
        <View style={styles.top}>
          <Text style={styles.eyebrow}>
            VIBE
          </Text>

          <Text style={styles.status}>
            MATCHING
          </Text>
        </View>

        <View style={styles.main}>
          <View style={styles.pulseOuter}>
            <View style={styles.pulseMiddle}>
              <View style={styles.pulseInner}>
                <Text style={styles.spark}>
                  ✦
                </Text>
              </View>
            </View>
          </View>

          <Text style={styles.title}>
            Cooking up
            {"\n"}
            your ride...
          </Text>

          <Text style={styles.description}>
            Finding the best nearby driver
            for your vibe.
          </Text>

          <View style={styles.loadingRow}>
            <ActivityIndicator
              size="small"
              color={colors.ink}
            />

            <Text style={styles.loadingText}>
              Looking nearby
            </Text>
          </View>
        </View>

        <View style={styles.infoCard}>
          <View style={styles.infoIcon}>
            <Text style={styles.infoEmoji}>
              ⚡
            </Text>
          </View>

          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>
              {rideStatus === "finding"
                ? "Priority matching"
                : "Driver found"}
            </Text>

            <Text style={styles.infoDescription}>
              {rideStatus === "finding"
                ? "We're checking nearby drivers now."
                : "Your driver is on the way."}
            </Text>
          </View>
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.cancelButton,
            pressed && styles.cancelPressed,
          ]}
          onPress={handleCancel}
        >
          <Text style={styles.cancelText}>
            Cancel ride
          </Text>
        </Pressable>

        <Text style={styles.footer}>
          No drama. You can cancel anytime before
          your driver arrives.
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
    paddingTop: 18,
    paddingBottom: 28,
  },

  top: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  eyebrow: {
    fontFamily: fonts.bodyBold,
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 2,
    color: colors.ink,
  },

  status: {
    fontFamily: fonts.bodyBold,
    fontSize: 8,
    fontWeight: "900",
    letterSpacing: 1.4,
    color: colors.muted,
  },

  main: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  pulseOuter: {
    width: 178,
    height: 178,
    borderRadius: 99,
    backgroundColor: colors.limeSoft,
    alignItems: "center",
    justifyContent: "center",
  },

  pulseMiddle: {
    width: 132,
    height: 132,
    borderRadius: 99,
    backgroundColor: colors.lime,
    alignItems: "center",
    justifyContent: "center",
  },

  pulseInner: {
    width: 86,
    height: 86,
    borderRadius: 99,
    backgroundColor: colors.ink,
    alignItems: "center",
    justifyContent: "center",
    ...shadows.offsetSmall,
  },

  spark: {
    fontFamily: fonts.brand,
    fontSize: 36,
    color: colors.lime,
  },

  title: {
    marginTop: 30,
    textAlign: "center",
    fontFamily: fonts.display,
    fontSize: 34,
    lineHeight: 35,
    fontWeight: "900",
    letterSpacing: -1.2,
    color: colors.ink,
  },

  description: {
    maxWidth: 270,
    marginTop: 12,
    textAlign: "center",
    fontFamily: fonts.body,
    fontSize: 13,
    lineHeight: 19,
    color: colors.muted,
  },

  loadingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 22,
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.line,
  },

  loadingText: {
    marginLeft: 8,
    fontFamily: fonts.bodySemibold,
    fontSize: 10,
    fontWeight: "600",
    color: colors.ink,
  },

  infoCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    padding: 15,
    borderWidth: 2,
    borderColor: colors.ink,
  },

  infoIcon: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    backgroundColor: colors.lime,
    alignItems: "center",
    justifyContent: "center",
  },

  infoEmoji: {
    fontSize: 20,
  },

  infoContent: {
    flex: 1,
    marginLeft: 12,
  },

  infoTitle: {
    fontFamily: fonts.bodyBold,
    fontSize: 13,
    fontWeight: "900",
    color: colors.ink,
  },

  infoDescription: {
    marginTop: 3,
    fontFamily: fonts.body,
    fontSize: 10,
    color: colors.muted,
  },

  cancelButton: {
    minHeight: 52,
    marginTop: 12,
    borderRadius: radius.xl,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: colors.ink,
  },

  cancelPressed: {
    opacity: 0.65,
  },

  cancelText: {
    fontFamily: fonts.bodyBold,
    fontSize: 13,
    fontWeight: "900",
    color: colors.ink,
  },

  footer: {
    marginTop: 12,
    paddingHorizontal: 15,
    textAlign: "center",
    fontFamily: fonts.body,
    fontSize: 9,
    lineHeight: 14,
    color: colors.muted,
  },
});