import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, Modal, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_KEY } from "@/constants/Api";
import { MaterialIcons } from '@expo/vector-icons'; // Import icon library

const Profile = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const authUser = useSelector((state: RootState) => state.user.authUser);

  const [menuVisible, setMenuVisible] = useState(false);

  const handleLogout = async () => {
    try {
      const res = await axios.get(`${API_KEY}/api/v1/user/logout`);
      
      if (res.data.success) {
        dispatch({ type: "RESET_STATE" });
  
        // Remove the token from AsyncStorage
        await AsyncStorage.removeItem("userToken");
  
        // Redirect to login screen
        router.replace("/user/login"); 
        console.log(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleFocusMode = () => {
    setMenuVisible(false);
    router.push("/user/focusmode");
  };

  const handleHistory = () => {
    setMenuVisible(false);
    router.push("/user/history");
  };

  return (
    <View className="flex-1 items-center justify-center bg-gray-900 p-4">
      <Text className="text-white text-4xl font-bold mb-4">Profile</Text>

      {/* Three Dots Menu Icon */}
      <TouchableOpacity 
        onPress={toggleMenu} 
        style={{ position: "absolute", top: 40, right: 20 }}
      >
        <MaterialIcons name="more-vert" size={28} color="white" />
      </TouchableOpacity>

      {/* Dummy Profile Image */}
      <Image
        source={{ uri: "https://via.placeholder.com/100" }} // Placeholder image
        style={{ width: 100, height: 100, borderRadius: 50, marginBottom: 20 }}
      />

      {/* User Details */}
      <Text className="text-white text-lg mb-2">
        Username: {authUser?.username || "No username"}
      </Text>
      <Text className="text-white text-lg mb-2">
        Email: {authUser?.email || "No email"}
      </Text>

      {/* Logout Button */}
      <TouchableOpacity
        onPress={handleLogout}
        className="bg-red-500 px-4 py-3 rounded-lg mt-6"
      >
        <Text className="text-white font-bold">Logout</Text>
      </TouchableOpacity>

      {/* Dropdown Menu */}
      <Modal
        transparent={true}
        animationType="fade"
        visible={menuVisible}
        onRequestClose={toggleMenu}
      >
        <Pressable 
          onPress={toggleMenu}
          style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <View
            style={{
              position: "absolute",
              top: 60,
              right: 20,
              backgroundColor: "white",
              borderRadius: 8,
              padding: 10,
              elevation: 5,
            }}
          >
            {/* Focus Mode Option */}
            <TouchableOpacity 
              onPress={handleFocusMode} 
              style={{ padding: 10 }}
            >
              <Text style={{ color: "black", fontSize: 16 }}>Focus Mode</Text>
            </TouchableOpacity>

            {/* History Option */}
            <TouchableOpacity 
              onPress={handleHistory} 
              style={{ padding: 10 }}
            >
              <Text style={{ color: "black", fontSize: 16 }}>History</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

export default Profile;
