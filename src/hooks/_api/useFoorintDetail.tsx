import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ITripDetailResponse } from "@/types/response/trip";
import { commonApi } from "@/util/_api";

/**
 * @brief 특정 발자국 상세 조회 API Hook
 */

interface Props {
    footPrintCode: number
}

export const useFoorintDetail = (props: Props) => {
    const [foorintDetail, setFoorintDetail] = useState<ITripDetailResponse>();

    const { data, isLoading, isFetching } = useQuery({
        queryKey: ["list", props.footPrintCode],
        queryFn: () => commonApi.getFoorintDetail(props.footPrintCode),
        enabled: !!props.footPrintCode,
    });

    useEffect(() => {
        if (data) setFoorintDetail(data)
    }, [data]);

    return {
        detailLoading: isLoading || isFetching,
        foorintDetail,
    }
}