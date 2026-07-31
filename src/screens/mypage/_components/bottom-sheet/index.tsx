import { RefObject, useCallback } from "react";
import { Pressable, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigation/types";
import { useUserInfo } from "@/hooks/useUserInfo";
import useBottomSheetBackHandler from "@/hooks/useBottomSheetBakcHandler";
import { useCustomerRoom } from "@/hooks/_api/useCustomerRoom";
import { bottomSheetStyles } from "./indexStyles";

/**
 * @brief 마이페이지 바텀 시트
 */

interface Props {
    bottomSheetModalRef: RefObject<BottomSheetModal | null>;
}

export const MypageBottomSheet = (props: Props) => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const insets = useSafeAreaInsets();
    const { customerRoomCode } = useUserInfo();
    const {
        onGenerateCustomerRoom
    } = useCustomerRoom({ 
        onSuccess: 
            (customerRoomCode: number) => {
                navigation.navigate("Chat", { code: customerRoomCode });
                handleCloseModalPress();
            }
    });

    const handleCloseModalPress = () => {
        requestAnimationFrame(() => {
            props.bottomSheetModalRef.current?.close();
        });
    };

    const renderBackdrop = useCallback(
        (props: any) => <BottomSheetBackdrop {...props} pressBehavior="close" />,
        [],
    );

    const { handleSheetPositionChange } = useBottomSheetBackHandler(props.bottomSheetModalRef);

    return (
        <BottomSheetModal
            ref={props.bottomSheetModalRef}
            enableDynamicSizing={true}
            index={1}
            snapPoints={['40%', '50%']}
            onChange={handleSheetPositionChange}
            backdropComponent={renderBackdrop}
        >
            <BottomSheetView
                style={[
                    bottomSheetStyles.container,
                    { paddingBottom: insets.bottom + 30 }
                ]}
            >
                <Pressable
                    style={bottomSheetStyles.close}
                    onPress={handleCloseModalPress}
                >
                    <Feather name="x" color="black" size={28} />
                </Pressable>

                <View style={bottomSheetStyles.wrapper}>
                    <Text style={bottomSheetStyles.title}>고객센터</Text>

                    <View style={bottomSheetStyles.list}>
                        <Pressable style={bottomSheetStyles.item}>
                            <View style={bottomSheetStyles.itemTextWrapper}>
                                <View style={bottomSheetStyles.itemIcon}>
                                    <Feather name="mail" color="white" size={20} />
                                </View>

                                <Text style={bottomSheetStyles.itemText}>boram4784@gmail.com</Text>
                            </View>
                            
                            <Feather name="chevron-right" color="#A4ADB2" size={25} />
                        </Pressable>

                        <Pressable
                            style={({ pressed }) => [
                                bottomSheetStyles.item,
                                pressed && { backgroundColor: "#E7EDF1" }
                            ]}
                            onPress={() => {
                                if (customerRoomCode) {
                                    navigation.navigate("Chat", { code: customerRoomCode });
                                    handleCloseModalPress();
                                } else {
                                    onGenerateCustomerRoom();
                                }
                            }}
                        >
                            <View style={bottomSheetStyles.itemTextWrapper}>
                                <View style={bottomSheetStyles.itemIcon}>
                                    <MaterialCommunityIcons name="comment-text-outline" color="white" size={20} />
                                </View>

                                <Text style={bottomSheetStyles.itemText}>채팅 문의</Text>
                            </View>
                            
                            <Feather name="chevron-right" color="#A4ADB2" size={25} />
                        </Pressable>
                    </View>
                </View>
            </BottomSheetView>
        </BottomSheetModal>
    )
}