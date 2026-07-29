import { FlatList, Pressable, Text, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { commonStyles } from "@/styles/common";
import { colors } from "@/styles/colors";
import { ArrowHeaderComponent } from "@/components/arrow-header";
import { YearSelectionComponent } from "@/components/year-selection";
import { LoadingComponent } from "@/components/loading";
import { LocationModal } from "./_components/modal";
import { useControlLocation } from "./index.control";
import { locationStyles } from "./indexStyles";

/**
 * @brief 여행 장소
 */

export default function LocationScreen() {
    const insets = useSafeAreaInsets();
    const controller = useControlLocation();

    return (
        <SafeAreaView style={commonStyles.container}>
            <ArrowHeaderComponent title="여행 장소" />

            <View 
                style={[
                    locationStyles.container,
                    { 
                        paddingTop: insets.top + 60 + 24,
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
                        {controller.locationList.length > 0 ? (
                            <FlatList
                                key={"1"}
                                style={{ flex: 1 }}
                                contentContainerStyle={{ gap: 12 }}
                                keyExtractor={item => item.code.toString()}
                                data={controller.locationList}
                                numColumns={1}
                                renderItem={({ item }) => (
                                    <Pressable
                                        style={({ pressed }) => [
                                            locationStyles.locationItemContainer,
                                            pressed && { backgroundColor: colors.thirdLight }
                                        ]}
                                        onPress={() => {
                                            controller.setSelectedCode(item.code);
                                            controller.setModalOpen(true);
                                        }}
                                    >
                                        <View style={locationStyles.locationItemWrapper}>
                                            <Ionicons name="location-outline" color={colors.textPrimary} size={20} />
                                            <Text style={locationStyles.locationItemName}>{item.location}</Text>
                                        </View>
        
                                        <Text style={locationStyles.locationItemNumber}>{item.visitCount}번 방문</Text>
                                    </Pressable>
                                )}
                            />
                        ) : (
                            <View style={locationStyles.noData}>
                                <Text style={locationStyles.noDataText}>발자국이 남겨진 장소가 없습니다.</Text>
                            </View>
                        )}
                    </>
                ) : (
                    <View style={{ flex: 1 }}>
                        <LoadingComponent />
                    </View>
                )}
            </View>

            <LocationModal
                open={controller.modalOpen}
                setOpen={controller.setModalOpen}
                isLoading={controller.detailLoading}
                data={controller.foorintDetail}
                setSelectedCode={controller.setSelectedCode}
            />
        </SafeAreaView>
    )
}