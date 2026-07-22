import { useState } from "react"
import { ISelection } from "@/types/selection"

/**
 * @brief 업로드한 사진 컨트롤
 */

const yearList = [
    { code: 1, name: "전체" },
    { code: 2, name: "2026" },
    { code: 3, name: "2025" },
]

export const useControlUploadPhoto = () => {
    const [selectedYear, setSelectedYear] = useState<ISelection>(yearList[0]);
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    return {
        yearList,
        selectedYear, setSelectedYear,
        modalOpen, setModalOpen,
    }
}