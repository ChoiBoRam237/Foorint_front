import { StyleSheet } from "react-native";
import { colors } from "@/styles/colors";
import { fonts } from "@/styles/fonts";

/**
 * @brief 홈화면 바텀 시트 스타일
 */

export const bottomSheetStyles = StyleSheet.create({
    modalContainer: {
        position: "relative",
        flex: 1,
        display: "flex",
        flexDirection: "column",
        paddingHorizontal: 16,
    },

    titleWrapper: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        columnGap: 4,
        marginBottom: 12,
    },

    text: {
        fontFamily: fonts.MontserratBold,
        fontSize: 24,
        color: colors.textSecond,
    },

    item: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: 4,
        paddingVertical: 12,
        paddingHorizontal: 8,
    },

    itemTitleWrapper: {
        display: "flex",
        flexDirection: "column",
        rowGap: 2,
    },

    itemTitle: {
        fontFamily: fonts.PretendardBold,
        fontSize: 18,
        color: colors.textSecond,
    },

    itemDate: {
        fontFamily: fonts.PretendardRegular,
        fontSize: 10,
        color: colors.textSecond,
    },

    itemCategory: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        columnGap: 4,
    },

    itemCategoryCircle: {
        width: 6,
        height: 6,
        borderRadius: 50
    },

    itemCategoryName: {
        fontFamily: fonts.PretendardRegular,
        fontSize: 13,
        color: colors.textSecond,
    },

    plusButton: {
        position: "absolute",
        right: 16,
        width: 44,
        height: 44,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 50,
        padding: 10,
        backgroundColor: colors.textSecond,
        zIndex: 1,
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowRadius: 8,
        shadowColor: "black",
        shadowOpacity: 0.3,
        elevation: 8,
    },
});