import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "../screens/splash";
import LoginScreen from "@/screens/login";
import GenerateScreen from "@/screens/generate";
import DetailScreen from "@/screens/detail";
import ListScreen from "@/screens/list";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
    return (
        <Stack.Navigator
            initialRouteName="Splash"
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Generate" component={GenerateScreen} />
            <Stack.Screen name="Detail" component={DetailScreen} />
            <Stack.Screen name="List" component={ListScreen} />
        </Stack.Navigator>
    )
}