import { Dimensions, FlatList, Image, Pressable, Text, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { BASE_URL } from "@env";
import { commonStyles } from "@/styles/common";
import { ArrowHeaderComponent } from "@/components/arrow-header";
import { YearSelectionComponent } from "@/components/year-selection";
import { LoadingComponent } from "@/components/loading";
import { UploadPhotoModal } from "./_components/modal";
import { useControlUploadPhoto } from "./index.control";
import { uploadPhotoStyles } from "./indexStyles";

/**
 * @brief 업로드한 사진
 */

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
                        paddingTop: insets.top + 60,
                        paddingBottom: insets.bottom + 16,
                    }
                ]}
            >
                <View style={{ width: "100%" }}>
                    <YearSelectionComponent
                        value={controller.selectedYear}
                        setValue={controller.setSelectedYear}
                    />
                </View>

                {!controller.isLoading ? (
                    <>
                        {controller.imageList.length > 0 ? (
                            <FlatList
                                key={"3"}
                                style={{ flex: 1 }}
                                keyExtractor={item => item.code.toString()}
                                data={controller.imageList}
                                numColumns={3}
                                renderItem={({ item, index }) => {
                                    const PADDING = 16;
                                    const ITEM_WIDTH = (Dimensions.get("window").width - PADDING * 2) / 3;
        
                                    return (
                                        <View style={{ width: ITEM_WIDTH }}>
                                            <Pressable
                                                style={{ flex: 1 }}
                                                onPress={() => {
                                                    controller.setCode({
                                                        code: item.code,
                                                        prevCode: item.prevCode,
                                                        nextCode: item.nextCode
                                                    });
                                                    controller.setSelectedImgIndex(index);
                                                    controller.setModalOpen(true);
                                                }}
                                            >
                                                <Image
                                                    style={uploadPhotoStyles.image}
                                                    source={{ uri: `${BASE_URL}${item.imgUrl.folderName}${item.imgUrl.imgUrl}` }}
                                                />
                                            </Pressable>
                                        </View>
                                    )
                                }}
                            />
                        ) : (
                            <View style={uploadPhotoStyles.noData}>
                                <Text style={uploadPhotoStyles.noDataText}>업로드된 이미지가 없습니다.</Text>
                            </View>
                        )}
                    </>
                ) : (
                    <View style={{ flex: 1 }}>
                        <LoadingComponent />
                    </View>
                )}
            </View>

            <UploadPhotoModal
                open={controller.modalOpen}
                setOpen={controller.setModalOpen}
                isLoading={controller.detailLoading}
                dataList={controller.imageList}
                data={controller.foorintDetail}
                index={controller.selectedImgIndex}
                setIndex={controller.setSelectedImgIndex}
            />
        </SafeAreaView>
    )
}