import { useEffect, useRef, useState } from "react"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { BottomSheetModal } from "@gorhom/bottom-sheet"
import { RootStackParamList } from "@/navigation/types";
import { keychain } from "@/util/keychain";
import { IUserDetail } from "@/types/response/user";
import { useUserInfo } from "@/hooks/useUserInfo";
import { useQuery } from "@tanstack/react-query";
import { getMypageApi } from "./_api/GET";

/**
 * @brief 마이페이지 컨트롤
 */

export const useControlMypage = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const [userCode, setUserCode] = useState<number>();
    const [mypageInfo, setMypageInfo] = useState<IUserDetail>();
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    // 특정 유저 정보 조회 api
    const {
        data,
        isLoading,
        isFetching
    } = useQuery({
        queryKey: ["userDetail", userCode],
        queryFn: () => getMypageApi.getUser(userCode!),
        enabled: !!userCode,
    });

    const handlePresentModalPress = () => {
        requestAnimationFrame(() => {
            bottomSheetModalRef.current?.present();
        });
    };

    const onLogout = async () => {
        await keychain.clearKeychain();
        navigation.replace("Login");
    }

    useEffect(() => {
        const loadUser = async () => {
            const user = await useUserInfo();
            setUserCode(user.userCode);
        };
    
        loadUser();
    }, []);

    useEffect(() => {
        if (data) setMypageInfo(data);
    }, [data]);

    return {
        isLoading: isLoading || isFetching,
        mypageInfo,
        bottomSheetModalRef,
        handlePresentModalPress,

        onLogout,
    }
}