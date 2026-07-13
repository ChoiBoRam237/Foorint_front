import { Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigation/types";
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import { colors } from "@/styles/colors";
import { arrowHeaderStyles } from "./indexStyles";

/**
 * @brief 화살표 헤더 컴포넌트
 */

interface Props {
    title?: string;
    options?: {
        text: string;
        textColor: string;
        onClick: () => void;
    }[];
}

export const ArrowHeaderComponent = (props: Props) => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    return (
        <View style={arrowHeaderStyles.container}>
            <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                    if (navigation.canGoBack()) {
                        navigation.goBack();
                    }
                }}
            >
                <SimpleLineIcons name="arrow-left" color={colors.thirdDark} size={28} />
            </TouchableOpacity>

            {props.title && (
                <View style={arrowHeaderStyles.wrapper}>
                    <Text style={arrowHeaderStyles.title}>{props.title}</Text>
                </View>
            )}

            {(props.options && props.options.length > 0) && (
                <TouchableOpacity
                    activeOpacity={1}
                >
                    <Entypo name="dots-three-horizontal" color={colors.thirdDark} size={28} />
                </TouchableOpacity>
            )}
        </View>
    )
}