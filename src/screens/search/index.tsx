import { FlatList, Text, TextInput, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context"
import AntDesign from 'react-native-vector-icons/AntDesign'
import { commonStyles } from "@/styles/common";
import { colors } from "@/styles/colors";
import { MainHeaderComponent } from "@/components/main-header";
import { CloudComponent } from "@/components/cloud";
import { FilterComponent } from "@/components/filter";
import { TripItemComponent } from "@/components/trip-item";
import { FooterComponent } from "@/components/footer";
import { searchStyles } from "./indexStyles";
import { useControlSearch } from "./index.control";

/**
 * @brief 검색 리스트
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
];

export default function SearchScreen() {
    const insets = useSafeAreaInsets();
    const controller = useControlSearch();

    return (
        <SafeAreaView style={commonStyles.container}>
            <MainHeaderComponent />

            <View
                style={[
                    searchStyles.wrapper,
                    {
                        paddingTop: insets.top + 76,
                        paddingBottom: insets.bottom + 62 + 16,
                    }
                ]}
            >
                <View style={searchStyles.titleWrapper}>
                    <Text style={searchStyles.title}>발자국 검색</Text>

                    <CloudComponent
                        target="three"
                        width={74}
                        height={50}
                        position={{
                            left: -10,
                            bottom: -6,
                        }}
                    />
                </View>

                <View style={searchStyles.innerWrapper}>
                    <View style={searchStyles.search}>
                        <AntDesign name="search1" color={colors.placeholder} size={22} />
                        
                        <TextInput
                            style={searchStyles.searchInput}
                            placeholder="검색어를 입력해 주세요"
                            placeholderTextColor={colors.placeholder}
                            value={controller.searchValue}
                            onChangeText={controller.setSearchValue}
                        />
                    </View>
                </View>

                <View style={searchStyles.filter}>
                    <FilterComponent
                        filterList={controller.filterList}
                        value={controller.selectedFilter}
                        setValue={controller.setSelectedFilter}
                    />
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

            <FooterComponent target="Search" />
        </SafeAreaView>
    )
}