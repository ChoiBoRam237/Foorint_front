import { StyleSheet } from "react-native";

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
        height: 130,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "black",
        backgroundColor: "white",
    }
});