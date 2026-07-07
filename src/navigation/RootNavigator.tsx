import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "../screens/splash";
import MainNavigator from "./MainNavigator";
import LoginScreen from "@/screens/login";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
    return (
        <Stack.Navigator
            initialRouteName="Splash"
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            {/* <Stack.Screen name="Main" component={MainNavigator} /> */}
        </Stack.Navigator>
    )
}