import { useEffect, useRef, useState } from "react";
import { useSharedValue } from "react-native-reanimated"
import { ICarouselInstance } from "react-native-reanimated-carousel";
import { useRoute, RouteProp } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { ITripDetailResponse } from "@/types/response/trip";
import { getDetailApi } from "./_api/GET";
import { RootStackParamList } from "@/navigation/types";

/**
 * @brief 여행 상세 화면
 */

type DetailRouteProp = RouteProp<RootStackParamList, "Detail">;

export const useControlDetail = () => {
    const route = useRoute<DetailRouteProp>();
    const imgProgress = useSharedValue(0);
    const imgRef = useRef<ICarouselInstance>(null);
    const [foorintDetail, setFoorintDetail] = useState<ITripDetailResponse>();

    // 특정 발자국 상세 조회 api
    const { data, isLoading, isFetching } = useQuery({
        queryKey: ["detail"],
        queryFn: () => getDetailApi.getFoorintDetail(route.params.code),
        enabled: !!route.params.code,
    });

    useEffect(() => {
        if (data) setFoorintDetail(data);
    }, [data]);

    return {
        isLoading: isLoading || isFetching,
        imgProgress, imgRef,
        foorintDetail,
    }
}