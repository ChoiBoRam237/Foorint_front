import { Dimensions, FlatList, Text, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { MainHeaderComponent } from "@/components/main-header";
import { commonStyles } from "@/styles/common";
import { CloudComponent } from "@/components/cloud";
import { YearSelectionComponent } from "@/components/year-selection";
import { FilterComponent } from "@/components/filter";
import { TripItemComponent } from "@/components/trip-item";
import { FooterComponent } from "@/components/footer";
import { LoadingComponent } from "@/components/loading";
import { useControlList } from "./index.control";
import { listStyles } from "./indexStyles";
import { NoDataComponent } from "@/components/no-data";

/**
 * @brief 리스트
 */

export default function ListScreen() {
    const insets = useSafeAreaInsets();
    const controller = useControlList();

    return (
        <SafeAreaView style={commonStyles.container}>
            <MainHeaderComponent />

            <View
                style={[
                    listStyles.wrapper,
                    { paddingTop: insets.top + 60 + 16 }
                ]}
            >
                <View style={listStyles.titleWrapper}>
                    <Text style={listStyles.title}>나의 발자국 모음</Text>

                    <CloudComponent
                        target="three"
                        width={70}
                        height={48}
                        position={{
                            left: 36,
                            bottom: -5,
                        }}
                    />
                </View>

                <View style={listStyles.optionWrapper}>
                    <YearSelectionComponent
                        value={controller.selectedYear}
                        setValue={controller.setSelectedYear}
                    />

                    <FilterComponent
                        value={controller.selectedFilter}
                        setValue={controller.setSelectedFilter}
                    />
                </View>

                {!controller.listLoading ? (
                    <>
                        {controller.foorintList.length > 0 ? (
                            <FlatList
                                key={"2"}
                                style={{ flex: 1 }}
                                contentContainerStyle={{ 
                                    gap: 12,
                                    paddingBottom: insets.bottom + 62 + 16,
                                }}
                                columnWrapperStyle={{ gap: 12 }}
                                keyExtractor={item => item.code.toString()}
                                data={controller.foorintList}
                                numColumns={2}
                                renderItem={({ item }) => {
                                    const GAP = 12;
                                    const PADDING = 16;
                                    const ITEM_WIDTH = (Dimensions.get("window").width - PADDING * 2 - GAP) / 2;
        
                                    return (
                                        <View style={{ width: ITEM_WIDTH }}>
                                            <TripItemComponent data={item} />
                                        </View>
                                    )
                                }}
                            />
                        ) : (
                            <View style={{ flex: 1, paddingBottom: insets.bottom + 62 + 30 }}>
                                <NoDataComponent text={"선택한 조건에 맞는\n발자국이 존재하지 않습니다."} />
                            </View>
                        )}
                    </>
                ) : (
                    <View style={{ flex: 1, paddingBottom: insets.bottom + 62 + 30 }}>
                        <LoadingComponent />
                    </View>
                )}
            </View>

            <FooterComponent target="List" />
        </SafeAreaView>
    )
}