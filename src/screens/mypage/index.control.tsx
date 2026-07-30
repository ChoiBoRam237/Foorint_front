import { useEffect, useRef, useState } from "react"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { BottomSheetModal } from "@gorhom/bottom-sheet"
import { RootStackParamList } from "@/navigation/types";
import { keychain } from "@/util/keychain";
import { IUserDetail } from "@/types/response/user";
import { useUserInfo } from "@/hooks/useUserInfo";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getMypageApi } from "./_api/GET";
import { deleteMypageApi } from "./_api/DELETE";
import { AxiosError } from "axios";

/**
 * @brief 마이페이지 컨트롤
 */

export const useControlMypage = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const { userCode } = useUserInfo();
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

    // 계정 탈퇴 api
    const deleteUser = useMutation({
        mutationFn: () => deleteMypageApi.deleteUser(userCode!),
        onSuccess: () => {
            onLogout();
        },
        onError: (error: AxiosError) => {
            console.error("계정 삭제 에러 : ", error);
        }
    });

    // bottom sheet 열기
    const handlePresentModalPress = () => {
        requestAnimationFrame(() => {
            bottomSheetModalRef.current?.present();
        });
    };

    // 로그아웃
    const onLogout = async () => {
        await keychain.clearKeychain();
        navigation.replace("Login");
    }

    // 계정 탈퇴
    const onExit = () => {
        deleteUser.mutate();
    }

    useEffect(() => {
        if (data) setMypageInfo(data);
    }, [data]);

    return {
        isLoading: isLoading || isFetching,
        mypageInfo,
        bottomSheetModalRef,
        handlePresentModalPress,

        onLogout, onExit,
    }
}