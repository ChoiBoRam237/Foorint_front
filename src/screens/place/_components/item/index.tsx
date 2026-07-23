import { Pressable, Text, View } from "react-native"
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from "@/styles/colors";
import { ITripPlaceResponse } from "@/types/response/trip";
import { PlaceModal } from "../modal";
import { placeItemStyles } from "./indexStyles"
import { useControlPlaceItem } from "./index.control";

/**
 * @brief 여행 장소 아이템
 */

interface Props {
    data: ITripPlaceResponse;
}

const data = {
    code: 1,
    title: "처음으로 빠지에 가다.",
    category: {
        code: 1,
        color: "#FF0000",
        name: "국내 여행"
    },
    location: "경기도 가평시",
    startDate: new Date(2026, 7, 17),
    endDate: new Date(2026, 7, 19),
    description: "친구들과 가평 빠지에 놀러갔다.",
    imgUrl: "",
}

export const PlaceItem = (props: Props) => {
    const controller = useControlPlaceItem();

    return (
        <>
            <Pressable
                style={({ pressed }) => [
                    placeItemStyles.container,
                    pressed && { backgroundColor: colors.thirdLight }
                ]}
                onPress={() => controller.setModalOpen(true)}
            >
                <View style={placeItemStyles.wrapper}>
                    <Ionicons name="location-outline" color={colors.textPrimary} size={20} />
                    <Text style={placeItemStyles.placeName}>{props.data.placeName}</Text>
                </View>

                <Text style={placeItemStyles.placeNumber}>{props.data.visitCount}번 방문</Text>
            </Pressable>

            <PlaceModal
                open={controller.modalOpen}
                setOpen={controller.setModalOpen}
                data={data}
            />
        </>
    )
}