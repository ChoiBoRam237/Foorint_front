import { StyleSheet } from "react-native";
import { colors } from "@/styles/colors";
import { fonts } from "@/styles/fonts";

/**
 * @brief 상대방이 쓴 채팅 스타일
 */

export const yourChatStyles = StyleSheet.create({
    container: {
        width: "100%",
        display: "flex",
        alignItems: "flex-start",
    },

    wrapper: {
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        columnGap: 12,
    },

    messageWrapper: {
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-end",
        columnGap: 4,
    },

    message: {
        width: "auto",
        height: "auto",
        padding: 12,
        backgroundColor: colors.thirdLight,
    },

    profile: {
        width: 40,
        height: 40,
        borderRadius: 50,
    },

    time: {
        fontFamily: fonts.PretendardRegular,
        fontSize: 10,
        color: colors.textPrimary,
    },

    messageText: {
        fontFamily: fonts.PretendardRegular,
        fontSize: 16,
        color: "black",
    },
});