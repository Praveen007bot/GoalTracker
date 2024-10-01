import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ScrollView, Alert } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_KEY } from "@/constants/Api";

type User = {
  _id: string;
  username: string;
  email: string;
  goals: any[]; // Adjusted to hold user's goals
};

const AdminHome = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch users from the API
  const fetchUsers = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      const response = await axios.get(`${API_KEY}/api/v1/user/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      setUsers(response.data); 
      
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const calculateTotalGoals = (user: User) => {
    return user.goals.length;
  };

  // Render each user as a row in the table
  const renderUser = ({ item }: { item: User }) => (
    <View className="flex-row justify-evenly items-center p-4 border-b border-gray-700 gap-20">
      <Text className="text-white flex-1">{item.username}</Text>
      <Text className="text-white flex-1">{item.email}</Text>
      <Text className="text-white flex-1">{calculateTotalGoals(item)}</Text>
      <Text className="text-white flex-1">Active</Text>
      {/* Add any action buttons if needed */}
    </View>
  );

  return (
    <View className="flex-1 bg-gray-900 p-4">
      <Text className="text-white text-3xl font-bold mb-6">Admin Home</Text>

      {loading ? (
        <Text className="text-white">Loading users...</Text>
      ) : users.length === 0 ? (
        <Text className="text-white">No users available.</Text>
      ) : (
        <ScrollView horizontal>
          <View className="w-full">
            {/* Table Header */}
            <View className="flex-row justify-evenly items-center p-4 border-b-2 border-gray-700 bg-gray-800 gap-20">
              <Text className="text-white flex-1 font-bold">Username</Text>
              <Text className="text-white flex-1 font-bold">Email</Text>
              <Text className="text-white flex-1 font-bold">Total Goals</Text>
              <Text className="text-white flex-1 font-bold">Status</Text>
            </View>

            {/* Table Body */}
            <ScrollView>
              <FlatList
                data={users}
                renderItem={renderUser}
                keyExtractor={(item) => item._id}
              />
            </ScrollView>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default AdminHome;
