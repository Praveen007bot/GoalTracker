import {
    View,
    Text,
    TextInput,
    Pressable,
    ActivityIndicator,
  } from "react-native";
  import React, { useState } from "react";
  import { Link, useRouter } from "expo-router";
  import { API_KEY } from "@/constants/Api";
  import axios from "axios";
  
  const AdminSignup = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
      username: "",
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
  
    const handleSignup = async () => {
      setLoading(true);
      setErrorMessage(""); // Reset error message
      try {
        const response = await axios.post(
          `${API_KEY}/api/v1/admin/register`,
          formData,
          { withCredentials: true }
        );
        router.push("/admin/login");
      } catch (error) {
        console.error("Signup failed:", error);
        setErrorMessage("Invalid email or password. Please try again.");
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <View className="flex items-center justify-center h-full bg-gray-900 px-6">
        <Text className="font-bold text-4xl text-white mb-10">Signup</Text>
  
        {errorMessage ? (
          <Text className="text-red-500 mb-5">{errorMessage}</Text>
        ) : null}
  
        <TextInput
          className="p-4 bg-gray-800 text-white border-2 border-gray-700 w-full rounded-lg mb-5"
          placeholder="Username"
          placeholderTextColor="#a1a1aa"
          value={formData.username}
          onChangeText={(value) => handleChange("username", value)}
        />
  
        <TextInput
          className="p-4 bg-gray-800 text-white border-2 border-gray-700 w-full rounded-lg mb-5"
          placeholder="Email"
          placeholderTextColor="#a1a1aa"
          value={formData.email}
          onChangeText={(value) => handleChange("email", value)}
        />
  
        <TextInput
          className="p-4 bg-gray-800 text-white border-2 border-gray-700 w-full rounded-lg mb-5"
          placeholder="Password"
          placeholderTextColor="#a1a1aa"
          secureTextEntry
          value={formData.password}
          onChangeText={(value) => handleChange("password", value)}
        />
  
        <Pressable
          className={`w-full bg-indigo-600 py-4 rounded-lg ${
            loading ? "opacity-50" : ""
          }`}
          onPress={handleSignup}
          disabled={loading} // Disable button while loading
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text className="text-white text-center font-semibold">Sign up</Text>
          )}
        </Pressable>
  
        <Text className="text-gray-400 mt-5">
          Already have an account?{" "}
          <Link href="/admin/login" asChild>
            <Text className="underline font-bold text-indigo-400">Log in</Text>
          </Link>
        </Text>
      </View>
    );
  };
  
  export default AdminSignup;
  