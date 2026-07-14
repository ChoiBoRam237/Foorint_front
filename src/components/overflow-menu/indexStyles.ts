import { StyleSheet } from "react-native";
import { colors } from "@/styles/colors";
import { fonts } from "@/styles/fonts";

/**
 * @brief overflow menu 스타일
 */

export const overflowMenuStyles = StyleSheet.create({
    container: {
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 20,
    },

    wrapper: {
        position: "relative",
    },

    outsideOverlay: {
        position: "absolute",
        top: 0,
        left: 0,
        backgroundColor: "transparent",
    },

    menuContainer: {
        position: "absolute",
        top: 48,
        right: 12,
        width: "auto",
        height: "auto",
        display: "flex",
        flexDirection: "column",
        borderRadius: 6,
        padding: 4,
        backgroundColor: colors.primary,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowRadius: 6,
        shadowColor: "black",
        shadowOpacity: 0.2,
        elevation: 6,
    },

    menuItem: {
        width: "auto",
        height: "auto",
        borderRadius: 4,
        paddingVertical: 8,
        paddingHorizontal: 22,
    },

    activeMenuItem: {
        backgroundColor: colors.thirdLight,
    },

    menuText: {
        fontFamily: fonts.PretendardRegular,
        fontSize: 14,
    }
});