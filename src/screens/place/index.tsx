import { FlatList, Pressable, Text, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { commonStyles } from "@/styles/common";
import { colors } from "@/styles/colors";
import { ArrowHeaderComponent } from "@/components/arrow-header";
import { YearSelectionComponent } from "@/components/year-selection";
import { LoadingComponent } from "@/components/loading";
import { PlaceModal } from "./_components/modal";
import { useControlPlace } from "./index.control";
import { placeStyles } from "./indexStyles";

/**
 * @brief 여행 장소
 */

export default function PlaceScreen() {
    const insets = useSafeAreaInsets();
    const controller = useControlPlace();

    return (
        <SafeAreaView style={commonStyles.container}>
            <ArrowHeaderComponent title="여행 장소" />

            <View 
                style={[
                    placeStyles.container,
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
                                    placeStyles.placeItemContainer,
                                    pressed && { backgroundColor: colors.thirdLight }
                                ]}
                                onPress={() => {
                                    controller.setSelectedCode(item.code);
                                    controller.setModalOpen(true);
                                }}
                            >
                                <View style={placeStyles.placeItemWrapper}>
                                    <Ionicons name="location-outline" color={colors.textPrimary} size={20} />
                                    <Text style={placeStyles.placeItemName}>{item.location}</Text>
                                </View>

                                <Text style={placeStyles.placeItemNumber}>{item.visitCount}번 방문</Text>
                            </Pressable>
                        )}
                    />
                ) : (
                    <View style={{ flex: 1, paddingBottom: insets.bottom + 62 + 16 }}>
                        <LoadingComponent />
                    </View>
                )}
            </View>

            <PlaceModal
                open={controller.modalOpen}
                setOpen={controller.setModalOpen}
                isLoading={controller.detailLoading}
                data={controller.foorintDetail}
                setSelectedCode={controller.setSelectedCode}
            />
        </SafeAreaView>
    )
}