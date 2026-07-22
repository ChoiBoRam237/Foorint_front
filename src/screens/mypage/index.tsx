import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import Foundation from 'react-native-vector-icons/Foundation';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { RootStackParamList } from "@/navigation/types";
import { commonStyles } from "@/styles/common";
import { colors } from "@/styles/colors";
import { MainHeaderComponent } from "@/components/main-header";
import { FooterComponent } from "@/components/footer";
import { mypageStyles } from "./indexStyles";

/**
 * @brief 마이페이지
 */

export default function MypageScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const insets = useSafeAreaInsets();

    return (
        <SafeAreaView style={commonStyles.container}>
            <MainHeaderComponent />

            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={[
                    mypageStyles.wrapper,
                    {
                        paddingTop: insets.top + 60 + 24,
                        paddingBottom: insets.bottom + 62 + 16
                    }
                ]}
            >
                <View style={mypageStyles.profileWrapper}>
                    <Image
                        style={mypageStyles.profileImg}
                    />

                    <View style={mypageStyles.profileInfo}>
                        <Text style={mypageStyles.profileInfoName}>최보람</Text>
                        <Text style={mypageStyles.profileInfoEmail}>bbb@gmail.com</Text>
                    </View>
                </View>

                <View style={mypageStyles.innerWrapper}>
                    <View style={mypageStyles.statisticsWrapper}>
                        <Text style={mypageStyles.statisticsTitle}>내 여행 통계</Text>

                        <View style={mypageStyles.statisticsList}>
                            <View style={mypageStyles.statisticsItem}>
                                <View style={mypageStyles.statisticsItemIcon}>
                                    <Foundation name="foot" color={colors.textPrimary} size={30} />
                                </View>

                                <Text style={mypageStyles.statisticsItemNumber}>30</Text>

                                <Text style={mypageStyles.statisticsItemTitle}>총 발자국 개수</Text>
                            </View>

                            <Pressable
                                style={mypageStyles.statisticsItem}
                                onPress={() => navigation.navigate("Place")}
                            >
                                <View style={mypageStyles.statisticsItemArrow}>
                                    <Feather name="chevron-right" color={colors.textPrimary} size={16} />
                                </View>

                                <Ionicons name="location-outline" color={colors.textPrimary} size={30} />
                                <Text style={mypageStyles.statisticsItemNumber}>23</Text>
                                <Text style={mypageStyles.statisticsItemTitle}>여행 장소</Text>
                            </Pressable>

                            <Pressable
                                style={mypageStyles.statisticsItem}
                                onPress={() => navigation.navigate("UploadPhoto")}
                            >
                                <View style={mypageStyles.statisticsItemArrow}>
                                    <Feather name="chevron-right" color={colors.textPrimary} size={16} />
                                </View>

                                <Ionicons name="images-outline" color={colors.textPrimary} size={30} />
                                <Text style={mypageStyles.statisticsItemNumber}>320</Text>
                                <Text style={mypageStyles.statisticsItemTitle}>업로드 사진</Text>
                            </Pressable>
                        </View>
                    </View>

                    {/* 고객센터, 버전 */}
                    <View style={mypageStyles.box}>
                        <Pressable
                            style={({ pressed }) => [
                                mypageStyles.boxItem,
                                pressed && { backgroundColor: "#8BDFFF" }
                            ]}
                        >
                            <View style={mypageStyles.boxTextWrapper}>
                                <AntDesign name="customerservice" color={colors.textPrimary} size={24} />
                                <Text style={mypageStyles.boxText}>고객센터</Text>
                            </View>

                            <Feather name="chevron-right" color={colors.textPrimary} size={25} />
                        </Pressable>

                        <View style={mypageStyles.boxItem}>
                            <Text style={mypageStyles.boxText}>버전</Text>
                            <Text style={mypageStyles.boxText}>v.1.0.0.1</Text>
                        </View>
                    </View>

                    {/* 로그아웃, 계정 탈퇴 */}
                    <View style={mypageStyles.box}>
                        <Pressable
                            style={({ pressed }) => [
                                mypageStyles.boxItem,
                                pressed && { backgroundColor: "#8BDFFF" }
                            ]}
                        >
                            <View style={mypageStyles.boxTextWrapper}>
                                <Ionicons name="exit-outline" color={colors.textPrimary} size={24} />
                                <Text style={mypageStyles.boxText}>로그아웃</Text>
                            </View>
                        </Pressable>

                        <Pressable
                            style={({ pressed }) => [
                                mypageStyles.boxItem,
                                pressed && { backgroundColor: "#8BDFFF" }
                            ]}
                        >
                            <Text
                                style={[
                                    mypageStyles.boxText,
                                    { color: colors.red }
                                ]}
                            >
                                계정 탈퇴
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>

            <FooterComponent target="Mypage" />
        </SafeAreaView>
    )
}