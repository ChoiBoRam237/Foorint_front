import { StyleSheet } from "react-native";
import { colors } from "@/styles/colors";
import { fonts } from "@/styles/fonts";

/**
 * @brief 검색 리스트 스타일
 */

export const searchStyles = StyleSheet.create({
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

    innerWrapper: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        rowGap: 12,
    },

    search: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        columnGap: 4,
        borderRadius: 8,
        paddingVertical: 4,
        paddingHorizontal: 12,
        backgroundColor: "#B2EAFF",
    },

    searchInput: {
        flex: 1,
        fontFamily: fonts.PretendardRegular,
        fontSize: 14,
        color: "black",
    },
});