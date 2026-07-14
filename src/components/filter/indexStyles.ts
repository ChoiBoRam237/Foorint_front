import { StyleSheet } from "react-native";
import { colors } from "@/styles/colors";
import { fonts } from "@/styles/fonts";

/**
 * @brief 필터 컴포넌트 스타일
 */

export const filterStyles = StyleSheet.create({
    container: {
        minWidth: 60,
        maxWidth: 120,
        alignSelf: "flex-start",
    },

    itemList: {
        width: "auto",
        height: "auto",
        alignSelf: 'flex-start',
        borderRadius: 6,
        padding: 4,
        marginTop: 4,
        marginLeft: -16,
        backgroundColor: colors.primary,
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowRadius: 8,
        shadowColor: "black",
        shadowOpacity: 0.2,
        elevation: 8,
    },

    item: {
        borderRadius: 4,
        paddingVertical: 4,
        paddingHorizontal: 8,
    },

    itemText: {
        fontFamily: fonts.PretendardRegular,
        fontSize: 12,
        color: colors.textPrimary,
    },

    activeText: {
        fontFamily: fonts.PretendardBold,
        fontSize: 12,
        color: colors.textPrimary,
    }
});