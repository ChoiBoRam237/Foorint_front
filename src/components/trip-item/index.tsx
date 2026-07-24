import { Image, Pressable, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigation/types";
import { ITripResponse } from "@/types/response/trip";
import { tripItemStyles } from "./indexStyles";
import { BASE_URL } from "@env";

/**
 * @brief 여행 아이템 컴포넌트
 */

interface Props {
    data: ITripResponse;
}

export const TripItemComponent = (props: Props) => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    return (
        <Pressable
            style={tripItemStyles.container}
            onPress={() => navigation.navigate("Detail", { code: props.data.code })}
        >
            <Image
                style={tripItemStyles.image}
                src={`${BASE_URL}${props.data.imgUrl.folderName}${props.data.imgUrl.imgUrl}`}
            />

            <View style={tripItemStyles.content}>
                <View style={tripItemStyles.titleWrapper}>
                    <Text style={tripItemStyles.title}>{props.data.title}</Text>

                    <View style={tripItemStyles.category}>
                        <View
                            style={[
                                tripItemStyles.categoryCircle,
                                { backgroundColor: props.data.category?.color ?? "black" }
                            ]}
                        />

                        <Text style={tripItemStyles.categoryText}>{props.data.category.name}</Text>
                    </View>
                </View>

                <Text
                    style={tripItemStyles.description}
                    numberOfLines={4}
                    ellipsizeMode="tail"
                >
                    {props.data.description}
                </Text>
            </View>
        </Pressable>
    )
}