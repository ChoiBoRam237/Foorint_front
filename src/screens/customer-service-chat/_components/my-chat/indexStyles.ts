import { StyleSheet } from "react-native";
import { colors } from "@/styles/colors";
import { fonts } from "@/styles/fonts";

/**
 * @brief 내가 쓴 채팅 스타일
 */

export const myChatStyles = StyleSheet.create({
    container: {
        width: "100%",
        display: "flex",
        alignItems: "flex-end",
    },

    showTimeContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-end",
        columnGap: 4,
    },

    time: {
        fontFamily: fonts.PretendardRegular,
        fontSize: 10,
        color: colors.textPrimary,
    },

    unShowTimeMessage: {
        width: "auto",
        height: "auto",
        borderRadius: 11,
        padding: 12,
        backgroundColor: colors.thirdLight,
        marginBottom: -20,
    },

    showTimeMessage: {
        width: "auto",
        maxWidth: "85%",
        height: "auto",
        borderTopLeftRadius: 11,
        borderTopRightRadius: 11,
        borderBottomLeftRadius: 11,
        padding: 12,
        backgroundColor: colors.thirdLight,
    },

    messageText: {
        fontFamily: fonts.PretendardRegular,
        fontSize: 16,
        color: "black",
    },
});