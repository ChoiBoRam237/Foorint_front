import { StyleSheet } from "react-native";
import { colors } from "@/styles/colors";
import { fonts } from "@/styles/fonts";

/**
 * @brief 리스트 스타일
 */

export const listStyles = StyleSheet.create({
    wrapper: {
        flex: 1,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        rowGap: 16,
        paddingHorizontal: 16,
    },

    titleWrapper: {
        position: "relative",
    },

    title: {
        fontFamily: fonts.Griun,
        fontSize: 22,
        color: colors.textPrimary,
        zIndex: 1,
    },

    optionWrapper: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        rowGap: 16,
    },
});