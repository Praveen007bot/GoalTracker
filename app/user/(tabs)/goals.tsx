import React, { useState, useCallback } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_KEY } from "@/constants/Api";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";

type Goal = {
  _id: string;
  title: string;
  description: string;
  category: string;
  subGoals: string[];
};

const Goals = () => {
  const router = useRouter();
  const [localGoals, setLocalGoals] = useState<Goal[]>([]);
  const navigation = useNavigation();

  const handleDeleteGoal = async (goalId: string) => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      const res = await axios.delete(`${API_KEY}/api/v1/goal/delete`, {
        data: { goalId },
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      if (res.data.success) {
        // Update local state to remove the deleted goal
        setLocalGoals((prevGoals) =>
          prevGoals.filter((goal) => goal._id !== goalId)
        );
      }
    } catch (error: any) {
      console.error("Error deleting goal:", error.message);
    }
  };

  const openGoalDetails = (goalId: string) => {
    router.push({ pathname: "/user/GoalDetails", params: { goalId } });
  };

  // Fetch goals from API
  const fetchGoals = useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      const response = await axios.get(`${API_KEY}/api/v1/goal`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      setLocalGoals(response.data.goals); // Assuming your API returns goals in a 'goals' key
    } catch (error: any) {
      console.error("Error fetching goals:", error.message);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchGoals();
    }, [fetchGoals])
  );

  return (
    <ScrollView className="flex-1 bg-gray-900 p-4">
      <Text className="text-white text-2xl font-bold mb-4">Your Goals</Text>
      <View className="space-y-4">
        {localGoals.length > 0 ? (
          localGoals.map((goal) => (
            <TouchableOpacity
              key={goal._id}
              className="bg-gray-800 p-4 rounded-lg shadow-lg"
              onPress={() => openGoalDetails(goal._id)} // Navigate on click
              onLongPress={() => handleDeleteGoal(goal._id)} // Long press to delete goal
            >
              <Text className="text-xl text-white font-semibold">
                {goal.title}
              </Text>
              <Text className="text-gray-400 mt-2">{goal.description}</Text>
              <Text className="text-gray-500 mt-1">
                Category: {goal.category}
              </Text>
              <Text className="text-gray-500 mt-1">
                Sub Goals: {goal.subGoals.length}
              </Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text className="text-gray-400">No goals found</Text>
        )}
      </View>
    </ScrollView>
  );
};

export default Goals;
