import { StyleSheet } from "react-native";
import { colors } from "@/styles/colors";
import { fonts } from "@/styles/fonts";

/**
 * @brief 여행 장소 스타일
 */

export const placeStyles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        rowGap: 20,
        paddingHorizontal: 16,
    },

    placeItemContainer: {
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

    placeItemWrapper: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        columnGap: 6
    },

    placeItemName: {
        fontFamily: fonts.PretendardMedium,
        fontSize: 16,
        color: "black",
    },

    placeItemNumber: {
        fontFamily: fonts.PretendardRegular,
        fontSize: 12,
        color: colors.textPrimary,
    }
});