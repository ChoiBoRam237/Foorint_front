import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "../screens/splash";
import LoginScreen from "@/screens/login";
import GenerateScreen from "@/screens/generate";
import DetailScreen from "@/screens/detail";
import ListScreen from "@/screens/list";
import SearchScreen from "@/screens/search";
import MypageScreen from "@/screens/mypage";
import PlaceScreen from "@/screens/place";
import UploadPhotoScreen from "@/screens/upload-photo";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
    return (
        <Stack.Navigator
            initialRouteName="Splash"
            screenOptions={{ 
                headerShown: false,
                animation: 'none',
            }}
        >
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Generate" component={GenerateScreen} />
            <Stack.Screen name="Detail" component={DetailScreen} />
            <Stack.Screen name="List" component={ListScreen} />
            <Stack.Screen name="Search" component={SearchScreen} />

            {/* 마이페이지 */}
            <Stack.Screen name="Mypage" component={MypageScreen} />
            <Stack.Screen name="Place" component={PlaceScreen} />
            <Stack.Screen name="UploadPhoto" component={UploadPhotoScreen} />
        </Stack.Navigator>
    )
}