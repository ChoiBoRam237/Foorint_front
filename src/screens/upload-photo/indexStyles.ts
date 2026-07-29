import { StyleSheet } from "react-native";
import { colors } from "@/styles/colors";
import { fonts } from "@/styles/fonts";

/**
 * @brief 업로드한 사진 스타일
 */

export const uploadPhotoStyles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        rowGap: 20,
        paddingHorizontal: 16,
    },

    image: {
        width: "100%",
        height: 130,
    },

    noData: {
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },

    noDataText: {
        fontFamily: fonts.PretendardMedium,
        fontSize: 16,
        color: colors.textPrimary,
    },
});