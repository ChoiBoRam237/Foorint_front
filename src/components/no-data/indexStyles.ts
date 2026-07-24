import { StyleSheet } from "react-native";
import { colors } from "@/styles/colors";
import { fonts } from "@/styles/fonts";

/**
 * @brief 데이터 없음 컴포넌트 스타일
 */

export const noDataStyles = StyleSheet.create({
    container: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },

    text: {
        fontFamily: fonts.PretendardSemiBold,
        fontSize: 16,
        color: colors.thirdDark,
        textAlign: "center",
    }
});