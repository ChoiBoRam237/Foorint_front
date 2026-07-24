import { useState } from "react"
import { ISelection } from "@/types/selection";
import { useFoorintList } from "@/hooks/_api/useFoorintList";

/**
 * @brief 검색 리스트 컨트롤
 */

export const useControlSearch = () => {
    const [searchValue, setSearchValue] = useState<string>("");
    const [selectedFilter, setSelectedFilter] = useState<ISelection>();

    const {
        listLoading,
        foorintList,
    } = useFoorintList({
        categoryCode: selectedFilter?.code ?? 0,
        keyword: searchValue,
    });

    return {
        listLoading, foorintList,
        searchValue, setSearchValue,
        selectedFilter, setSelectedFilter,
    }
}