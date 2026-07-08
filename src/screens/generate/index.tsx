import { SafeAreaView } from "react-native-safe-area-context";
import { MainHeader } from "@/components/main-header";
import { generateStyles } from "./indexStyles";
import { ScrollView } from "react-native";

/**
 * @brief 발자국 등록
 */

export const GenerateScreen = () => {
    return (
        <SafeAreaView style={generateStyles.container}>
            <MainHeader />

            <ScrollView>

            </ScrollView>
        </SafeAreaView>
    )
}