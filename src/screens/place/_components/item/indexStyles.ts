import { StyleSheet } from "react-native";
import { colors } from "@/styles/colors";
import { fonts } from "@/styles/fonts";

/**
 * @brief 여행 장소 아이템 스타일
 */

export const placeItemStyles = StyleSheet.create({
    container: {
        width: "100%",
        height: "auto",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 12,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: colors.borderActive,
        borderRadius: 8,
    },

    wrapper: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        columnGap: 6
    },

    placeName: {
        fontFamily: fonts.PretendardMedium,
        fontSize: 16,
        color: "black",
    },

    placeNumber: {
        fontFamily: fonts.PretendardRegular,
        fontSize: 12,
        color: colors.textPrimary,
    }
});