import { StyleSheet } from "react-native";
import { colors } from "@/styles/colors";
import { fonts } from "@/styles/fonts";

/**
 * @brief 홈화면 스타일
 */

export const homeStyles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        rowGap: 16,
        paddingHorizontal: 16,
    },

    titleWrapper: {
        position: "relative",
    },

    title: {
        fontFamily: fonts.Griun,
        fontSize: 22,
        color: colors.textPrimary,
        zIndex: 1,
    },
});

export const calendarStyles = StyleSheet.create({
    calendarContainer: {
        width: "100%",
        borderRadius: 15,
        paddingTop: 16,
        paddingBottom: 16,
    },

    headerWrapper: {
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-end",
        columnGap: 4,
    },

    headerMonth: {
        fontFamily: fonts.Cloudsofa,
        fontSize: 36,
        color: "white",
    },

    headerYear: {
        fontFamily: fonts.Griun,
        fontSize: 18,
        color: "white",
        marginBottom: 2,
    },

    dayWrapper: {
        width: 40,
        height: 55,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        rowGap: 4,
    },

    dayText: {
        fontFamily: fonts.PretendardRegular,
        fontSize: 16,
        color: "white",
    },

    foorintWrapper: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },

    foorintIcon: {
        transform: [{ rotate: '10deg' }],
    },

    foorintText: {
        fontFamily: fonts.PretendardMedium,
        fontSize: 12,
        marginLeft: -4,
    }
});