import { useRef } from "react";
import { useSharedValue } from "react-native-reanimated"
import { ICarouselInstance } from "react-native-reanimated-carousel";

/**
 * @brief 여행 상세 화면
 */

export const useControlDetail = () => {
    const imgProgress = useSharedValue(0);
    const imgRef = useRef<ICarouselInstance>(null);

    return {
        imgProgress, imgRef,
    }
}