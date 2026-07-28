import { SafeAreaView } from "react-native-safe-area-context"
import { commonStyles } from "@/styles/common"
import { loadingStyles } from "./indexStyles"
import { ActivityIndicator, ViewStyle } from "react-native";

/**
 * @brief 로딩 컴포넌트
 */

interface Props {
    style?: ViewStyle;
}

export const LoadingComponent = (props: Props) => {
    return (
        <SafeAreaView
            style={[
                commonStyles.container,
                loadingStyles.container,
                props.style,
            ]}
        >
            <ActivityIndicator size="large" color="white" />
        </SafeAreaView>
    )
}