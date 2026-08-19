import React, { useMemo, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
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

type Place = {
  icon: string;
  name: string;
  address: string;
  time: string;
};

const places: Place[] = [
  {
    icon: "🏠",
    name: "Home",
    address: "Saved place",
    time: "12 min",
  },
  {
    icon: "🎓",
    name: "College",
    address: "Saved place",
    time: "18 min",
  },
  {
    icon: "☕",
    name: "Cafe",
    address: "Saved place",
    time: "8 min",
  },
];

export default function DestinationScreen() {
  const navigation = useNavigation<NavigationProp>();

  const { setDestination } = useRide();

  const [search, setSearch] = useState("");
  const [destination, setLocalDestination] =
    useState<Place | null>(null);

  const filteredPlaces = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return places;
    }

    return places.filter((place) =>
      place.name.toLowerCase().includes(query),
    );
  }, [search]);

  const handleSelectDestination = (
    place: Place,
  ) => {
    setLocalDestination(place);
  };

  const handleChangeDestination = () => {
    setLocalDestination(null);
    setSearch("");
  };

  const handleContinue = () => {
    if (!destination) {
      return;
    }

    setDestination({
      name: destination.name,
      address: destination.address,
    });

    navigation.navigate("RideSelection");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />

      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.headerText}>
            <Text style={styles.eyebrow}>
              VIBE
            </Text>

            <Text style={styles.title}>
              Where we{"\n"}goin'?
            </Text>
          </View>

          <Pressable
            style={styles.closeButton}
            onPress={() =>
              navigation.navigate("Home")
            }
          >
            <Text style={styles.closeText}>
              ×
            </Text>
          </Pressable>
        </View>

        {/* SEARCH */}
        <View style={styles.searchSection}>
          <Text style={styles.searchEyebrow}>
            DROP THE SPOT
          </Text>

          <View style={styles.searchBox}>
            <Text style={styles.searchIcon}>
              ⌕
            </Text>

            <TextInput
              value={search}
              onChangeText={setSearch}
              placeholder="Search destination..."
              placeholderTextColor={colors.muted}
              style={styles.input}
              returnKeyType="search"
              autoCorrect={false}
            />
          </View>
        </View>

        {/* SELECTED DESTINATION */}
        {destination ? (
          <View style={styles.selectedCard}>
            <View style={styles.selectedLeft}>
              <View style={styles.selectedIcon}>
                <Text style={styles.selectedIconText}>
                  →
                </Text>
              </View>

              <View style={styles.selectedInfo}>
                <Text style={styles.selectedLabel}>
                  DESTINATION
                </Text>

                <Text style={styles.selectedName}>
                  {destination.name}
                </Text>

                <Text style={styles.selectedStatus}>
                  Locked in ✓
                </Text>
              </View>
            </View>

            <Pressable
              onPress={handleChangeDestination}
              style={styles.changeButton}
            >
              <Text style={styles.changeText}>
                Change
              </Text>
            </Pressable>
          </View>
        ) : (
          <>
            {/* QUICK PLACES */}
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>
                Quick spots
              </Text>

              <Text style={styles.sectionHint}>
                your usuals
              </Text>
            </View>

            <View style={styles.places}>
              {filteredPlaces.map((place) => (
                <Pressable
                  key={place.name}
                  onPress={() =>
                    handleSelectDestination(place)
                  }
                  style={({ pressed }) => [
                    styles.placeCard,
                    pressed && styles.placePressed,
                  ]}
                >
                  <View style={styles.placeIcon}>
                    <Text style={styles.placeEmoji}>
                      {place.icon}
                    </Text>
                  </View>

                  <View style={styles.placeInfo}>
                    <Text style={styles.placeName}>
                      {place.name}
                    </Text>

                    <Text style={styles.placeAddress}>
                      {place.address}
                    </Text>
                  </View>

                  <View style={styles.placeRight}>
                    <Text style={styles.placeTime}>
                      {place.time}
                    </Text>

                    <Text style={styles.arrow}>
                      ›
                    </Text>
                  </View>
                </Pressable>
              ))}

              {filteredPlaces.length === 0 && (
                <View style={styles.emptyState}>
                  <Text style={styles.emptyEmoji}>
                    🫠
                  </Text>

                  <Text style={styles.emptyTitle}>
                    Nothing here yet.
                  </Text>

                  <Text style={styles.emptyText}>
                    Try another spot.
                  </Text>
                </View>
              )}
            </View>
          </>
        )}

        {/* ROUTE PREVIEW */}
        <View style={styles.routeCard}>
          <View style={styles.routeRow}>
            <View style={styles.pickupDot} />

            <View style={styles.routeInfo}>
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
            <View
              style={[
                styles.destinationDot,
                !destination &&
                  styles.destinationDotEmpty,
              ]}
            />

            <View style={styles.routeInfo}>
              <Text style={styles.routeLabel}>
                DESTINATION
              </Text>

              <Text
                style={[
                  styles.routeValue,
                  !destination &&
                    styles.placeholderValue,
                ]}
              >
                {destination
                  ? destination.name
                  : "Drop the spot →"}
              </Text>
            </View>
          </View>
        </View>

        {/* CTA */}
        <Pressable
          disabled={!destination}
          onPress={handleContinue}
          style={({ pressed }) => [
            styles.continueButton,
            !destination &&
              styles.continueDisabled,
            pressed &&
              destination &&
              styles.continuePressed,
          ]}
        >
          <View>
            <Text style={styles.continueEyebrow}>
              {destination
                ? "LOCKED IN"
                : "PICK A SPOT"}
            </Text>

            <Text style={styles.continueText}>
              {destination
                ? "Let's roll"
                : "Where we vibin'?"}
            </Text>
          </View>

          <Text style={styles.continueArrow}>
            →
          </Text>
        </Pressable>

        <Text style={styles.footer}>
          Change your destination anytime before
          you lock in the ride.
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

  pressed: {
    opacity: 0.72,
  },

  /* HEADER */

  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 24,
  },

  headerText: {
    flex: 1,
  },

  eyebrow: {
    fontFamily: fonts.bodyBold,
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 2,
    color: colors.muted,
    marginBottom: 6,
  },

  title: {
    fontFamily: fonts.display,
    fontSize: 40,
    lineHeight: 42,
    fontWeight: "900",
    letterSpacing: -1.5,
    color: colors.ink,
  },

  closeButton: {
    width: 44,
    height: 44,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: colors.ink,
  },

  closeText: {
    fontFamily: fonts.bodyMedium,
    fontSize: 27,
    lineHeight: 28,
    color: colors.ink,
  },

  /* SEARCH */

  searchSection: {
    marginBottom: 22,
  },

  searchEyebrow: {
    fontFamily: fonts.bodyBold,
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1.6,
    color: colors.muted,
    marginBottom: 9,
  },

  searchBox: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    paddingHorizontal: 17,
    borderWidth: 2,
    borderColor: colors.ink,
    ...shadows.offsetSmall,
  },

  searchIcon: {
    fontFamily: fonts.bodyMedium,
    fontSize: 27,
    color: colors.ink,
    marginRight: 10,
  },

  input: {
    flex: 1,
    fontFamily: fonts.bodyMedium,
    fontSize: 15,
    color: colors.ink,
    paddingVertical: 0,
  },

  /* SECTION */

  sectionHeader: {
    flexDirection: "row",
    alignItems: "baseline",
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

  /* PLACES */

  places: {
    gap: 10,
  },

  placeCard: {
    minHeight: 78,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    paddingHorizontal: 13,
    borderWidth: 2,
    borderColor: colors.ink,
  },

  placePressed: {
    opacity: 0.72,
  },

  placeIcon: {
    width: 50,
    height: 50,
    borderRadius: 16,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
  },

  placeEmoji: {
    fontSize: 23,
  },

  placeInfo: {
    flex: 1,
    marginLeft: 13,
  },

  placeName: {
    fontFamily: fonts.bodyBold,
    fontSize: 15,
    fontWeight: "900",
    color: colors.ink,
  },

  placeAddress: {
    fontFamily: fonts.body,
    marginTop: 3,
    fontSize: 10,
    color: colors.muted,
  },

  placeRight: {
    alignItems: "flex-end",
    marginLeft: 8,
  },

  placeTime: {
    fontFamily: fonts.bodyBold,
    fontSize: 10,
    fontWeight: "800",
    color: colors.muted,
  },

  arrow: {
    fontFamily: fonts.bodyMedium,
    fontSize: 27,
    lineHeight: 28,
    color: colors.ink,
    marginTop: 2,
  },

  /* EMPTY */

  emptyState: {
    paddingVertical: 34,
    alignItems: "center",
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 2,
    borderColor: colors.ink,
  },

  emptyEmoji: {
    fontSize: 28,
    marginBottom: 8,
  },

  emptyTitle: {
    fontFamily: fonts.bodyBold,
    fontSize: 16,
    fontWeight: "900",
    color: colors.ink,
  },

  emptyText: {
    fontFamily: fonts.body,
    marginTop: 4,
    fontSize: 12,
    color: colors.muted,
  },

  /* SELECTED */

  selectedCard: {
    minHeight: 84,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.lime,
    borderRadius: radius.xl,
    padding: 14,
    borderWidth: 2,
    borderColor: colors.ink,
    ...shadows.offset,
  },

  selectedLeft: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },

  selectedIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: colors.ink,
    alignItems: "center",
    justifyContent: "center",
  },

  selectedIconText: {
    fontFamily: fonts.bodyBold,
    color: colors.lime,
    fontSize: 21,
    fontWeight: "900",
  },

  selectedInfo: {
    flex: 1,
    marginLeft: 12,
  },

  selectedLabel: {
    fontFamily: fonts.bodyBold,
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 1.4,
    color: "#5F5F59",
  },

  selectedName: {
    fontFamily: fonts.heading,
    marginTop: 3,
    fontSize: 17,
    fontWeight: "900",
    color: colors.ink,
  },

  selectedStatus: {
    fontFamily: fonts.bodyMedium,
    marginTop: 2,
    fontSize: 10,
    color: "#4F5F2A",
  },

  changeButton: {
    paddingHorizontal: 10,
    paddingVertical: 8,
  },

  changeText: {
    fontFamily: fonts.bodyBold,
    fontSize: 11,
    fontWeight: "900",
    color: colors.ink,
  },

  /* ROUTE */

  routeCard: {
    marginTop: 24,
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    padding: 18,
    borderWidth: 2,
    borderColor: colors.ink,
  },

  routeRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  pickupDot: {
    width: 12,
    height: 12,
    borderRadius: radius.pill,
    backgroundColor: colors.lime,
    marginHorizontal: 4,
    borderWidth: 2,
    borderColor: colors.ink,
  },

  destinationDot: {
    width: 12,
    height: 12,
    borderRadius: radius.pill,
    backgroundColor: colors.ink,
    marginHorizontal: 4,
  },

  destinationDotEmpty: {
    backgroundColor: colors.line,
  },

  routeInfo: {
    flex: 1,
    marginLeft: 14,
  },

  routeLabel: {
    fontFamily: fonts.bodyBold,
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 1.4,
    color: colors.muted,
  },

  routeValue: {
    fontFamily: fonts.bodySemibold,
    marginTop: 3,
    fontSize: 14,
    fontWeight: "700",
    color: colors.ink,
  },

  placeholderValue: {
    color: colors.muted,
    fontWeight: "600",
  },

  routeLine: {
    height: 22,
    width: 2,
    backgroundColor: colors.line,
    marginLeft: 9,
    marginVertical: 2,
  },

  /* CTA */

  continueButton: {
    marginTop: 16,
    minHeight: 70,
    borderRadius: radius.xl,
    backgroundColor: colors.lime,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    borderWidth: 2,
    borderColor: colors.ink,
    ...shadows.offset,
  },

  continueDisabled: {
    backgroundColor: "#E4E4DE",
    shadowOpacity: 0,
    elevation: 0,
  },

  continuePressed: {
    opacity: 0.75,
  },

  continueEyebrow: {
    fontFamily: fonts.bodyBold,
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 1.3,
    color: colors.muted,
    marginBottom: 2,
  },

  continueText: {
    fontFamily: fonts.heading,
    fontSize: 18,
    fontWeight: "900",
    color: colors.ink,
  },

  continueArrow: {
    fontFamily: fonts.bodyBold,
    fontSize: 25,
    fontWeight: "900",
    color: colors.ink,
  },

  footer: {
    fontFamily: fonts.body,
    marginTop: 18,
    textAlign: "center",
    fontSize: 10,
    lineHeight: 15,
    color: colors.muted,
  },
});