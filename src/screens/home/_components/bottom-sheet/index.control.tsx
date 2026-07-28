import { useEffect, useState } from "react";
import { ITripDayResponse } from "@/types/response/trip";
import { BottomSheetProps } from ".";
import { useQuery } from "@tanstack/react-query";
import { getHomeApi } from "../../_api/GET";

/**
 * @brief 홈화면 바텀 시트 컨트롤
 */

export const useControlHomeBottomSheet = (props: BottomSheetProps) => {
    const [dayList, setDayList] = useState<ITripDayResponse[]>([]);

    // 일별 발자국 목록 조회 api
    const {
        data,
        isLoading,
        isFetching
    } = useQuery({
        queryKey: ["day", props.value],
        queryFn: () => getHomeApi.getFoorintDay(props.value),
        enabled: !!props.value
    });

    useEffect(() => {
        if (data) setDayList(data);
    }, [data]);

    return {
        isLoading: isLoading || isFetching,
        dayList,
    }
}