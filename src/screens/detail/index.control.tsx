import { useRoute, RouteProp } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigation/types";
import { useFoorintDetail } from "@/hooks/_api/useFoorintDetail";
import { useMutation } from "@tanstack/react-query";
import { deleteDetailApi } from "./_api/DELETE";
import { AxiosError } from "axios";

/**
 * @brief 여행 상세 화면
 */

type DetailRouteProp = RouteProp<RootStackParamList, "Detail">;

export const useControlDetail = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const route = useRoute<DetailRouteProp>();

    // 특정 발자국 상세 조회 api
    const { 
        detailLoading, 
        foorintDetail 
    } = useFoorintDetail({ footPrintCode: route.params.code });

    // 발자국 삭제 api
    const deleteFoorint = useMutation({
        mutationFn: () => deleteDetailApi.deleteFootPrint(route.params.code),
        onSuccess: () => {
            if (navigation.canGoBack()) navigation.goBack();
            else navigation.replace("List");
        },
        onError: (error: AxiosError) => {
            console.error("발자국 삭제 에러 : ", error);
        }
    });

    const onDeleteFoorint = () => {
        deleteFoorint.mutate();
    }

    const onUpdateFoorint = () => {
        navigation.navigate("Update", { code: route.params.code });
    }

    return {
        detailLoading,
        foorintDetail,
        onDeleteFoorint, onUpdateFoorint,
    }
}