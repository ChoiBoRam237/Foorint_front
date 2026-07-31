import { colors } from "@/styles/colors";
import { fonts } from "@/styles/fonts";
import { StyleSheet } from "react-native";

/**
 * @brief 푸터 컴포넌트 스타일
 */

export const footerStyles = StyleSheet.create({
    container: {
        position: "absolute",
        left: 0,
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        paddingHorizontal: 35,
        paddingTop: 8,
        paddingBottom: 12,
        backgroundColor: colors.thirdLight,
    },

    wrapper: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        columnGap: 25,
    },

    item: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },

    itemText: {
        fontFamily: fonts.PretendardBold,
        fontSize: 10,
        color: "white",
    },

    plusButton: {
        width: 46,
        height: 46,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 50,
        backgroundColor: colors.thirdPrimary,
    },
});