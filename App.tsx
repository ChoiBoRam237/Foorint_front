import { LogBox } from 'react-native'
import { SafeAreaProvider } from "react-native-safe-area-context"
import { NavigationContainer } from "@react-navigation/native"
import { QueryClientProvider } from "@tanstack/react-query"
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import RootNavigator from "@/navigation/RootNavigator"
import { AxiosComponent } from "@/hooks/useAxiosPrivate"
import { queryClient } from "./queryClient"

LogBox.ignoreAllLogs();

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <SafeAreaProvider>
                    <NavigationContainer>
                        <AxiosComponent />
                        <RootNavigator />
                    </NavigationContainer>
                </SafeAreaProvider>
            </GestureHandlerRootView>
        </QueryClientProvider>
    )
}
