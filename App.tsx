import { SafeAreaProvider } from "react-native-safe-area-context"
import { NavigationContainer } from "@react-navigation/native"
import { QueryClientProvider } from "@tanstack/react-query"
import RootNavigator from "@/navigation/RootNavigator"
import { AxiosComponent } from "@/hooks/useAxiosPrivate"
import { queryClient } from "./queryClient"

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <SafeAreaProvider>
                <NavigationContainer>
                    <AxiosComponent />
                    <RootNavigator />
                </NavigationContainer>
            </SafeAreaProvider>
        </QueryClientProvider>
    )
}
