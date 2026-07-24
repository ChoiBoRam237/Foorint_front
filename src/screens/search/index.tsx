import { Dimensions, FlatList, Text, TextInput, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context"
import AntDesign from 'react-native-vector-icons/AntDesign'
import { commonStyles } from "@/styles/common";
import { colors } from "@/styles/colors";
import { MainHeaderComponent } from "@/components/main-header";
import { CloudComponent } from "@/components/cloud";
import { FilterComponent } from "@/components/filter";
import { TripItemComponent } from "@/components/trip-item";
import { FooterComponent } from "@/components/footer";
import { LoadingComponent } from "@/components/loading";
import { searchStyles } from "./indexStyles";
import { useControlSearch } from "./index.control";
import { NoDataComponent } from "@/components/no-data";

/**
 * @brief 검색 리스트
 */

export default function SearchScreen() {
    const insets = useSafeAreaInsets();
    const controller = useControlSearch();

    return (
        <SafeAreaView style={commonStyles.container}>
            <MainHeaderComponent />

            <View
                style={[
                    searchStyles.wrapper,
                    { paddingTop: insets.top + 60 + 16 }
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

                <FilterComponent
                    value={controller.selectedFilter}
                    setValue={controller.setSelectedFilter}
                />

                {!controller.listLoading ? (
                    <>
                        {controller.foorintList.length > 0 ? (
                            <FlatList
                                key={"2"}
                                style={{ flex: 1 }}
                                contentContainerStyle={{ gap: 12 }}
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
                                <NoDataComponent text={"검색한 키워드와 일치하는\n발자국이 존재하지 않습니다."} />
                            </View>
                        )}
                    </>
                ) : (
                    <View style={{ flex: 1, paddingBottom: insets.bottom + 62 + 30 }}>
                        <LoadingComponent />
                    </View>
                )}
            </View>

            <FooterComponent target="Search" />
        </SafeAreaView>
    )
}