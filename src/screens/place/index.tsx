import { FlatList, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { commonStyles } from "@/styles/common";
import { ArrowHeaderComponent } from "@/components/arrow-header";
import { YearSelectionComponent } from "@/components/year-selection";
import { PlaceItem } from "./_components/item";
import { useControlPlace } from "./index.control";
import { placeStyles } from "./indexStyles";

/**
 * @brief 여행 장소
 */

const data = [
    { code: 1, placeName: "경기도 가평시", visitCount: 3 },
    { code: 2, placeName: "부산광역시", visitCount: 1 },
    { code: 3, placeName: "인천광역시", visitCount: 2 },
];

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
                        yearList={controller.yearList}
                        value={controller.selectedYear}
                        setValue={controller.setSelectedYear}
                    />
                </View>

                <FlatList
                    key={"1"}
                    style={{ flex: 1 }}
                    contentContainerStyle={{ gap: 12 }}
                    keyExtractor={item => item.code.toString()}
                    data={data}
                    numColumns={1}
                    renderItem={({ item }) => (
                        <PlaceItem data={item} />
                    )}
                />
            </View>
        </SafeAreaView>
    )
}