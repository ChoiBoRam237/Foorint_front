import { useRef } from "react"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { BottomSheetModal } from "@gorhom/bottom-sheet"
import { RootStackParamList } from "@/navigation/types";
import { keychain } from "@/util/keychain";

/**
 * @brief 마이페이지 컨트롤
 */

export const useControlMypage = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    const handlePresentModalPress = () => {
        requestAnimationFrame(() => {
            bottomSheetModalRef.current?.present();
        });
    };

    const onLogout = async () => {
        await keychain.clearKeychain();
        navigation.replace("Login");
    }

    return {
        bottomSheetModalRef,
        handlePresentModalPress,

        onLogout,
    }
}