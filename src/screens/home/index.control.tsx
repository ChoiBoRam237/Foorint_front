import { useRef, useState } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

/**
 * @brief 홈화면 컨트롤
 */

export const useControlHome = () => {
    const [selectedDate, setSelectedDate] = useState<Date>();
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    const handlePresentModalPress = () => {
        requestAnimationFrame(() => {
            bottomSheetModalRef.current?.present();
        });
    };

    return {
        selectedDate, setSelectedDate,
        bottomSheetModalRef,
        handlePresentModalPress,
    }
}