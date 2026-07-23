import { Image, Modal, Pressable, Text, View } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { format } from "date-fns";
import { IModal } from "@/types/modal";
import { colors } from "@/styles/colors";
import { ITripDetailResponse } from "@/types/response/trip";
import { placeModalStyles } from "./indexStyles";

/**
 * @brief 여행 장소 모달
 */

interface Props extends IModal {
    data: ITripDetailResponse;
}

export const UploadPhotoModal = (props: Props) => {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={props.open}
            onRequestClose={() => props.setOpen(false)}
        >
            <View style={placeModalStyles.container}>
                <Pressable>
                    <SimpleLineIcons name="arrow-left" color="white" size={20} />
                </Pressable>

                <View style={placeModalStyles.infoContainer}>
                    <Image
                        style={placeModalStyles.image}
                    />

                    <View style={placeModalStyles.infoWrapper}>
                        <View style={placeModalStyles.contentWrapper}>
                            <View style={placeModalStyles.titleWrapper}>
                                <Text style={placeModalStyles.title}>{props.data.title}</Text>
                                
                                <View style={placeModalStyles.category}>
                                    <View
                                        style={[
                                            placeModalStyles.categoryCircle,
                                            { backgroundColor: props.data.category.color }
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
                            >
                                <Text style={placeModalStyles.buttonFillText}>이동</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
                
                <Pressable>
                    <SimpleLineIcons name="arrow-right" color="white" size={20} />
                </Pressable>
            </View>
        </Modal>
    )
}