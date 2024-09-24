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

const UserSignup = () => {
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
        `${API_KEY}/api/v1/user/register`,
        formData,
        { withCredentials: true }
      );
      router.push("/user/login");
    } catch (error) {
      console.error("Signup failed:", error);
      setErrorMessage("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex items-center justify-center mt-32">
      <Text className="font-bold text-4xl mb-10">Signup</Text>

      {errorMessage ? (
        <Text className="text-red-500 mb-5">{errorMessage}</Text>
      ) : null}

      <TextInput
        className="p-3 border-2 border-black w-[80%] rounded-lg"
        placeholder="Username"
        value={formData.username}
        onChangeText={(value) => handleChange("username", value)}
      />

      <TextInput
        className="p-3 border-2 border-black w-[80%] mt-5 rounded-lg"
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
        className="mt-10 w-[80%] bg-black py-4 rounded-lg"
        onPress={handleSignup}
        disabled={loading} // Disable button while loading
      >
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text className="text-white font-medium mx-auto">Log in</Text>
        )}
      </Pressable>

      <Text className="mt-5">
        Already have an account?{" "}
        <Link href="/user/login" asChild>
          <Text className="underline font-bold">Log in</Text>
        </Link>
      </Text>
    </View>
  );
};

export default UserSignup;
