import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Calendar } from "react-native-calendars";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { format, isToday } from "date-fns";
import { RootStackParamList } from "@/navigation/types";
import { commonStyles } from "@/styles/common";
import { colors } from "@/styles/colors";
import { fonts } from "@/styles/fonts";
import { MainHeaderComponent } from "@/components/main-header";
import { FooterComponent } from "@/components/footer";
import { CloudComponent } from "@/components/cloud";
import { HomeBottomSheet } from "./_components/bottom-sheet";
import { useControlHome } from "./index.control";
import { calendarStyles, homeStyles } from "./indexStyles";

/**
 * @brief 홈화면
 */

const data = [
    { date: "2026-07-01", status: true, color: "#FF0000", count: 1 },
    { date: "2026-07-20", status: true, color: "#FF0000", count: 2 },
];

export default function HomeScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const insets = useSafeAreaInsets();
    const controller = useControlHome();

    return (
        <BottomSheetModalProvider>
            <SafeAreaView style={commonStyles.container}>
                <MainHeaderComponent />

                <ScrollView
                    style={{ flex: 1 }}
                    contentContainerStyle={[
                        homeStyles.container,
                        {
                            paddingTop: insets.top + 60 + 16,
                            paddingBottom: insets.bottom + 62 + 16,
                        }
                    ]}
                >
                    <View style={homeStyles.titleWrapper}>
                        <Text style={homeStyles.title}>나의 발자국 흔적</Text>

                        <CloudComponent
                            target="three"
                            width={72}
                            height={48}
                            position={{ top: -13, left: 35 }}
                        />
                    </View>

                    <Calendar
                        style={calendarStyles.calendarContainer}
                        theme={{
                            backgroundColor: "#A3DCFF",
                            calendarBackground: "#A3DCFF",
                            textSectionTitleColor: "#FFFFFF",
                        }}
                        hideExtraDays={true}
                        renderHeader={(date) => (
                            <View style={calendarStyles.headerWrapper}>
                                <Text style={calendarStyles.headerMonth}>{format(date, "MMM")}</Text>
                                <Text style={calendarStyles.headerYear}>{format(date, "yyyy")}</Text>
                            </View>
                        )}
                        renderArrow={(direct) => (
                            <>
                                {direct === "left" ? (
                                    <Feather name="chevron-left" color="white" size={24} />
                                ) : (
                                    <Feather name="chevron-right" color="white" size={24} />
                                )}
                            </>
                        )}
                        dayComponent={({ date }) => {
                            const today = isToday(new Date(date?.timestamp!));
                            const travel = data.find(item => item.date === date?.dateString);

                            return (
                                <Pressable
                                    style={calendarStyles.dayWrapper}
                                    onPress={() => {
                                        if (travel?.status) {
                                            controller.setSelectedDate(new Date(date?.timestamp!));
                                            controller.handlePresentModalPress();
                                        } else {
                                            navigation.navigate("Generate", { date: new Date(date?.timestamp!) })
                                        }
                                    }}
                                >
                                    <Text
                                        style={[
                                            calendarStyles.dayText,
                                            today && { 
                                                fontFamily: fonts.PretendardBold,
                                                color: colors.textPrimary
                                            }
                                        ]}
                                    >
                                        {String(date?.day)}
                                    </Text>

                                    {travel?.status && (
                                        <View style={calendarStyles.foorintWrapper}>
                                            <View style={calendarStyles.foorintIcon}>
                                                <MaterialCommunityIcons name="foot-print" color={travel.color} size={24} />
                                            </View>
                                            
                                            {travel.count > 1 && (
                                                <Text
                                                    style={[
                                                        calendarStyles.foorintText,
                                                        { color: travel.color }
                                                    ]}
                                                >
                                                    +{travel.count}
                                                </Text>
                                            )}
                                        </View>
                                    )}
                                </Pressable>
                            )
                        }}
                    />
                </ScrollView>

                <FooterComponent target="Home" />

                {/* 홈 바텀 시트 */}
                <HomeBottomSheet
                    bottomSheetModalRef={controller.bottomSheetModalRef}
                    value={controller.selectedDate ?? new Date()}
                />
            </SafeAreaView>
        </BottomSheetModalProvider>
    )
}