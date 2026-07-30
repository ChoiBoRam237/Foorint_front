import { StyleSheet } from "react-native";
import { colors } from "@/styles/colors";
import { fonts } from "@/styles/fonts";

/**
 * @brief 고객센터 채팅 스타일
 */

export const chatStyles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
    },

    dateWrapper: {
        width: "100%",
        display: "flex",
        alignItems: "center",
    },

    date: {
        width: "auto",
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 50,
        backgroundColor: colors.thirdLight,
    },

    dateText: {
        fontFamily: fonts.PretendardBold,
        fontSize: 12,
        color: colors.textSecond,
    }
});