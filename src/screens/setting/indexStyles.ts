import { colors } from "@/styles/colors";
import { fonts } from "@/styles/fonts";
import { StyleSheet } from "react-native";

/**
 * @brief 설정 스타일
 */

export const settingStyles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: 20,
        paddingHorizontal: 16,
    },

    item: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    itemText: {
        fontFamily: fonts.PretendardRegular,
        fontSize: 16,
        color: colors.textPrimary,
    },

    track: {
        width: 50,
        height: 29,
        display: "flex",
        justifyContent: "center",
        borderRadius: 50,
        padding: 3,
        backgroundColor: colors.thirdLight,
    },

    thumb: {
        width: 23,
        height: 23,
        borderRadius: 50,
        backgroundColor: "white",
    },
});