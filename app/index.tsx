import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

export default function Index() {
  return (
    <LinearGradient
      colors={['#000428', '#004e92']} // Your gradient colors
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    >
      <Text className="text-3xl font-bold text-white mb-8">Choose Role</Text>
      <Link href="/admin/login" asChild>
        <Pressable className="w-full max-w-xs">
          <Text className="w-full text-center px-6 py-3 bg-blue-500 text-white font-bold text-xl rounded-lg shadow-lg mb-4 hover:bg-blue-600">
            Admin
          </Text>
        </Pressable>
      </Link>
      <Link href="/user/login" asChild>
        <Pressable className="w-full max-w-xs">
          <Text className="w-full text-center px-6 py-3 bg-green-500 text-white font-bold text-xl rounded-lg shadow-lg hover:bg-green-600">
            User
          </Text>
        </Pressable>
      </Link>
    </LinearGradient>
  );
}
