import { StyleSheet } from "react-native";
import { fonts } from "@/styles/fonts";

/**
 * @brief 마이페이지 바텀 시트 스타일
 */


export const bottomSheetStyles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        rowGap: 20,
        paddingBottom: 30,
        paddingHorizontal: 16,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        backgroundColor: "white",
    },

    close: {
        width: "100%",
        display: "flex",
        alignItems: "flex-end",
    },

    wrapper: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        rowGap: 30,
    },

    title: {
        fontFamily: fonts.PretendardBold,
        fontSize: 24,
        color: "black"
    },

    list: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        rowGap: 12,
    },

    item: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: 16,
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: "#F2F8FC",
    },

    itemTextWrapper: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        columnGap: 12,
    },

    itemIcon: {
        width: 40,
        height: 40,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 50,
        backgroundColor: "#A4ADB2",
    },

    itemText: {
        fontFamily: fonts.PretendardBold,
        fontSize: 16,
        color: "black"
    },
});