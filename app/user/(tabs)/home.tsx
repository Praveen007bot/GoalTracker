import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const Home: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const windowWidth = Dimensions.get('window').width;
  const router = useRouter();

  return (
    <LinearGradient 
      colors={['#111827', '#1f2937']} // Dark gradient background to match goals page
      style={{ flex: 1, padding: 16 }}
    >
      <View className="flex-1 items-center justify-center">
        <Text className="text-3xl font-bold text-white mb-4 text-center">
          Welcome to Goal Tracker!
        </Text>
        <Text className="text-lg text-gray-400 text-center mb-6">
          Track your goals easily and stay motivated. Set your targets and achieve them one step at a time.
        </Text>

        <TouchableOpacity 
          className="bg-gray-700 rounded-lg px-6 py-3 shadow-lg mt-6" // Matching button style with shadow
          onPress={() => router.push('/user/goals')}
        >
          <Text className="text-white text-lg font-bold text-center">Get Started</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default Home;
