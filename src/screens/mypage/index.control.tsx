import { useRef } from "react"
import { BottomSheetModal } from "@gorhom/bottom-sheet"

/**
 * @brief 마이페이지 컨트롤
 */

export const useControlMypage = () => {
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    const handlePresentModalPress = () => {
        requestAnimationFrame(() => {
            bottomSheetModalRef.current?.present();
        });
    };

    return {
        bottomSheetModalRef,
        handlePresentModalPress,
    }
}