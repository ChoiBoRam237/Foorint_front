import { useState } from "react"
import { ISelection } from "@/types/selection"

/**
 * @brief 여행 장소 컨트롤
 */

const yearList = [
    { code: 1, name: "전체" },
    { code: 2, name: "2026" },
    { code: 3, name: "2025" },
]

export const useControlPlace = () => {
    const [selectedYear, setSelectedYear] = useState<ISelection>(yearList[0]);

    return {
        yearList,
        selectedYear, setSelectedYear,
    }
}