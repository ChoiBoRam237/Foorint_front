import { StyleSheet } from "react-native";
import { fonts } from "@/styles/fonts";
import { colors } from "@/styles/colors";

/**
 * @brief 고객센터 채팅 리스트 스타일
 */

export const chatListStyles = StyleSheet.create({
    list: {
        flex: 1,
        paddingHorizontal: 16,
    },

    item: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        columnGap: 6,
        borderRadius: 8,
        paddingHorizontal: 8,
        paddingVertical: 10,
    },

    itemProfile: {
        width: 44,
        height: 44,
        borderRadius: 50,
    },

    itemInfo: {
        flex: 1,
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between",
        columnGap: 8,
    },

    itemLeft: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        rowGap: 3,
    },

    itemRight: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        rowGap: 6,
    },

    itemUserName: {
        fontFamily: fonts.PretendardSemiBold,
        fontSize: 14,
        color: "black",
    },

    itemLastMessage: {
        fontFamily: fonts.PretendardRegular,
        fontSize: 11,
        color: "black",
    },

    itemDate: {
        fontFamily: fonts.PretendardRegular,
        fontSize: 9,
        color: "black",
    },

    itemMessageCount: {
        width: 22,
        height: 22,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 50,
        backgroundColor: colors.thirdDark,
    },

    itemMessageCountText: {
        fontFamily: fonts.PretendardBold,
        fontSize: 10,
        color: "white",
    },
});