import React from "react";
import { ActivityIndicator, Image, Modal, Pressable, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { format } from "date-fns";
import { BASE_URL } from "@env";
import { colors } from "@/styles/colors";
import { IModal } from "@/types/modal";
import { ITripDetailResponse } from "@/types/response/trip";
import { RootStackParamList } from "@/navigation/types";
import { placeModalStyles } from "./indexStyles";

/**
 * @brief 여행 장소 모달
 */

interface Props extends IModal {
    isLoading: boolean;
    data: ITripDetailResponse | undefined;
    setSelectedCode: React.Dispatch<React.SetStateAction<number | undefined>>;
}

export const PlaceModal = (props: Props) => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    if (!props.data) return;

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={props.open}
            onRequestClose={() => props.setOpen(false)}
        >
            <View style={placeModalStyles.container}>
                {props.data.prevCode && (
                    <Pressable
                        onPress={() => props.setSelectedCode(props.data?.prevCode)}
                    >
                        <SimpleLineIcons name="arrow-left" color="white" size={20} />
                    </Pressable>
                )}

                {!props.isLoading ? (
                    <View style={placeModalStyles.infoContainer}>
                        <Image
                            style={placeModalStyles.image}
                            src={`${BASE_URL}${props.data.imgList[0].folderName}${props.data.imgList[0].imgUrl}`}
                        />

                        <View style={placeModalStyles.infoWrapper}>
                            <View style={placeModalStyles.contentWrapper}>
                                <View style={placeModalStyles.contentInnerWrapper}>
                                    <View style={placeModalStyles.titleWrapper}>
                                        <Text style={placeModalStyles.title}>{props.data.title}</Text>
                                        
                                        <View style={placeModalStyles.category}>
                                            <View
                                                style={[
                                                    placeModalStyles.categoryCircle,
                                                    { backgroundColor: props.data.category.color ?? "black" }
                                                ]}
                                            />

                                            <Text style={placeModalStyles.categoryName}>{props.data.category.name}</Text>
                                        </View>
                                    </View>

                                    <View style={placeModalStyles.infoInnerWrapper}>
                                        <View style={placeModalStyles.placeInfo}>
                                            <Ionicons name="location-outline" color={colors.textPrimary} size={14} />
                                            <Text style={placeModalStyles.placeInfoText}>{props.data.location}</Text>
                                        </View>

                                        <View style={placeModalStyles.placeInfo}>
                                            <Ionicons name="calendar-outline" color={colors.textPrimary} size={14} />
                                            <Text style={placeModalStyles.placeInfoText}>{format(props.data.startDate, "yyyy.MM.dd")} ~ {format(props.data.endDate, "yyyy.MM.dd")}</Text>
                                        </View>
                                    </View>
                                </View>
                                
                                <Text
                                    style={placeModalStyles.description}
                                    numberOfLines={4}
                                    ellipsizeMode="tail"
                                >
                                    {props.data.description}
                                </Text>
                            </View>

                            <View style={placeModalStyles.buttonWrapper}>
                                <Pressable
                                    style={({ pressed }) => [
                                        placeModalStyles.buttonOutline,
                                        pressed && { backgroundColor: colors.thirdLight }
                                    ]}
                                    onPress={() => props.setOpen(false)}
                                >
                                    <Text style={placeModalStyles.buttonOutlineText}>닫기</Text>
                                </Pressable>

                                <Pressable
                                    style={placeModalStyles.buttonFill}
                                    onPress={() => navigation.navigate("Detail", { code: props.data?.code ?? 0 })}
                                >
                                    <Text style={placeModalStyles.buttonFillText}>이동</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                ) : (
                    <View style={placeModalStyles.noData}>
                        <ActivityIndicator size="large" color={colors.textPrimary} />
                    </View>
                )}
                
                {props.data.nextCode && (
                    <Pressable
                        onPress={() => props.setSelectedCode(props.data?.nextCode)}
                    >
                        <SimpleLineIcons name="arrow-right" color="white" size={20} />
                    </Pressable>
                )}
            </View>
        </Modal>
    )
}