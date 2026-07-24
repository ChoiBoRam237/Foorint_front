import { Dimensions, Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import Carousel, { Pagination } from "react-native-reanimated-carousel";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { format } from "date-fns";
import { BASE_URL } from "@env";
import { ArrowHeaderComponent } from "@/components/arrow-header";
import { LoadingComponent } from "@/components/loading";
import { colors } from "@/styles/colors";
import { commonStyles } from "@/styles/common";
import { detailStyles } from "./indexStyles";
import { useControlDetail } from "./index.control";
import { useEffect, useState } from "react";

/**
 * @brief 여행 상세 화면
 */

export default function DetailScreen() {
    const insets = useSafeAreaInsets();
    const controller = useControlDetail();
    const screenWidth = Dimensions.get("window").width;
    const [imageHeights, setImageHeights] = useState<Record<number, number>>({});
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const imgList = controller.foorintDetail?.imgList;
    
        if (!imgList?.length) return;
    
        imgList.forEach((item) => {
            const imageUrl = `${BASE_URL}${item.folderName}${item.imgUrl}`;
    
            Image.getSize(
                imageUrl,
                (width, height) => {
                    setImageHeights(prev => ({
                        ...prev,
                        [item.code]: (screenWidth * height) / width,
                    }));
                },
                (error) => {
                    console.log(error);
                }
            );
        });
    }, [controller.foorintDetail?.imgList]);

    if (controller.isLoading || !controller.foorintDetail) {
        return <LoadingComponent />;
    }

    const currentImage =
        controller.foorintDetail?.imgList[currentIndex];

    const carouselHeight =
        currentImage ? imageHeights[currentImage.code] ?? 300 : 300;

    return (
        <SafeAreaView style={commonStyles.container}>
            <ArrowHeaderComponent
                options={[
                    { text: "수정하기", textColor: "black", onClick: () => {} },
                    { text: "삭제하기", textColor: colors.red, onClick: () => {} },
                ]}
            />

            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={[
                    detailStyles.scrollContainer,
                    { 
                        paddingTop: insets.top + 60,
                        paddingBottom: insets.bottom + 10
                    }
                ]}
            >
                <View style={detailStyles.infoContainer}>
                    <View style={detailStyles.infoWrapper}>
                        <Text style={detailStyles.title}>{controller.foorintDetail.title}</Text>

                        {controller.foorintDetail.category && (
                            <View style={detailStyles.info}>
                                <View
                                    style={[
                                        detailStyles.categoryCircle,
                                        { backgroundColor: controller.foorintDetail.category.color ?? "black" }
                                    ]}
                                />

                                <Text style={detailStyles.categoryName}>{controller.foorintDetail.category.name}</Text>
                            </View>
                        )}
                    </View>

                    <View style={detailStyles.info}>
                        <Ionicons name="location-outline" color={colors.textPrimary} size={14} />
                        <Text style={detailStyles.infoText}>{controller.foorintDetail.location}</Text>
                    </View>

                    <View style={detailStyles.info}>
                        <Ionicons name="calendar-outline" color={colors.textPrimary} size={14} />
                        <Text style={detailStyles.infoText}>
                            {format(controller.foorintDetail.startDate, "yyyy.MM.dd")} ~ {format(controller.foorintDetail.endDate, "yyyy.MM.dd")}
                        </Text>
                    </View>
                </View>

                <View style={detailStyles.imageWrapper}>
                    <View style={{ flex: 1 }}>
                        <Carousel
                            ref={controller.imgRef}
                            width={screenWidth}
                            height={carouselHeight}
                            loop={false}
                            data={controller.foorintDetail?.imgList ?? []}
                            onSnapToItem={setCurrentIndex}
                            onProgressChange={controller.imgProgress}
                            renderItem={({ item }) => (
                                <Image
                                    style={{
                                        width: "100%",
                                        height: imageHeights[item.code] ?? carouselHeight
                                    }}
                                    src={`${BASE_URL}${item.folderName}${item.imgUrl}`}
                                    resizeMode="contain"
                                /> 
                            )}
                        />
                    </View>

                    <Pagination.Basic
                        dotStyle={detailStyles.imagePaginationDot}
                        containerStyle={detailStyles.imagePagination}
                        activeDotStyle={{ backgroundColor: colors.thirdDark }}
                        progress={controller.imgProgress}
                        data={controller.foorintDetail?.imgList ?? []}
                        onPress={(index) => (
                            controller.imgRef.current?.scrollTo({
                                count: index - controller.imgProgress.value,
                                animated: true,
                            })
                        )}
                    />
                </View>

                <View style={detailStyles.contentWrapper}>
                    <Text style={detailStyles.content}>{controller.foorintDetail.description}</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}