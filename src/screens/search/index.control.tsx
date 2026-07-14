import { useState } from "react"
import { ISelection } from "@/types/selection";

/**
 * @brief 검색 리스트 컨트롤
 */

const filterList = [
    { code: 1, name: "국내여행" },
    { code: 2, name: "해외여행" },
]

export const useControlSearch = () => {
    const [searchValue, setSearchValue] = useState<string>("");
    const [selectedFilter, setSelectedFilter] = useState<ISelection>(filterList[0]);

    return {
        searchValue, setSearchValue,
        filterList,
        selectedFilter, setSelectedFilter,
    }
}