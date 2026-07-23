import { StyleSheet } from "react-native";
import { fonts } from "@/styles/fonts";
import { colors } from "@/styles/colors";

/**
 * @brief 여행 상세 화면 스타일
 */

export const detailStyles = StyleSheet.create({
    scrollContainer: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
    },

    infoContainer: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        rowGap: 4,
        padding: 16,
    },

    infoWrapper: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    title: {
        fontFamily: fonts.PretendardBold,
        fontSize: 20,
        color: "black",
    },

    info: {
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

    categoryName: {
        fontFamily: fonts.PretendardRegular,
        fontSize: 12,
        color: "black",
    },

    infoText: {
        fontFamily: fonts.PretendardRegular,
        fontSize: 13,
        color: "black",
    },

    imageWrapper: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        rowGap: 8,
    },

    image: {
        width: "100%",
        height: 412,
        backgroundColor: "white",
    },

    imagePagination: {
        display: "flex",
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        gap: 6,
    },

    imagePaginationDot: {
        width: 6,
        height: 6,
        borderRadius: 50,
        backgroundColor: colors.thirdLight,
    },

    contentWrapper: {
        width: "100%",
        padding: 16,
    },

    content: {
        fontFamily: fonts.PretendardRegular,
        fontSize: 16,
        color: "black",
    }
});