import { Link } from "expo-router";
import {
  Pressable,
  Text,
  Touchable,
  TouchableHighlight,
  View,
} from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text className="text-2xl font-bold">Choose Role</Text>
      <Link href="/admin/login" asChild>
        <Pressable>
          <Text className="px-4 py-2 bg-blue-400 text-white font-bold text-xl mt-4">
            Admin
          </Text>
        </Pressable>
      </Link>
      <Link href='/user/login' asChild>
        <Pressable>
          <Text className="px-4 py-2 bg-blue-400 text-white font-bold text-xl mt-4">
            User
          </Text>
        </Pressable>
      </Link>
    </View>
  );
}
