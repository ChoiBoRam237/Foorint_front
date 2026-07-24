import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { commonApi } from "@/util/_api";
import { ISelection } from "@/types/selection";
import { FilterProps } from ".";

/**
 * @brief 필터 컴포넌트 컨트롤
 */

export const useControlFilter = (props: FilterProps) => {
    const [filterList, setFilterList] = useState<ISelection[]>([]);

    // 내가 만든 카테고리 조회 api
    const { data } = useQuery({
        queryKey: ["category"],
        queryFn: () => commonApi.getCategory(true),
    });

    useEffect(() => {
        if (data) setFilterList(data);
        if (!props.value) props.setValue(data[0]);
    }, [data]);

    return {
        filterList,
    }
}