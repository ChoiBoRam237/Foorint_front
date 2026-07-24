import { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query";
import { ISelection } from "@/types/selection"
import { getYearSelectionApi } from "./_api/GET";
import { YearSelectionProps } from ".";

/**
 * @brief 년도 선택 컴포넌트 컨트롤
 */

export const useControlYearSelection = (props: YearSelectionProps) => {
    const [yearList, setYearList] = useState<ISelection[]>([]); // 년도 리스트

    // 내가 발자국 업로드한 년도 목록 조회 api
    const { data } = useQuery({
        queryKey: ["year"],
        queryFn: () => getYearSelectionApi.getYearList(),
    });

    useEffect(() => {
        if (data) setYearList(data);
        if (!props.value) props.setValue(data[0]);
    }, [data]);

    return {
        yearList,
    }
}