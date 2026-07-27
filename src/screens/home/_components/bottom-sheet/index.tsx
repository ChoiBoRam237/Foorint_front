import { RefObject, useCallback } from "react";
import { Pressable, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { BottomSheetBackdrop, BottomSheetFlatList, BottomSheetModal } from "@gorhom/bottom-sheet";
import Feather from 'react-native-vector-icons/Feather';
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { RootStackParamList } from "@/navigation/types";
import useBottomSheetBackHandler from "@/hooks/useBottomSheetBakcHandler";
import { bottomSheetStyles } from "./indexStyles";
import { useSafeAreaInsets } from "react-native-safe-area-context";

/**
 * @brief 홈화면 바텀 시트
 */

interface Props {
    bottomSheetModalRef: RefObject<BottomSheetModal | null>;
    value: Date;
}

const data = [
    {
        code: 1,
        title: "처음으로 빠지에 가다.",
        date: "2026. 07. 17 ~ 2026. 07. 19",
        category: {
            code: 1,
            name: "국내여행",
            color: "#FF0000"
        }
    },
    {
        code: 2,
        title: "처음으로 빠지에 가다.",
        date: "2026. 07. 17 ~ 2026. 07. 19",
        category: {
            code: 1,
            name: "국내여행",
            color: "#FF0000"
        }
    },
];

export const HomeBottomSheet = (props: Props) => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const insets = useSafeAreaInsets();

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

            <BottomSheetFlatList
                key={"1"}
                style={{ flex: 1 }}
                contentContainerStyle={{ gap: 4, paddingBottom: 16 }}
                keyExtractor={item => item.code.toString()}
                data={data}
                numColumns={1}
                renderItem={({ item }) => (
                    <Pressable
                        style={({ pressed }) => [
                            bottomSheetStyles.item,
                            pressed && { backgroundColor: "#89DEFF" }
                        ]}
                        onPress={() => navigation.navigate("Detail", { code: item.code })}
                    >
                        <View style={bottomSheetStyles.itemTitleWrapper}>
                            <Text style={bottomSheetStyles.itemTitle}>{item.title}</Text>
                            <Text style={bottomSheetStyles.itemDate}>{item.date}</Text>
                        </View>

                        <View style={bottomSheetStyles.itemCategory}>
                            <View
                                style={[
                                    bottomSheetStyles.itemCategoryCircle,
                                    { backgroundColor: item.category.color }
                                ]}
                            />

                            <Text style={bottomSheetStyles.itemCategoryName}>{item.category.name}</Text>
                        </View>
                    </Pressable>
                )}
            />

            <Pressable
                style={[
                    bottomSheetStyles.plusButton,
                    { bottom: insets.bottom + 110 }
                ]}
                onPress={() => navigation.navigate("Generate", { date: props.value })}
            >
                <Feather name="plus" color="white" size={24} />
            </Pressable>
        </BottomSheetModal>
    )
}