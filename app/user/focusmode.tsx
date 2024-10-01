import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";

const FocusMode = () => {
  const [time, setTime] = useState(0); // Time in seconds
  const [isPaused, setIsPaused] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [customTime, setCustomTime] = useState("");

  // Timer Countdown
  useEffect(() => {
    let interval: NodeJS.Timeout | number | null = null;

    if (isActive && !isPaused && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0 && isActive) {
      setIsActive(false);
      Alert.alert(
        "Focus time completed!",
        "Great job on completing your focus session!"
      );
    }

    return () => {
      if (interval !== null) {
        clearInterval(interval as NodeJS.Timeout);
      }
    };
  }, [isActive, isPaused, time]);

  // Convert seconds to mm:ss
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      remainingSeconds < 10 ? "0" : ""
    }${remainingSeconds}`;
  };

  // Start Timer
  const startTimer = (minutes: number) => {
    setTime(minutes * 60); // Convert minutes to seconds
    setIsActive(true);
    setIsPaused(false);
  };

  // Custom Time Handler
  const handleCustomTime = () => {
    const minutes = parseInt(customTime);
    if (!isNaN(minutes) && minutes > 0) {
      startTimer(minutes);
      setCustomTime(""); // Clear input after starting
    } else {
      Alert.alert("Invalid Input", "Please enter a valid number");
    }
  };

  return (
    <View className="flex-1 items-center justify-center bg-gray-900 p-6">
      <Text className="text-4xl font-bold text-white mb-10">Focus Mode</Text>

      {/* Display Timer */}
      <Text className="text-6xl font-extrabold text-white mb-8">
        {formatTime(time)}
      </Text>

      {/* Predefined Time Options */}
      <View className="flex-row justify-between mb-8 w-full max-w-xs">
        <TouchableOpacity
          className="bg-blue-600 p-4 rounded-lg"
          onPress={() => startTimer(15)}
        >
          <Text className="text-white">15 Min</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-blue-600 p-4 rounded-lg"
          onPress={() => startTimer(30)}
        >
          <Text className="text-white">30 Min</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-blue-600 p-4 rounded-lg"
          onPress={() => startTimer(60)}
        >
          <Text className="text-white">1 Hr</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-blue-600 p-4 rounded-lg"
          onPress={() => startTimer(120)}
        >
          <Text className="text-white">2 Hr</Text>
        </TouchableOpacity>
      </View>

      {/* Custom Time Input */}
      <View className="flex-row items-center mb-10">
        <TextInput
          className="p-3 border-2 border-white rounded-lg text-white w-[60%]"
          placeholder="Custom time (min)"
          placeholderTextColor="rgba(255, 255, 255, 0.7)"
          value={customTime}
          onChangeText={setCustomTime}
          keyboardType="numeric"
        />
        <TouchableOpacity
          className="ml-4 bg-blue-600 p-4 rounded-lg"
          onPress={handleCustomTime}
        >
          <Text className="text-white">Start</Text>
        </TouchableOpacity>
      </View>

      {/* Control Buttons */}
      <View className="flex-row justify-between w-full max-w-xs">
        <TouchableOpacity
          className="bg-red-600 p-4 rounded-lg mx-2"
          onPress={() => setIsPaused(!isPaused)}
        >
          <Text className="text-white">{isPaused ? "Resume" : "Pause"}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-red-600 p-4 rounded-lg mx-2"
          onPress={() => {
            setIsActive(false);
            setTime(0);
          }}
        >
          <Text className="text-white">Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FocusMode;
