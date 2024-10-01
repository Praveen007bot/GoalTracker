import {
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import axios from "axios";
import { Link, useRouter } from "expo-router";
import { API_KEY } from "@/constants/Api";
import { useDispatch } from "react-redux";
import { setAuthUser } from "@/redux/userSlice";

const UserLogin = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
  });

  const handleChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
    setFormErrors({ ...formErrors, [name]: "" }); // Clear individual field error on input
  };

  const validateForm = () => {
    let valid = true;
    let errors = { email: "", password: "" };

    if (!formData.email) {
      errors.email = "Email is required.";
      valid = false;
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      errors.email = "Please enter a valid email.";
      valid = false;
    }

    if (!formData.password) {
      errors.password = "Password is required.";
      valid = false;
    } else if (formData.password.length < 4) {
      errors.password = "Password must be at least 4 characters long.";
      valid = false;
    }

    setFormErrors(errors);
    return valid;
  };

  const handleLogin = async () => {
    if (!validateForm()) return; // Stop if validation fails

    setLoading(true);
    setErrorMessage(""); // Reset error message
    try {
      const response = await axios.post(
        `${API_KEY}/api/v1/user/login`,
        formData,
        { withCredentials: true }
      );

      const setCookieHeader = response.headers["set-cookie"];
      if (setCookieHeader) {
        const token = setCookieHeader[0].split(";")[0].split("=")[1]; // Extract token from the first cookie
        await AsyncStorage.setItem("userToken", token); // Save token in AsyncStorage
        console.log("Token saved successfully:", token);
      }
      dispatch(setAuthUser(response.data?.user));

      router.push("/user/(tabs)/home");
    } catch (error) {
      console.error("Login failed:", error);
      setErrorMessage("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex items-center justify-center h-full bg-gray-900 px-6">
      <Text className="font-bold text-4xl text-white mb-10">Login</Text>

      {errorMessage ? (
        <Text className="text-red-500 mb-5">{errorMessage}</Text>
      ) : null}

      <TextInput
        className="p-4 bg-gray-800 text-white border-2 border-gray-700 w-full rounded-lg mb-2"
        placeholder="Email"
        placeholderTextColor="#a1a1aa"
        value={formData.email}
        onChangeText={(value) => handleChange("email", value)}
      />
      {formErrors.email ? (
        <Text className="text-red-500 mb-5">{formErrors.email}</Text>
      ) : null}

      <TextInput
        className="p-4 bg-gray-800 text-white border-2 border-gray-700 w-full rounded-lg mb-2"
        placeholder="Password"
        placeholderTextColor="#a1a1aa"
        secureTextEntry
        value={formData.password}
        onChangeText={(value) => handleChange("password", value)}
      />
      {formErrors.password ? (
        <Text className="text-red-500 mb-5">{formErrors.password}</Text>
      ) : null}

      <Pressable
        className={`w-full bg-indigo-600 py-4 rounded-lg ${
          loading ? "opacity-50" : ""
        }`}
        onPress={handleLogin}
        disabled={loading} // Disable button while loading
      >
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text className="text-white text-center font-semibold">Log in</Text>
        )}
      </Pressable>

      <Text className="text-gray-400 mt-5">
        Don't have an account?{" "}
        <Link href="/user/Signup" asChild>
          <Text className="underline font-bold text-indigo-400">Sign up</Text>
        </Link>
      </Text>
    </View>
  );
};

export default UserLogin;
