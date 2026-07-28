import { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query";
import { ISelection } from "@/types/selection";
import { commonApi } from "@/util/_api";
import { queryClient } from "../../../queryClient";

/**
 * @brief 카테고리 목록 조회 API Hook
 */

export const useCategory = () => {
    const [categoryList, setCategoryList] = useState<ISelection[]>([]);

    // 내가 만든 카테고리 조회 api
    const { data } = useQuery({
        queryKey: ["category"],
        queryFn: () => commonApi.getCategory(),
    });

    const onCategoryFetch = () => {
        queryClient.invalidateQueries({
            queryKey: ["category"]
        });
    }

    useEffect(() => {
        if (data && data.length > 0) setCategoryList(data);
    }, [data]);

    return {
        categoryList,
        onCategoryFetch,
    }
}