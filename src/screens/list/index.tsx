import { FlatList, ScrollView, Text, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { MainHeaderComponent } from "@/components/main-header";
import { commonStyles } from "@/styles/common";
import { CloudComponent } from "@/components/cloud";
import { YearSelectionComponent } from "@/components/year-selection";
import { FilterComponent } from "@/components/filter";
import { TripItemComponent } from "@/components/trip-item";
import { useControlList } from "./index.control";
import { listStyles } from "./indexStyles";
import { FooterComponent } from "@/components/footer";

/**
 * @brief 리스트
 */

const data = [
    {
        code: 1,
        title: "빠지 야호~",
        category: {
            code: 1,
            name: "국내 여행",
            color: "red"
        },
        description: "오늘 빠지로 놀러갔다."
    },
    {
        code: 2,
        title: "빠지 야호~",
        category: {
            code: 1,
            name: "국내 여행",
            color: "red"
        },
        description: "오늘 빠지로 놀러갔다.오늘 빠지로 놀러갔다.오늘 빠지로 놀러갔다.오늘 빠지로 놀러갔다.오늘 빠지로 놀러갔다.오늘 빠지로 놀러갔다.오늘 빠지로 놀러갔다."
    },
    {
        code: 3,
        title: "빠지 야호~",
        category: {
            code: 1,
            name: "국내 여행",
            color: "red"
        },
        description: "오늘 빠지로 놀러갔다."
    },
    {
        code: 4,
        title: "빠지 야호~",
        category: {
            code: 1,
            name: "국내 여행",
            color: "red"
        },
        description: "오늘 빠지로 놀러갔다."
    },
    {
        code: 5,
        title: "빠지 야호~",
        category: {
            code: 1,
            name: "국내 여행",
            color: "red"
        },
        description: "오늘 빠지로 놀러갔다."
    },
    {
        code: 6,
        title: "빠지 야호~",
        category: {
            code: 1,
            name: "국내 여행",
            color: "red"
        },
        description: "오늘 빠지로 놀러갔다."
    }
]

export default function ListScreen() {
    const insets = useSafeAreaInsets();
    const controller = useControlList();

    return (
        <SafeAreaView style={commonStyles.container}>
            <MainHeaderComponent />

            <View
                style={[
                    listStyles.wrapper,
                    {
                        paddingTop: insets.top + 60 + 16,
                        paddingBottom: insets.bottom + 62 + 16,
                    }
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
                        yearList={controller.yearList}
                        value={controller.selectedYear}
                        setValue={controller.setSelectedYear}
                    />

                    <View style={listStyles.filter}>
                        <FilterComponent
                            filterList={controller.filterList}
                            value={controller.selectedFilter}
                            setValue={controller.setSelectedFilter}
                        />
                    </View>
                </View>

                <FlatList
                    key={"2"}
                    style={{ flex: 1 }}
                    contentContainerStyle={{ gap: 12 }}
                    columnWrapperStyle={{ gap: 12 }}
                    keyExtractor={item => item.code.toString()}
                    data={data}
                    numColumns={2}
                    renderItem={({ item }) => (
                        <TripItemComponent data={item} />
                    )}
                />
            </View>

            <FooterComponent target="List" />
        </SafeAreaView>
    )
}