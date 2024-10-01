import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { useToast } from "react-native-toast-notifications"; // Ensure this library is installed
import { API_KEY } from "@/constants/Api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

interface SubGoal {
  title: string;
  description: string;
}

const AddGoals: React.FC = () => {
  const navigation = useNavigation();
  const toast = useToast();

  // Main goal states
  const [goalTitle, setGoalTitle] = useState<string>("");
  const [goalDescription, setGoalDescription] = useState<string>("");
  const [goalCategory, setGoalCategory] = useState<string>("");
  const [goalDuration, setGoalDuration] = useState<number>(1);

  // Sub-goal states
  const [subGoals, setSubGoals] = useState<SubGoal[]>([{ title: "", description: "" }]);

  // Handle sub-goal input changes
  const handleSubGoalChange = (index: number, field: keyof SubGoal, value: string) => {
    const newSubGoals = [...subGoals];
    newSubGoals[index][field] = value;
    setSubGoals(newSubGoals);
  };

  // Add a new sub-goal
  const addSubGoal = () => {
    if (subGoals.length < 5) {
      const newSubGoals = [...subGoals, { title: "", description: "" }];
      setSubGoals(newSubGoals);
      setGoalDuration(newSubGoals.length);
    }
  };

  // Remove a sub-goal
  const removeSubGoal = (index: number) => {
    const newSubGoals = subGoals.filter((_, i) => i !== index);
    setSubGoals(newSubGoals);
    setGoalDuration(newSubGoals.length);
  };

  // Handle form submission
  const handleAddGoal = async () => {
    const allSubGoalsFilled = subGoals.every(
      (subGoal) => subGoal.title.trim() !== "" && subGoal.description.trim() !== ""
    );

    if (!allSubGoalsFilled) {
      toast.show("Please fill all sub-goals before adding the main goal.", { type: 'danger' });
      return;
    }

    const newGoal = {
      title: goalTitle,
      description: goalDescription,
      category: goalCategory,
      duration: goalDuration,
      subGoals,
    };

    const token = await AsyncStorage.getItem('userToken');

    try {
      const res = await axios.post(
        `${API_KEY}/api/v1/goal/add`, 
        newGoal,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data?.success) {
        router.push('/user/goals')
      }
    } catch (error: any) {
      console.error(error);
    }

    setGoalTitle("");
    setGoalDescription("");
    setGoalCategory("");
    setGoalDuration(1);
    setSubGoals([{ title: "", description: "" }]);
  };

  return (
    <LinearGradient
      colors={["#1f2937", "#111827"]} // Updated gradient for darker theme
      className="flex-1 p-4"
    >
      <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
        <Text className="text-3xl font-bold text-white text-center mb-4">Add Your Goal</Text>

        {/* Goal Title */}
        <TextInput
          placeholder="Goal Title"
          value={goalTitle}
          onChangeText={setGoalTitle}
          className="bg-gray-700 rounded-lg p-3 mb-4 text-white"
          placeholderTextColor="#9ca3af"
        />

        {/* Goal Description */}
        <TextInput
          placeholder="Goal Description"
          value={goalDescription}
          onChangeText={setGoalDescription}
          className="bg-gray-700 rounded-lg p-3 mb-4 text-white"
          multiline
          numberOfLines={4}
          placeholderTextColor="#9ca3af"
        />

        {/* Category */}
        <Text className="text-white mb-2">Category</Text>
        <TextInput
          placeholder="Select Category"
          value={goalCategory}
          onChangeText={setGoalCategory}
          className="bg-gray-700 rounded-lg p-3 mb-4 text-white"
          placeholderTextColor="#9ca3af"
        />

        {/* Goal Duration */}
        <Text className="text-white mb-2">Goal Duration (matches the number of sub-goals)</Text>
        <TextInput
          value={String(goalDuration)}
          className="bg-gray-900 rounded-lg p-3 mb-4 text-white"
          editable={false} // Read-only field
        />

        {/* Sub-Goals Section */}
        <Text className="text-white mb-2">Sub Goals (Max 5)</Text>
        {subGoals.map((subGoal, index) => (
          <View key={index} className="mb-4">
            <TextInput
              placeholder="Sub-goal Title"
              value={subGoal.title}
              onChangeText={(text) => handleSubGoalChange(index, "title", text)}
              className="bg-gray-700 rounded-lg p-3 mb-2 text-white"
              placeholderTextColor="#9ca3af"
            />
            <TextInput
              placeholder="Sub-goal Description"
              value={subGoal.description}
              onChangeText={(text) => handleSubGoalChange(index, "description", text)}
              className="bg-gray-700 rounded-lg p-3 mb-2 text-white"
              multiline
              numberOfLines={2}
              placeholderTextColor="#9ca3af"
            />
            <TouchableOpacity
              onPress={() => removeSubGoal(index)}
              className={`bg-red-500 rounded-lg px-4 py-2 ${subGoals.length === 1 ? "opacity-50" : ""}`}
              disabled={subGoals.length === 1}
            >
              <Text className="text-white text-center">Remove</Text>
            </TouchableOpacity>
          </View>
        ))}

        {/* Add Sub-Goal Button */}
        <TouchableOpacity
          onPress={addSubGoal}
          disabled={subGoals.length >= 5}
          className={`bg-blue-600 rounded-lg px-4 py-2 ${subGoals.length >= 5 ? "opacity-50" : ""}`}
        >
          <Text className="text-white text-center">Add Sub Goal</Text>
        </TouchableOpacity>

        {/* Submit Button */}
        <View className="mt-6">
          <TouchableOpacity onPress={handleAddGoal} className="bg-green-500 rounded-lg px-4 py-3">
            <Text className="text-white text-center text-lg font-bold">Add Goal</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default AddGoals;
