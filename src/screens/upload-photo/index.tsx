import { FlatList, Image, Pressable, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { commonStyles } from "@/styles/common";
import { ArrowHeaderComponent } from "@/components/arrow-header";
import { YearSelectionComponent } from "@/components/year-selection";
import { useControlUploadPhoto } from "./index.control";
import { uploadPhotoStyles } from "./indexStyles";
import { UploadPhotoModal } from "./_components/modal";

/**
 * @brief 업로드한 사진
 */

const data = [
    { code: 1, imgUrl: "" },
    { code: 2, imgUrl: "" },
    { code: 3, imgUrl: "" },
];

const content = {
    code: 1,
    title: "처음으로 빠지에 가다.",
    category: {
        code: 1,
        color: "#FF0000",
        name: "국내 여행"
    },
    location: "경기도 가평시",
    startDate: new Date(2026, 7, 17),
    endDate: new Date(2026, 7, 19),
    description: "친구들과 가평 빠지에 놀러갔다.",
    imgUrl: "",
}

export default function UploadPhotoScreen() {
    const insets = useSafeAreaInsets();
    const controller = useControlUploadPhoto();

    return (
        <SafeAreaView style={commonStyles.container}>
            <ArrowHeaderComponent title="업로드한 사진" />

            <View
                style={[
                    uploadPhotoStyles.container,
                    {
                        paddingTop: insets.top + 60 + 24,
                        paddingBottom: insets.bottom + 16,
                    }
                ]}
            >
                <View style={{ width: "100%" }}>
                    <YearSelectionComponent
                        yearList={controller.yearList}
                        value={controller.selectedYear}
                        setValue={controller.setSelectedYear}
                    />
                </View>

                <FlatList
                    key={"3"}
                    style={{ flex: 1 }}
                    keyExtractor={item => item.code.toString()}
                    data={data}
                    numColumns={3}
                    renderItem={({ item }) => (
                        <Pressable
                            style={{ flex: 3 }}
                            onPress={() => controller.setModalOpen(true)}
                        >
                            <Image
                                style={uploadPhotoStyles.image}
                            />
                        </Pressable>
                    )}
                />
            </View>

            <UploadPhotoModal
                open={controller.modalOpen}
                setOpen={controller.setModalOpen}
                data={content}
            />
        </SafeAreaView>
    )
}