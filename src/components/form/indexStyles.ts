import { StyleSheet } from "react-native";
import { colors } from "@/styles/colors";
import { fonts } from "@/styles/fonts";

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
        fontFamily: fonts.Griun,
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
        fontFamily: fonts.PretendardSemiBold,
        fontSize: 16,
        color: colors.textPrimary,
    },

    itemSubTitle: {
        fontFamily: fonts.PretendardSemiBold,
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
        fontFamily: fonts.PretendardSemiBold,
        fontSize: 16,
        color: colors.textPrimary,
    },

    imageItem: {
        width: "100%",
        height: 241,
    },

    imagePagination: {
        display: "flex",
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        gap: 6,
    },

    imagePaginationDot: {
        width: 6,
        height: 6,
        borderRadius: 50,
        backgroundColor: colors.thirdLight,
    },

    input: {
        width: "100%",
        height: "auto",
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: colors.border,
        borderRadius: 8,
        padding: 12,

        fontFamily: fonts.PretendardRegular,
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
        fontFamily: fonts.PretendardRegular,
        fontSize: 16,
        color: colors.placeholder,
    },

    calendarText: {
        fontFamily: fonts.PretendardRegular,
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
        elevation: 8,
    },

    dropdownItem: {
        flex: 1,
        borderRadius: 4,
        paddingVertical: 8,
        paddingHorizontal: 12,
        overflow: "hidden",
    },

    dropdownPlaceholder: {
        fontFamily: fonts.PretendardRegular,
        fontSize: 16,
        color: colors.placeholder,
    },

    dropdownLabel: {
        fontFamily: fonts.PretendardRegular,
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
        fontFamily: fonts.PretendardRegular,
        fontSize: 14,
        color: colors.textPrimary,
    },

    categoryAddWrapper: {
        position: "relative",
        flex: 1,
        width: "100%",
        display: "flex",
        flexDirection: "row",
        columnGap: 4,
    },

    categoryColorPicker: {
        width: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: colors.border,
        borderRadius: 8,
        padding: 4,
    },

    categoryColor: {
        flex: 1,
        width: "100%",
        borderRadius: 8,
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

        fontFamily: fonts.PretendardRegular,
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
        fontFamily: fonts.PretendardSemiBold,
        fontSize: 14,
        color: colors.textPrimary
    }
});

export const colorPickerStyles = StyleSheet.create({
    colorPickerWrapper: {
        position: "absolute",
        top: "100%",
        left: 0,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        rowGap: 16,
        borderRadius: 8,
        padding: 16,
        marginTop: 8,
        backgroundColor: "white",
        zIndex: 1,
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },

    colorPicker: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        rowGap: 16,
    },

    panel: {
        borderRadius: 8,
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },

    slider: {
        borderRadius: 50,
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },

    previewTxt: {
        fontFamily: fonts.PretendardSemiBold,
        fontSize: 16,
        color: "#7A7A7A",
    },

    hr: {
        width: "100%",
        height: 1,
        backgroundColor: "#CECECE"
    },

    okWrapper: {
        width: "100%",
        display: "flex",
        alignItems: "flex-end",
    },

    okButton: {
        borderRadius: 4,
        paddingHorizontal: 8,
        paddingVertical: 4,
        backgroundColor: colors.border,
    },

    okText: {
        fontFamily: fonts.PretendardBold,
        fontSize: 14,
        color: colors.textPrimary,
    },
});