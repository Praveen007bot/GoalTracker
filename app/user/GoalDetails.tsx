import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_KEY } from "@/constants/Api";
import { useRoute, useNavigation } from "@react-navigation/native";

type Goal = {
  _id: string;
  title: string;
  description: string;
  category: string;
  subGoals: { title: string; description: string }[];
};

const GoalDetails = () => {
  const [goal, setGoal] = useState<Goal | null>(null);
  const [loading, setLoading] = useState(false); // Loading state for delete action
  const route = useRoute();
  const { goalId } = route.params as { goalId: string }; // Get goal ID from route params
  const navigation = useNavigation();

  // Fetch goal details from API
  useEffect(() => {
    const fetchGoalDetails = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        const response = await axios.get(`${API_KEY}/api/v1/goal/${goalId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        setGoal(response.data.goal);
      } catch (error: any) {
        console.error("Error fetching goal:", error.message);
      }
    };

    fetchGoalDetails();
  }, [goalId]);

  // Delete goal
  const handleDeleteGoal = async () => {
    setLoading(true); // Start loading
    try {
      const token = await AsyncStorage.getItem("userToken");
      const res = await axios.delete(`${API_KEY}/api/v1/goal/delete`, {
        data: { goalId: goal?._id },
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      // Check if the response was successful
      if (res.data.success) {
        navigation.goBack(); // Navigate back after deleting
      }
    } catch (error: any) {
      console.error("Error deleting goal:", error.message);
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <View className="flex-1 bg-gray-900 p-4">
      {goal ? (
        <ScrollView>
          <Text className="text-white text-2xl font-bold mb-4">{goal.title}</Text>
          <Text className="text-gray-400 text-lg mb-2">{goal.description}</Text>
          <Text className="text-gray-500">Category: {goal.category}</Text>
          <Text className="text-gray-500 mb-4">
            Sub Goals: {goal.subGoals.length}
          </Text>

          {/* Display Sub Goals */}
          <Text className="text-white text-xl font-semibold mb-2">Sub Goals</Text>
          {goal.subGoals.map((subGoal, index) => (
            <View key={index} className="bg-gray-800 p-4 rounded-lg mb-2">
              <Text className="text-white font-bold">{subGoal.title}</Text>
              <Text className="text-gray-400">{subGoal.description}</Text>
            </View>
          ))}

          {/* Delete Button with Loading State */}
          <TouchableOpacity
            onPress={handleDeleteGoal}
            disabled={loading} // Disable the button while loading
            className={`bg-red-600 rounded-lg px-4 py-3 mt-6 ${loading ? 'opacity-50' : ''}`}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white text-center text-lg font-bold">Delete Goal</Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      ) : (
        <Text className="text-gray-400">Loading goal details...</Text>
      )}
    </View>
  );
};

export default GoalDetails;
