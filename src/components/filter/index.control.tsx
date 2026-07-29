import { useEffect } from "react";
import { FilterProps } from ".";
import { useCategory } from "@/hooks/_api/useCategory";

/**
 * @brief 필터 컴포넌트 컨트롤
 */

export const useControlFilter = (props: FilterProps) => {
    
    // 내가 만든 카테고리 조회 hook
    const { categoryList } = useCategory({
        includeAllOption: true
    });

    useEffect(() => {
        if (!props.value) props.setValue(categoryList[0]);
    }, [categoryList]);

    return {
        categoryList,
    }
}