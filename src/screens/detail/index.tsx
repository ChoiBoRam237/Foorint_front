import { Dimensions, Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import Carousel, { Pagination } from "react-native-reanimated-carousel";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ArrowHeaderComponent } from "@/components/arrow-header";
import { colors } from "@/styles/colors";
import { detailStyles } from "./indexStyles";
import { useControlDetail } from "./index.control";

/**
 * @brief 여행 상세 화면
 */

export default function Detail() {
    const insets = useSafeAreaInsets();
    const controller = useControlDetail();

    return (
        <SafeAreaView
            style={[
                detailStyles.container,
                {
                    paddingTop: insets.top,
                    paddingBottom: insets.bottom + 30,
                },
            ]}
        >
            <ArrowHeaderComponent
                options={[
                    { text: "수정하기", textColor: "black", onClick: () => {} },
                    { text: "삭제하기", textColor: colors.red, onClick: () => {} },
                ]}
            />

            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={[
                    detailStyles.infoContainer,
                    { top: insets.top + 76 }
                ]}
            >
                <View style={detailStyles.infoWrapper}>
                    <Text style={detailStyles.title}>빠지 야호~</Text>

                    <View style={detailStyles.info}>
                        <View
                            style={[
                                detailStyles.categoryCircle,
                                { backgroundColor: colors.red }
                            ]}
                        />

                        <Text style={detailStyles.categoryName}>국내여행</Text>
                    </View>
                </View>

                <View style={detailStyles.info}>
                    <Ionicons name="location-outline" color={colors.textPrimary} size={14} />
                    <Text style={detailStyles.infoText}>경기도 가평</Text>
                </View>

                <View style={detailStyles.info}>
                    <Ionicons name="calendar-outline" color={colors.textPrimary} size={14} />
                    <Text style={detailStyles.infoText}>2026.01.01 ~ 2026.01.03</Text>
                </View>
            </ScrollView>

            <View style={{ flex: 1 }}>
                <Carousel
                    ref={controller.imgRef}
                    width={Dimensions.get('window').width}
                    height={412}
                    data={[ { code: 1, imgUrl: "aaa.png" } ]}
                    renderItem={(item) => (
                        <View style={detailStyles.imageWrapper}>
                            <Image
                                style={detailStyles.image}
                                source={{ uri: item.item.imgUrl }}
                            />

                            <Pagination.Basic
                                dotStyle={{ backgroundColor: "rgba(0,0,0,0.2)", borderRadius: 50 }}
                                containerStyle={detailStyles.imagePagination}
                                progress={controller.imgProgress}
                                data={[ { code: 1, imgUrl: "aaa.png" } ]}
                                onPress={(index) => (
                                    controller.imgRef.current?.scrollTo({
                                        count: index - controller.imgProgress.value,
                                        animated: true,
                                    })
                                )}
                            />
                        </View>
                    )}
                />
            </View>

            <View style={detailStyles.contentWrapper}>
                <Text style={detailStyles.content}>오늘은 친구와 함께 경기도 가평에 가는 날이다.</Text>
            </View>
        </SafeAreaView>
    )
}