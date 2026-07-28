import { RefObject, useCallback } from "react";
import { Pressable, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { BottomSheetBackdrop, BottomSheetFlatList, BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import Feather from 'react-native-vector-icons/Feather';
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { RootStackParamList } from "@/navigation/types";
import useBottomSheetBackHandler from "@/hooks/useBottomSheetBakcHandler";
import { bottomSheetStyles } from "./indexStyles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useControlHomeBottomSheet } from "./index.control";
import { LoadingComponent } from "@/components/loading";

/**
 * @brief 홈화면 바텀 시트
 */

export interface BottomSheetProps {
    bottomSheetModalRef: RefObject<BottomSheetModal | null>;
    value: Date;
}

export const HomeBottomSheet = (props: BottomSheetProps) => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const insets = useSafeAreaInsets();
    const controller = useControlHomeBottomSheet(props);

    const renderBackdrop = useCallback(
        (props: any) => <BottomSheetBackdrop {...props} pressBehavior="close" />,
        [],
    );

    const { handleSheetPositionChange } = useBottomSheetBackHandler(props.bottomSheetModalRef);

    return (
        <BottomSheetModal
            ref={props.bottomSheetModalRef}
            index={1}
            snapPoints={['40%', '50%']}
            enableDynamicSizing={false}
            onChange={handleSheetPositionChange}
            backdropComponent={renderBackdrop}
            backgroundStyle={{ backgroundColor: "#A8E7FF", borderRadius: 0 }}
            style={bottomSheetStyles.modalContainer}
        >
            <View style={bottomSheetStyles.titleWrapper}>
                <Text style={bottomSheetStyles.text}>{format(props.value, "dd")}.</Text>
                <Text style={bottomSheetStyles.text}>{format(props.value, "E", { locale: ko })}</Text>
            </View>

            {!controller.isLoading ? (
                <>
                    {controller.dayList.length > 0 ? (
                        <BottomSheetFlatList
                            key={"1"}
                            style={{ flex: 1 }}
                            contentContainerStyle={{ gap: 4, paddingBottom: 16 }}
                            keyExtractor={item => item.code.toString()}
                            data={controller.dayList}
                            numColumns={1}
                            renderItem={({ item }) => (
                                <Pressable
                                    style={({ pressed }) => [
                                        bottomSheetStyles.item,
                                        pressed && { backgroundColor: "#89DEFF" }
                                    ]}
                                    onPress={() => {
                                        navigation.navigate("Detail", { code: item.code });
                                        requestAnimationFrame(() => {
                                            props.bottomSheetModalRef.current?.close();
                                        });
                                    }}
                                >
                                    <View style={bottomSheetStyles.itemTitleWrapper}>
                                        <Text style={bottomSheetStyles.itemTitle}>{item.title}</Text>
                                        <Text style={bottomSheetStyles.itemDate}>
                                            {format(item.startDate, "yyyy. MM. dd")} ~ {format(item.endDate, "yyyy. MM. dd")}
                                        </Text>
                                    </View>

                                    <View style={bottomSheetStyles.itemCategory}>
                                        <View
                                            style={[
                                                bottomSheetStyles.itemCategoryCircle,
                                                { backgroundColor: item.category.color ?? "black" }
                                            ]}
                                        />

                                        <Text style={bottomSheetStyles.itemCategoryName}>{item.category.name}</Text>
                                    </View>
                                </Pressable>
                            )}
                        />
                    ) : (
                        <View style={bottomSheetStyles.noData}>
                            <Text style={bottomSheetStyles.noDataText}>아직 등록된 일정이 없습니다.</Text>
                        </View>
                    )}

                    <Pressable
                        style={[
                            bottomSheetStyles.plusButton,
                            { bottom: insets.bottom + 100 }
                        ]}
                        onPress={() => navigation.navigate("Generate", { date: props.value })}
                    >
                        <Feather name="plus" color="white" size={24} />
                    </Pressable>
                </>
            ) : (
                <LoadingComponent style={{ backgroundColor: "transparent" }} />
            )}
        </BottomSheetModal>
    )
}