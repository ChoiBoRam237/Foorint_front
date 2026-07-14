import { Pressable, Text, View } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { colors } from "@/styles/colors"
import { RootStackParamList } from "@/navigation/types"
import { footerStyles } from "./indexStyles"

/**
 * @brief 푸터 컴포넌트
 */

interface Props {
    target: string;
}

export const FooterComponent = (props: Props) => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const insets = useSafeAreaInsets();

    return (
        <View 
            style={[
                footerStyles.container,
                { bottom: insets.bottom }
            ]}
        >
            <View style={footerStyles.wrapper}>
                <Pressable
                    style={footerStyles.item}
                    onPress={() => navigation.navigate("Home")}
                >
                    {props.target === "Home" ? (
                        <Ionicons name="home-sharp" color={colors.thirdDark} size={25} />
                    ) : (
                        <Ionicons name="home-outline" color="white" size={25} />
                    )}
                    <Text 
                        style={[
                            footerStyles.itemText,
                            props.target === "Home" && { color: colors.textPrimary }
                        ]}
                    >
                        Home
                    </Text>
                </Pressable>

                <Pressable
                    style={footerStyles.item}
                    onPress={() => navigation.navigate("List")}
                >
                    <Feather name="list" color={props.target === "List" ? colors.thirdDark : "white"} size={25} />
                    <Text 
                        style={[
                            footerStyles.itemText,
                            props.target === "List" && { color: colors.textPrimary }
                        ]}
                    >
                        List
                    </Text>
                </Pressable>

                <Pressable
                    style={footerStyles.plusButton}
                    onPress={() => navigation.navigate("Generate")}
                >
                    <Feather name="plus" color="white" size={30} />
                </Pressable>

                <Pressable
                    style={footerStyles.item}
                    onPress={() => navigation.navigate("Search")}
                >
                    <AntDesign name="search1" color={props.target === "Search" ? colors.thirdDark : "white"} size={25} />
                    <Text 
                        style={[
                            footerStyles.itemText,
                            props.target === "Search" && { color: colors.textPrimary }
                        ]}
                    >
                        Search
                    </Text>
                </Pressable>

                <Pressable
                    style={footerStyles.item}
                >
                    {props.target === "My" ? (
                        <Ionicons name="person" color={colors.thirdDark} size={25} />
                    ) : (
                        <Ionicons name="person-outline" color="white" size={25} />
                    )}
                    <Text 
                        style={[
                            footerStyles.itemText,
                            props.target === "My" && { color: colors.textPrimary }
                        ]}
                    >
                        My
                    </Text>
                </Pressable>
            </View>
        </View>
    )
}