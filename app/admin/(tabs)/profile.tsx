import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, Modal, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_KEY } from "@/constants/Api";

const AdminProfile = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const authAdmin = useSelector((state: RootState) => state.admin.authAdmin);

  console.log(authAdmin);
  

  const handleLogout = async () => {
    try {
      const res = await axios.get(`${API_KEY}/api/v1/user/logout`);
      
      if (res.data.success) {
        dispatch({ type: "RESET_STATE" });
  
        // Remove the token from AsyncStorage
        await AsyncStorage.removeItem("adminToken");
  
        // Redirect to login screen
        router.replace("/admin/login"); 
        console.log(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <View className="flex-1 items-center justify-center bg-gray-900 p-4">
      <Text className="text-white text-4xl font-bold mb-4"> Admin Profile</Text>

      

      {/* Dummy Profile Image */}
      <Image
        source={{ uri: "https://via.placeholder.com/100" }} // Placeholder image
        style={{ width: 100, height: 100, borderRadius: 50, marginBottom: 20 }}
      />

      {/* User Details */}
      <Text className="text-white text-lg mb-2">
        Username: {authAdmin?.username || "No username"}
      </Text>
      <Text className="text-white text-lg mb-2">
        Email: {authAdmin?.email || "No email"}
      </Text>

      {/* Logout Button */}
      <TouchableOpacity
        onPress={handleLogout}
        className="bg-red-500 px-4 py-3 rounded-lg mt-6"
      >
        <Text className="text-white font-bold">Logout</Text>
      </TouchableOpacity>

     
    </View>
  );
};

export default AdminProfile;
