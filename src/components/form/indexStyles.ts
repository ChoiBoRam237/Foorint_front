import { StyleSheet } from "react-native";
import { colors } from "@/styles/colors";

export const formStyles = StyleSheet.create({
    container: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        rowGap: 48,
        paddingHorizontal: 16,
    },

    wrapper: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        rowGap: 20,
    },

    titleWrapper: {
        position: "relative",
    },

    titleInnerWrapper: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        columnGap: 8,
        zIndex: 1
    },

    title: {
        fontFamily: "Griun_Cocochoitoon-Rg",
        fontSize: 22,
        color: colors.textPrimary,
    },

    focusedInput: {
        borderColor: colors.borderActive,
    },

    icon: {
        transform: [{ rotate: '30deg' }],
    },

    itemContainer: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        rowGap: 16,
    },

    itemWrapper: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        rowGap: 8,
    },

    itemTitleWrapper: {
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-end",
        columnGap: 4,
    },

    itemTitle: {
        fontFamily: "Pretendard-SemiBold",
        fontSize: 16,
        color: colors.textPrimary,
    },

    itemSubTitle: {
        fontFamily: "Pretendard-SemiBold",
        fontSize: 11,
        color: colors.textPrimary,
        marginBottom: 2,
    },

    imageUpload: {
        width: "100%",
        height: 241,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        rowGap: 4,
        backgroundColor: "#B9E9FC",
    },

    imageUploadTitle: {
        fontFamily: "Pretendard-SemiBold",
        fontSize: 16,
        color: colors.textPrimary,
    },

    imageItemWrapper: {
        flex: 1,
        position: "relative",
    },

    imageItem: {
        flex: 1,
        height: 241,
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

    input: {
        width: "100%",
        height: "auto",
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: colors.border,
        borderRadius: 8,
        padding: 12,

        fontSize: 16,
        color: "black",
    },

    calendarWrapper: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        columnGap: 8,
    },

    calendar: {
        flex: 2,
    },

    calendarSelection: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: colors.border,
        borderRadius: 8,
        padding: 12,
    },

    calendarPlaceholder: {
        fontSize: 16,
        color: colors.placeholder,
    },

    calendarText: {
        fontSize: 16,
        color: "black",
    },

    categoryWrapper: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        rowGap: 12,
    },

    dropdownContainer: {
        width: "100%",
        height: "auto",
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: colors.border,
        borderRadius: 8,
        padding: 12,
    },

    dropdown: {
        display: "flex",
        flexDirection: "column",
        rowGap: 8,
        borderRadius: 8,
        padding: 8,
        backgroundColor: colors.primary,
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowRadius: 8,
        shadowColor: "black",
        shadowOpacity: 0.2,
        elevation: 6,
    },

    dropdownItem: {
        flex: 1,
        borderRadius: 4,
        paddingVertical: 8,
        paddingHorizontal: 12,
        overflow: "hidden",
    },

    dropdownPlaceholder: {
        fontSize: 16,
        color: colors.placeholder,
    },

    dropdownLabel: {
        fontSize: 16,
        color: "black",
    },

    categoryAddTextWrapper: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        columnGap: 4,
    },

    categoryAddText: {
        fontSize: 14,
        color: colors.textPrimary,
    },

    categoryAddWrapper: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        columnGap: 4,
    },

    categoryAddButton: {
        width: "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
        paddingHorizontal: 14,
        backgroundColor: colors.border,
    },

    textarea: {
        width: "100%",
        height: 220,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: colors.border,
        borderRadius: 8,
        paddingVertical: 14,
        paddingHorizontal: 12,
        textAlignVertical: "top",

        fontSize: 16,
        color: "black",
    },

    saveButton: {
        width: "100%",
        height: "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        padding: 16,
        backgroundColor: colors.thirdLight,
    },

    buttonText: {
        fontFamily: "Pretendard-SemiBold",
        fontSize: 14,
        color: colors.textPrimary
    }
});