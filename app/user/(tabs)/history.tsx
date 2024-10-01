import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API_KEY } from "@/constants/Api";
import { router, useNavigation } from "expo-router";
import { setGoals as reduxGoals } from "@/redux/goalSlice";

// Define Goal type
type Goal = {
  _id: string;
  title: string;
  description: string;
  category: string;
  subGoals: { title: string; description: string }[];
};

const History = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [goals, setGoals] = useState<Goal[]>([]);

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        const response = await axios.get(`${API_KEY}/api/v1/goal`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        setGoals(response.data.goals); // Assuming your API returns goals in a 'goals' key
        dispatch(reduxGoals(response.data.goals));
      } catch (error: any) {
        console.error("Error fetching goals:", error.message);
      }
    };

    fetchGoals();
  }, []);

  // Handle goal deletion
  const handleDeleteGoal = async (goalId: string) => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      const res = await axios.delete(`${API_KEY}/api/v1/goal/delete`, {
        data: { goalId }, // Sending goalId in the request body
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      if (res.data.success) {
        Alert.alert("Goal Deleted", "The goal has been successfully deleted.");
        // Remove the deleted goal from the local state
        setGoals((prevGoals) => prevGoals.filter((goal) => goal._id !== goalId));
      }
    } catch (error: any) {
      console.error("Error deleting goal:", error.message);
    }
  };

  // Confirmation dialog for goal deletion
  const handleDelete = (goalId: string) => {
    Alert.alert(
      "Delete Goal",
      "Are you sure you want to delete this goal?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", onPress: () => handleDeleteGoal(goalId) },
      ],
      { cancelable: true }
    );
  };

  // Render each goal as a row in the table
  const renderGoal = ({ item }: { item: Goal }) => (
    <View className="flex-row justify-between items-center p-4 border-b border-gray-700">
      <Text className="text-white flex-1">{item.title}</Text>
      <Text className="text-white flex-1">{item.description}</Text>
      <Text className="text-white flex-1">{item.category}</Text>
      <TouchableOpacity
        className="bg-red-600 px-4 py-2 rounded-lg"
        onPress={() => handleDelete(item._id)}
      >
        <Text className="text-white">Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View className="flex-1 bg-gray-900 p-4">
      <Text className="text-white text-3xl font-bold mb-6">Goal History</Text>

      {goals.length === 0 ? (
        <Text className="text-white">No goals available.</Text>
      ) : (
        <View>
          {/* Table Header */}
          <View className="flex-row justify-between items-center p-4 border-b-2 border-gray-700">
            <Text className="text-white flex-1 font-bold">Title</Text>
            <Text className="text-white flex-1 font-bold">Description</Text>
            <Text className="text-white flex-1 font-bold">Category</Text>
            <Text className="text-white flex-1 font-bold">Action</Text>
          </View>

          {/* Table Body */}
          <FlatList
            data={goals} // Ensure goals is typed as Goal[]
            renderItem={renderGoal}
            keyExtractor={(item) => item._id}
          />
        </View>
      )}
    </View>
  );
};

export default History;
