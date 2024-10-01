import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Provider } from "react-redux"; // Import Provider from react-redux
import store from "../redux/store"; // Import your Redux store

export default function RootLayout() {
  return (
    <Provider store={store}> 
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
        </Stack>
    </Provider>
  );
}
