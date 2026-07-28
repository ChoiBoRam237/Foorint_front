import { useEffect, useRef, useState } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { ITripMonthResponse } from "@/types/response/trip";
import { useQuery } from "@tanstack/react-query";
import { getHomeApi } from "./_api/GET";

/**
 * @brief 홈화면 컨트롤
 */

export const useControlHome = () => {
    const [monthList, setMonthList] = useState<ITripMonthResponse[]>([]);
    const [selectedMonth, setSelectedMonth] = useState<Date>(new Date());
    const [selectedDay, setSelectedDay] = useState<Date>(new Date());
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    // 월별 발자국 목록 조회 api
    const { data } = useQuery({
        queryKey: ["month", selectedMonth],
        queryFn: () => getHomeApi.getFoorintMonth(selectedMonth),
        enabled: !!selectedMonth
    });

    const handlePresentModalPress = () => {
        requestAnimationFrame(() => {
            bottomSheetModalRef.current?.present();
        });
    };

    useEffect(() => {
        if (data) setMonthList(data);
    }, [data]);

    return {
        monthList,

        selectedMonth, setSelectedMonth,
        selectedDay, setSelectedDay,
        bottomSheetModalRef,
        handlePresentModalPress,
    }
}