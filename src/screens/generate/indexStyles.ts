import { colors } from "@/styles/colors";
import { StyleSheet } from "react-native";

/**
 * @brief 발자국 등록 스타일
 */

export const generateStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary,
        overflow: "hidden",
    },

    wrapper: {
        flex: 1,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        rowGap: 20,
    }
});