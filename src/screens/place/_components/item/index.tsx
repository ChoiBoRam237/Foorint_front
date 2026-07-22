import { Pressable, Text, View } from "react-native"
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from "@/styles/colors";
import { ITripPlace } from "@/types/trip";
import { placeItemStyles } from "./indexStyles"

/**
 * @brief 여행 장소 아이템
 */

interface Props {
    data: ITripPlace;
}

export const PlaceItem = (props: Props) => {
    return (
        <Pressable
            style={({ pressed }) => [
                placeItemStyles.container,
                pressed && { backgroundColor: colors.thirdLight }
            ]}
        >
            <View style={placeItemStyles.wrapper}>
                <Ionicons name="location-outline" color={colors.textPrimary} size={20} />
                <Text style={placeItemStyles.placeName}>{props.data.placeName}</Text>
            </View>

            <Text style={placeItemStyles.placeNumber}>{props.data.visitCount}번 방문</Text>
        </Pressable>
    )
}