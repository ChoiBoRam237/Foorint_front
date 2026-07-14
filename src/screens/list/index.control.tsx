import { useState } from "react"
import { ISelection } from "@/types/selection"

/**
 * @brief 리스트 컨트롤
 */

const yearList = [
    { code: 1, name: "전체" },
    { code: 2, name: "2026" },
    { code: 3, name: "2025" },
    { code: 4, name: "2024" },
    { code: 5, name: "2023" },
    { code: 6, name: "2022" },
    { code: 7, name: "2021" },
    { code: 8, name: "2020" },
    { code: 9, name: "2019" },
];

const filterList = [
    { code: 1, name: "국내여행" },
    { code: 2, name: "해외여행" },
]

export const useControlList = () => {
    const [selectedYear, setSelectedYear] = useState<ISelection>(yearList[0]);
    const [selectedFilter, setSelectedFilter] = useState<ISelection>(filterList[0]);

    return {
        yearList, filterList,
        selectedYear, setSelectedYear,
        selectedFilter, setSelectedFilter,
    }
}