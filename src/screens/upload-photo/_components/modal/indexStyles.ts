import { StyleSheet } from "react-native";
import { colors } from "@/styles/colors";
import { fonts } from "@/styles/fonts";

/**
 * @brief 여행 장소 모달 컴포넌트
 */

export const placeModalStyles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        columnGap: 16,
        paddingHorizontal: 16,
        backgroundColor: colors.black30,
    },

    infoContainer: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        backgroundColor: "white",
    },

    image: {
        width: "100%",
        height: 278,
        backgroundColor: "black",
    },

    infoWrapper: {
        display: "flex",
        flexDirection: "column",
        rowGap: 8,
        padding: 8,
    },

    contentWrapper: {
        display: "flex",
        flexDirection: "column",
        rowGap: 6,
    },

    titleWrapper: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    title: {
        fontFamily: fonts.PretendardBold,
        fontSize: 16,
        color: "black",
    },

    category: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        columnGap: 3,
    },

    categoryCircle: {
        width: 6,
        height: 6,
        borderRadius: 50,
    },
    
    categoryName: {
        fontFamily: fonts.PretendardRegular,
        fontSize: 11,
        color: "black",
    },

    infoInnerWrapper: {
        display: "flex",
        flexDirection: "column",
        rowGap: 2,
    },

    placeInfo: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        columnGap: 6,
    },

    placeInfoText: {
        fontFamily: fonts.PretendardRegular,
        fontSize: 12,
        color: "black",
    },
    
    buttonWrapper: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        columnGap: 4,
    },

    buttonOutline: {
        width: 45,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: colors.thirdDark,
        borderRadius: 4,
        paddingVertical: 4,
    },

    buttonOutlineText: {
        fontFamily: fonts.PretendardBold,
        fontSize: 12,
        color: colors.thirdDark,
    },

    buttonFill: {
        width: 45,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 4,
        paddingVertical: 4,
        backgroundColor: colors.thirdDark,
    },

    buttonFillText: {
        fontFamily: fonts.PretendardBold,
        fontSize: 12,
        color: "white",
    },
});