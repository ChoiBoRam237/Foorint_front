import { useRoute, RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "@/navigation/types";
import { useFoorintDetail } from "@/hooks/_api/useFoorintDetail";

/**
 * @brief 여행 상세 화면
 */

type DetailRouteProp = RouteProp<RootStackParamList, "Detail">;

export const useControlDetail = () => {
    const route = useRoute<DetailRouteProp>();

    // 특정 발자국 상세 조회 api
    const { 
        detailLoading, 
        foorintDetail 
    } = useFoorintDetail({ footPrintCode: route.params.code });

    return {
        detailLoading,
        foorintDetail,
    }
}