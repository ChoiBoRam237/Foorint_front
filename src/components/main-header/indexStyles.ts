import { colors } from "@/styles/colors";
import { StyleSheet } from "react-native";

/**
 * @brief 메인 헤더 컴포넌트 스타일
 */

export const mainHeaderStyles = StyleSheet.create({
    container: {
        position: "absolute",
        left: 0,
        width: "100%",
        height: 60,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 16,
        backgroundColor: colors.primary,
    },

    logoWrapper: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },

    logoImg: {
        marginBottom: -5,
        transform: [{ rotate: '-14deg' }],
    },

    logoTitle: {
        fontFamily: "Cloudsofa_namgim-Regular",
        fontSize: 20,
        color: colors.thirdDark,
    }
});