import { useState } from "react"
import { ISelection } from "@/types/selection"
import { useFoorintList } from "@/hooks/_api/useFoorintList";

/**
 * @brief 리스트 컨트롤
 */

export const useControlList = () => {
    const [selectedYear, setSelectedYear] = useState<ISelection>();
    const [selectedFilter, setSelectedFilter] = useState<ISelection>();
    
    const {
        listLoading,
        foorintList,
    } = useFoorintList({
        year: selectedYear?.code ?? 0,
        categoryCode: selectedFilter?.code ?? 0,
    });

    return {
        listLoading, foorintList,
        selectedYear, setSelectedYear,
        selectedFilter, setSelectedFilter,
    }
}