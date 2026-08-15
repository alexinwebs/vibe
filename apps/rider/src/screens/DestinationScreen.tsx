import React, { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/AppNavigator";

const colors = {
  background: "#F6F6F1",
  surface: "#FFFFFF",
  text: "#111111",
  muted: "#777771",
  border: "#E7E7E0",
  lime: "#C9F45B",
};

const places = [
  {
    icon: "🏠",
    name: "Home",
    address: "Saved place",
  },
  {
    icon: "🎓",
    name: "College",
    address: "Saved place",
  },
  {
    icon: "☕",
    name: "Cafe",
    address: "Saved place",
  },
];

export default function DestinationScreen() {
    const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [search, setSearch] = useState("");
  const [destination, setDestination] = useState<string | null>(null);

  const filteredPlaces = places.filter((place) =>
    place.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.eyebrow}>VIBE DESTINATION</Text>
            <Text style={styles.title}>Where to?</Text>
          </View>

          <View style={styles.closeButton}>
            <Text style={styles.closeText}>×</Text>
          </View>
        </View>

        <View style={styles.searchBox}>
          <Text style={styles.searchIcon}>⌕</Text>

          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search destination"
            placeholderTextColor={colors.muted}
            style={styles.input}
            returnKeyType="search"
          />
        </View>

        {destination ? (
          <View style={styles.selectedCard}>
            <View style={styles.selectedIcon}>
              <Text style={styles.selectedIconText}>→</Text>
            </View>

            <View style={styles.selectedInfo}>
              <Text style={styles.selectedLabel}>DESTINATION</Text>
              <Text style={styles.selectedName}>{destination}</Text>
            </View>

            <Pressable onPress={() => setDestination(null)}>
              <Text style={styles.changeText}>Change</Text>
            </Pressable>
          </View>
        ) : (
          <>
            <Text style={styles.sectionTitle}>Recent places</Text>

            <View style={styles.places}>
              {filteredPlaces.map((place) => (
                <Pressable
                  key={place.name}
                  style={({ pressed }) => [
                    styles.placeCard,
                    pressed && styles.placePressed,
                  ]}
                  onPress={() => setDestination(place.name)}
                >
                  <View style={styles.placeIcon}>
                    <Text style={styles.placeEmoji}>{place.icon}</Text>
                  </View>

                  <View style={styles.placeInfo}>
                    <Text style={styles.placeName}>{place.name}</Text>
                    <Text style={styles.placeAddress}>
                      {place.address}
                    </Text>
                  </View>

                  <Text style={styles.arrow}>›</Text>
                </Pressable>
              ))}

              {filteredPlaces.length === 0 && (
                <View style={styles.emptyState}>
                  <Text style={styles.emptyTitle}>No saved places</Text>
                  <Text style={styles.emptyText}>
                    Try another destination.
                  </Text>
                </View>
              )}
            </View>
          </>
        )}

        <View style={styles.routeCard}>
          <View style={styles.routeRow}>
            <View style={styles.pickupDot} />

            <View style={styles.routeInfo}>
              <Text style={styles.routeLabel}>PICKUP</Text>
              <Text style={styles.routeValue}>
                Your current location
              </Text>
            </View>
          </View>

          <View style={styles.routeLine} />

          <View style={styles.routeRow}>
            <View
              style={[
                styles.destinationDot,
                !destination && styles.destinationDotEmpty,
              ]}
            />

            <View style={styles.routeInfo}>
              <Text style={styles.routeLabel}>DESTINATION</Text>
              <Text
                style={[
                  styles.routeValue,
                  !destination && styles.placeholderValue,
                ]}
              >
                {destination ?? "Choose a destination"}
              </Text>
            </View>
          </View>
        </View>

        <Pressable
  disabled={!destination}
  onPress={() => navigation.navigate("RideSelection")}
  style={({ pressed }) => [
            styles.continueButton,
            !destination && styles.continueDisabled,
            pressed && destination && styles.continuePressed,
          ]}
        >
          <Text style={styles.continueText}>Continue</Text>
          <Text style={styles.continueArrow}>→</Text>
        </Pressable>

        <Text style={styles.footer}>
          You can change your destination before requesting the ride.
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
    padding: 24,
    paddingBottom: 40,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 26,
  },

  eyebrow: {
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 2,
    color: colors.muted,
    marginBottom: 8,
  },

  title: {
    fontSize: 42,
    lineHeight: 46,
    fontWeight: "900",
    letterSpacing: -1.5,
    color: colors.text,
  },

  closeButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.border,
  },

  closeText: {
    fontSize: 28,
    lineHeight: 28,
    color: colors.text,
  },

  searchBox: {
    height: 58,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderRadius: 18,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: colors.border,
  },

  searchIcon: {
    fontSize: 28,
    color: colors.text,
    marginRight: 10,
  },

  input: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
    paddingVertical: 0,
  },

  sectionTitle: {
    marginTop: 30,
    marginBottom: 12,
    fontSize: 18,
    fontWeight: "900",
    color: colors.text,
  },

  places: {
    gap: 10,
  },

  placeCard: {
    minHeight: 76,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderRadius: 18,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },

  placePressed: {
    opacity: 0.7,
  },

  placeIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
  },

  placeEmoji: {
    fontSize: 22,
  },

  placeInfo: {
    flex: 1,
    marginLeft: 14,
  },

  placeName: {
    fontSize: 16,
    fontWeight: "900",
    color: colors.text,
  },

  placeAddress: {
    marginTop: 3,
    fontSize: 12,
    color: colors.muted,
  },

  arrow: {
    fontSize: 28,
    color: colors.muted,
    marginLeft: 8,
  },

  emptyState: {
    paddingVertical: 30,
    alignItems: "center",
  },

  emptyTitle: {
    fontSize: 16,
    fontWeight: "900",
    color: colors.text,
  },

  emptyText: {
    marginTop: 5,
    fontSize: 13,
    color: colors.muted,
  },

  selectedCard: {
    marginTop: 24,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.lime,
    borderRadius: 20,
    padding: 16,
  },

  selectedIcon: {
    width: 46,
    height: 46,
    borderRadius: 15,
    backgroundColor: colors.text,
    alignItems: "center",
    justifyContent: "center",
  },

  selectedIconText: {
    color: colors.lime,
    fontSize: 22,
    fontWeight: "900",
  },

  selectedInfo: {
    flex: 1,
    marginLeft: 14,
  },

  selectedLabel: {
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 1.5,
    color: colors.muted,
  },

  selectedName: {
    marginTop: 3,
    fontSize: 17,
    fontWeight: "900",
    color: colors.text,
  },

  changeText: {
    fontSize: 12,
    fontWeight: "900",
    color: colors.text,
  },

  routeCard: {
    marginTop: 28,
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.border,
  },

  routeRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  pickupDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#7BC943",
    marginHorizontal: 4,
  },

  destinationDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.text,
    marginHorizontal: 4,
  },

  destinationDotEmpty: {
    backgroundColor: colors.border,
  },

  routeInfo: {
    flex: 1,
    marginLeft: 14,
  },

  routeLabel: {
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 1.4,
    color: colors.muted,
  },

  routeValue: {
    marginTop: 3,
    fontSize: 15,
    fontWeight: "800",
    color: colors.text,
  },

  placeholderValue: {
    color: colors.muted,
    fontWeight: "600",
  },

  routeLine: {
    height: 22,
    width: 1,
    backgroundColor: colors.border,
    marginLeft: 10,
    marginVertical: 2,
  },

  continueButton: {
    marginTop: 18,
    height: 62,
    borderRadius: 20,
    backgroundColor: colors.lime,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 22,
  },

  continueDisabled: {
    backgroundColor: "#E4E4DE",
  },

  continuePressed: {
    opacity: 0.75,
  },

  continueText: {
    fontSize: 17,
    fontWeight: "900",
    color: colors.text,
  },

  continueArrow: {
    fontSize: 24,
    fontWeight: "900",
    color: colors.text,
  },

  footer: {
    marginTop: 18,
    textAlign: "center",
    fontSize: 11,
    lineHeight: 16,
    color: colors.muted,
  },
});
