import { StyleSheet } from "react-native";
import { colors } from "@/styles/colors";
import { fonts } from "@/styles/fonts";

/**
 * @brief 채팅 인풋 스타일
 */

export const chatInputStyles = StyleSheet.create({
    container: {
        width: "100%",
        padding: 16,
        backgroundColor: colors.primary,
    },

    input: {
        width: "100%",
        height: 48,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        columnGap: 4,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: colors.border,
        borderRadius: 50,
        paddingLeft: 20,
        paddingRight: 8,
    },

    inputText: {
        flex: 1,
        fontFamily: fonts.PretendardRegular,
        fontSize: 16,
        color: "black",
    },

    inputSubmit: {
        width: 36,
        height: 36,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 50,
        backgroundColor: colors.border,
    },
});