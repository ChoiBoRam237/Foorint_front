import { useState } from "react";

/**
 * @brief 여행 장소 아이템 컨트롤
 */

export const useControlPlaceItem = () => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    return {
        modalOpen, setModalOpen,
    }
}