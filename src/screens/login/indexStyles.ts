import { StyleSheet } from "react-native";
import { colors } from "@/styles/colors";
import { fonts } from "@/styles/fonts";

/**
 * @brief 로그인 스타일
 */

export const loginStyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.primary,
    },

    wrapper: {
        position: "relative",
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
    },

    titleWrapper: {
        flexDirection: "column",
        alignItems: "center",
        rowGap: 4,
    },

    title: {
        fontFamily: fonts.Cloudsofa,
        fontSize: 60,
        color: colors.thirdDark,
        zIndex: 1,
    },

    subTitle: {
        fontFamily: fonts.Griun,
        fontSize: 20,
        color: colors.thirdDark,
        zIndex: 1,
    },

    cloudContainer: {
        position: "absolute",
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
    },

    cloudWrapper: {
        position: "relative",
        width: "100%",
        height: 844,
        justifyContent: "center",
        overflow: "hidden",
    },

    buttonWrapper: {
        position: "absolute",
        bottom: 20,
        width: "100%",
        flexDirection: "column",
        alignItems: "center",
        rowGap: 15,
        padding: 16,
    },

    googleButton: {
        width: "100%",
        height: "auto",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        columnGap: 8,
        padding: 14,
        borderRadius: 10,
        backgroundColor: "white",
    },

    kakaoButton: {
        width: "100%",
        height: "auto",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        columnGap: 8,
        padding: 14,
        borderRadius: 10,
        backgroundColor: colors.yellow,
    },
    
    buttonText: {
        fontSize: 16,
        color: "black",
    }
});