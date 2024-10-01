import React from "react";
import { Tabs } from "expo-router";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

// Define dark gradient colors
const gradientColors = {
  active: "#4c8bf5", // Active tab color (blue gradient)
  inactive: "#2a3eff", // Inactive tab color (lighter blue gradient)
};

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#1f2937", // Dark background for the tab bar to match the theme
          borderTopWidth: 0, // Optionally remove the top border for a cleaner look
        },
        tabBarActiveTintColor: gradientColors.active, // Active tab icon color based on gradient
        tabBarInactiveTintColor: "rgba(255, 255, 255, 0.6)", // Softer inactive color
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ focused }) => (
            <Entypo
              name="home"
              size={24}
              color={
                focused ? gradientColors.active : "rgba(255, 255, 255, 0.6)"
              }
            />
          ),
        }}
      />
      <Tabs.Screen
        name="goals"
        options={{
          tabBarLabel: "Goals",
          tabBarIcon: ({ focused }) => (
            <MaterialIcons name="task-alt" size={24} color={
              focused ? gradientColors.active : "rgba(255, 255, 255, 0.6)"
            } />
          ),
        }}
      />
      <Tabs.Screen
        name="addGoal"
        options={{
          tabBarLabel: "Add Goal",
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="pluscircle"
              size={24}
              color={
                focused ? gradientColors.active : "rgba(255, 255, 255, 0.6)"
              }
            />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          tabBarLabel: "History",
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              name="history"
              size={24}
              color={
                focused ? gradientColors.active : "rgba(255, 255, 255, 0.6)"
              }
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name="user"
              size={24}
              color={
                focused ? gradientColors.active : "rgba(255, 255, 255, 0.6)"
              }
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
