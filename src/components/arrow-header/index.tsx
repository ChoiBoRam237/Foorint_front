import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigation/types";
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import { colors } from "@/styles/colors";
import { arrowHeaderStyles } from "./indexStyles";
import { OverflowMenuComponent } from "../overflow-menu";

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
    const [menuOpen, setMenuOpen] = useState<boolean>(false);

    return (
        <View style={arrowHeaderStyles.container}>
            <Pressable
                onPress={() => {
                    if (navigation.canGoBack()) {
                        navigation.goBack();
                    }
                }}
            >
                <SimpleLineIcons name="arrow-left" color={colors.thirdDark} size={18} />
            </Pressable>

            {props.title && (
                <View style={arrowHeaderStyles.wrapper}>
                    <Text style={arrowHeaderStyles.title}>{props.title}</Text>
                </View>
            )}

            {(props.options && props.options.length > 0) && (
                <Pressable
                    style={arrowHeaderStyles.dots}
                    onPress={() => setMenuOpen(true)}
                >
                    <Entypo name="dot-single" color={colors.thirdDark} size={16} style={arrowHeaderStyles.dot} />
                    <Entypo name="dot-single" color={colors.thirdDark} size={16} style={arrowHeaderStyles.dot} />
                    <Entypo name="dot-single" color={colors.thirdDark} size={16} />
                </Pressable>
            )}

            <OverflowMenuComponent
                open={menuOpen}
                setOpen={setMenuOpen}
                options={props.options ?? []}
            />
        </View>
    )
}