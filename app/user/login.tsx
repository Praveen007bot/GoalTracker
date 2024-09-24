import { View, Text, TextInput, Pressable, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import axios from "axios";
import { Link, useRouter } from "expo-router";
import { API_KEY } from "@/constants/Api";

const UserLogin = () => {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = async () => {
    
    setLoading(true);
    setErrorMessage(""); // Reset error message
    try {
      const response = await axios.post(
        `${API_KEY}/api/v1/user/login`,
        formData,
        { withCredentials: true }
      );
      router.push('/user/Home')
    } catch (error) {
      console.error("Login failed:", error);
      setErrorMessage("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex items-center justify-center mt-40">
      <Text className="font-bold text-4xl mb-10">Login</Text>
      
      {errorMessage ? (
        <Text className="text-red-500 mb-5">{errorMessage}</Text>
      ) : null}

      <TextInput
        className="p-3 border-2 border-black w-[80%] rounded-lg"
        placeholder="Email"
        value={formData.email}
        onChangeText={(value) => handleChange("email", value)}
      />
      <TextInput
        className="p-3 border-2 border-black w-[80%] mt-5 rounded-lg"
        placeholder="Password"
        secureTextEntry
        value={formData.password}
        onChangeText={(value) => handleChange("password", value)}
      />
      
      <Pressable
        className="mt-20 w-[80%] bg-black py-4 rounded-lg"
        onPress={handleLogin}
        disabled={loading}  // Disable button while loading
      >
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text className="text-white font-medium mx-auto">Log in</Text>
        )}
      </Pressable>

      <Text className="mt-5">
        Don't have an account?{" "}
        <Link href="/user/Signup" asChild>
          <Text className="underline font-bold">Sign up</Text>
        </Link>
      </Text>
    </View>
  );
};

export default UserLogin;
