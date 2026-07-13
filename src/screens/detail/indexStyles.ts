import { fonts } from "@/styles/fonts";
import { StyleSheet } from "react-native";

/**
 * @brief 여행 상세 화면 스타일
 */

export const detailStyles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        display: "flex",
        flexDirection: "column",
    },

    infoContainer: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        rowGap: 4,
    },

    infoWrapper: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    title: {
        fontFamily: fonts.PretendardSemiBold,
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
        width: 4,
        height: 4,
        borderRadius: 50,
    },

    categoryName: {
        fontSize: 11,
        color: "black",
    },

    infoText: {
        fontSize: 12,
        color: "black",
    },

    imageWrapper: {
        width: "100%",
        position: "relative"
    },

    image: {
        width: "100%",
        height: 412,
    },

    imagePagination: {
        position: "absolute",
        left: 0,
        bottom: 8,
        display: "flex",
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        gap: 6,
    },

    contentWrapper: {
        width: "100%",
        padding: 16,
    },

    content: {
        fontSize: 16,
        color: "black",
    }
});