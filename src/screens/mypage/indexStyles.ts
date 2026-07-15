import { StyleSheet } from "react-native";
import { colors } from "@/styles/colors";
import { fonts } from "@/styles/fonts";

/**
 * @brief 마이페이지 스타일
 */

export const mypageStyles = StyleSheet.create({
    wrapper: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        rowGap: 30,
        paddingHorizontal: 16,
    },

    // 프로필
    profileWrapper: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        rowGap: 16,
    },

    profileImg: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: "white"
    },

    profileInfo: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },

    profileInfoName: {
        fontFamily: fonts.PretendardBold,
        fontSize: 20,
        color: "black",
    },

    profileInfoEmail: {
        fontFamily: fonts.PretendardRegular,
        fontSize: 14,
        color: "black",
    },

    innerWrapper: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        rowGap: 20,
    },

    // 내 여행 통계
    statisticsWrapper: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        rowGap: 8,
    },

    statisticsTitle: {
        fontFamily: fonts.PretendardSemiBold,
        fontSize: 14,
        color: colors.textSecond
    },

    statisticsList: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        columnGap: 12,
    },

    statisticsItem: {
        position: "relative",
        flex: 3,
        height: 141,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        rowGap: 12,
        borderRadius: 12,
        backgroundColor: colors.thirdLight,
    },

    statisticsItemTitle: {
        fontFamily: fonts.PretendardRegular,
        fontSize: 12,
        color: colors.textPrimary,
    },

    statisticsItemNumber: {
        fontFamily: fonts.PretendardBold,
        fontSize: 20,
        color: colors.textPrimary,
    },

    statisticsItemArrow: {
        position: "absolute",
        top: 8,
        right: 4,
    },

    statisticsItemIcon: {
        transform: [{ rotate: '30deg' }],
    },

    // 고객센터, 버전, 로그아웃, 계정 탈퇴
    box: {
        width: "100%",
        height: "auto",
        display: "flex",
        flexDirection: "column",
        rowGap: 8,
        borderRadius: 12,
        padding: 8,
        backgroundColor: colors.thirdLight,
    },

    boxItem: {
        width: "100%",
        height: "auto",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 12,
    },

    boxTextWrapper: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        columnGap: 12,
    },

    boxText: {
        fontFamily: fonts.PretendardRegular,
        fontSize: 16,
        color: colors.textPrimary,
    },
});