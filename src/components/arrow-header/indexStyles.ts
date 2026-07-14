import { StyleSheet } from "react-native";
import { colors } from "@/styles/colors";
import { fonts } from "@/styles/fonts";

/**
 * @brief 화살표 헤더 컴포넌트 스타일
 */

export const arrowHeaderStyles = StyleSheet.create({
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
        borderBottomWidth: 1,
        borderStyle: "solid",
        borderBottomColor: colors.thirdDark,
        backgroundColor: colors.primary,
        zIndex: 10,
    },

    wrapper: {
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },

    title: {
        position: "absolute",
        fontFamily: fonts.PretendardBold,
        fontSize: 20,
        color: colors.textSecond,
    },

    dots: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },

    dot: {
        marginRight: -6,
    },
});