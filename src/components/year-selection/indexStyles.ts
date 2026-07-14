import { StyleSheet } from "react-native";
import { colors } from "@/styles/colors";
import { fonts } from "@/styles/fonts";

/**
 * @brief 년도 선택 컴포넌트 스타일
 */

export const yearSelectionStyles = StyleSheet.create({
    container: {
        display: "flex",
        alignItems: "center",
        columnGap: 8,
    },

    selection: {
        width: "auto",
        height: 28,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: colors.thirdDark,
        borderRadius: 8,
        paddingHorizontal: 12,
    },

    selectionText: {
        fontFamily: fonts.PretendardRegular,
        fontSize: 16,
        color: colors.textPrimary,
    },

    activeSelection: {
        borderWidth: 0,
        backgroundColor: colors.thirdDark,
    },

    activeSelectionText: {
        fontFamily: fonts.PretendardBold,
        color: "white",
    },
});