import { StyleSheet } from "react-native";
import { colors } from "@/styles/colors";

/**
 * @brief 스플래시 스타일
 */

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.primary,
    },

    wrapper: {
        position: "relative",
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
    },

    title: {
        fontFamily: "Cloudsofa_namgim-Regular",
        fontSize: 60,
        color: colors.thirdDark,
        zIndex: 1,
    },

    cloudContainer: {
        position: "absolute",
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
    },

    cloudWrapper: {
        position: "relative",
        width: "100%",
        height: 844,
        justifyContent: "center",
        overflow: "hidden",
    }
});