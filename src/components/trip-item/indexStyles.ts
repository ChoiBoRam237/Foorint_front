import { StyleSheet } from "react-native";
import { colors } from "@/styles/colors";
import { fonts } from "@/styles/fonts";

/**
 * @brief 여행 아이템 컴포넌트
 */

export const tripItemStyles = StyleSheet.create({
    container: {
        flex: 1,
        width: "auto",
        height: "auto",
        display: "flex",
        flexDirection: "column",
        borderRadius: 8,
        backgroundColor: colors.thirdLight,
        overflow: "hidden",
    },

    image: {
        width: "100%",
        height: 104,
    },

    content: {
        display: "flex",
        flexDirection: "column",
        rowGap: 4,
        padding: 8,
    },

    titleWrapper: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    title: {
        fontFamily: fonts.PretendardBold,
        fontSize: 14,
        color: "black",
    },

    category: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        columnGap: 4,
    },

    categoryCircle: {
        width: 6,
        height: 6,
        borderRadius: 50,
    },

    categoryText: {
        fontFamily: fonts.PretendardRegular,
        fontSize: 10,
        color: "black",
    },

    description: {
        fontFamily: fonts.PretendardRegular,
        fontSize: 10,
        lineHeight: 12.5,
        color: "black",
    }
});