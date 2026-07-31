import React from "react";
import { ActivityIndicator, Image, Modal, Pressable, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { format } from "date-fns";
import { BASE_URL } from "@env";
import { colors } from "@/styles/colors";
import { useCodeStore } from "@/screens/upload-photo/_store/useCodeStore";
import { IModal } from "@/types/modal";
import { ITripDetailResponse } from "@/types/response/trip";
import { IUserImg } from "@/types/response/user";
import { RootStackParamList } from "@/navigation/types";
import { uploadPhotoModalStyles } from "./indexStyles";

/**
 * @brief 여행 장소 모달
 */

interface Props extends IModal {
    isLoading: boolean;
    dataList: IUserImg[];
    data: ITripDetailResponse | undefined;
    index: number;
    setIndex: React.Dispatch<React.SetStateAction<number>>;
}

export const UploadPhotoModal = (props: Props) => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const { prevCode, nextCode, setCode } = useCodeStore();

    if (!props.data) return null;

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={props.open}
            onRequestClose={() => props.setOpen(false)}
        >
            <View style={uploadPhotoModalStyles.container}>
                {prevCode && (
                    <Pressable
                        onPress={() => {
                            const prevData = props.dataList[props.index - 1];

                            setCode({
                                code: prevData.code,
                                prevCode: prevData.prevCode,
                                nextCode: prevData.nextCode,
                            });
                            props.setIndex(prev => prev - 1);
                        }}
                    >
                        <SimpleLineIcons name="arrow-left" color="white" size={20} />
                    </Pressable>
                )}

                {!props.isLoading ? (
                    <View style={uploadPhotoModalStyles.infoContainer}>
                        <Image
                            style={uploadPhotoModalStyles.image}
                            source={{ uri: `${BASE_URL}${props.data.imgList[0].folderName}${props.data.imgList[0].imgUrl}` }}
                        />

                        <View style={uploadPhotoModalStyles.infoWrapper}>
                            <View style={uploadPhotoModalStyles.contentWrapper}>
                                <View style={uploadPhotoModalStyles.titleWrapper}>
                                    <Text style={uploadPhotoModalStyles.title}>{props.data.title}</Text>
                                    
                                    <View style={uploadPhotoModalStyles.category}>
                                        <View
                                            style={[
                                                uploadPhotoModalStyles.categoryCircle,
                                                { backgroundColor: props.data.category.color ?? "black" }
                                            ]}
                                        />

                                        <Text style={uploadPhotoModalStyles.categoryName}>{props.data.category.name}</Text>
                                    </View>
                                </View>

                                <View style={uploadPhotoModalStyles.infoInnerWrapper}>
                                    <View style={uploadPhotoModalStyles.locationInfo}>
                                        <Ionicons name="location-outline" color={colors.textPrimary} size={14} />
                                        <Text style={uploadPhotoModalStyles.locationInfoText}>{props.data.location}</Text>
                                    </View>

                                    <View style={uploadPhotoModalStyles.locationInfo}>
                                        <Ionicons name="calendar-outline" color={colors.textPrimary} size={14} />
                                        <Text style={uploadPhotoModalStyles.locationInfoText}>{format(props.data.startDate, "yyyy.MM.dd")} ~ {format(props.data.endDate, "yyyy.MM.dd")}</Text>
                                    </View>
                                </View>
                            </View>

                            <View style={uploadPhotoModalStyles.buttonWrapper}>
                                <Pressable
                                    style={({ pressed }) => [
                                        uploadPhotoModalStyles.buttonOutline,
                                        pressed && { backgroundColor: colors.thirdLight }
                                    ]}
                                    onPress={() => props.setOpen(false)}
                                >
                                    <Text style={uploadPhotoModalStyles.buttonOutlineText}>닫기</Text>
                                </Pressable>

                                <Pressable
                                    style={uploadPhotoModalStyles.buttonFill}
                                    onPress={() => navigation.navigate("Detail", { code: props.data?.code ?? 0 })}
                                >
                                    <Text style={uploadPhotoModalStyles.buttonFillText}>이동</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                ) : (
                    <View style={uploadPhotoModalStyles.noData}>
                        <ActivityIndicator size="large" color={colors.textPrimary} />
                    </View>
                )}
                
                {nextCode && (
                    <Pressable
                        onPress={() => {
                            const nextData = props.dataList[props.index + 1];

                            setCode({
                                code: nextData.code,
                                prevCode: nextData.prevCode,
                                nextCode: nextData.nextCode,
                            });
                            props.setIndex(prev => prev + 1);
                        }}
                    >
                        <SimpleLineIcons name="arrow-right" color="white" size={20} />
                    </Pressable>
                )}
            </View>
        </Modal>
    )
}