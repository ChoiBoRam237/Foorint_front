import { SafeAreaView } from "react-native-safe-area-context"
import { commonStyles } from "@/styles/common"
import { loadingStyles } from "./indexStyles"
import { ActivityIndicator } from "react-native";

/**
 * @brief 로딩 컴포넌트
 */

export const LoadingComponent = () => {
    return (
        <SafeAreaView
            style={[
                commonStyles.container,
                loadingStyles.container,
            ]}
        >
            <ActivityIndicator size="large" color="white" />
        </SafeAreaView>
    )
}