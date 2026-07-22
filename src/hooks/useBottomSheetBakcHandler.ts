import { useCallback, useRef } from 'react';
import { BackHandler, NativeEventSubscription } from 'react-native';
import { BottomSheetModal, BottomSheetModalProps } from '@gorhom/bottom-sheet';

/**
 * @brief 뒤로가기 버튼 클릭 시 bottom sheet 닫기 Hook
 */

const useBottomSheetBackHandler = (
    bottomSheetRef:
        | React.RefObject<BottomSheetModal | null>
        | React.ForwardedRef<BottomSheetModal>,
) => {
    const backHandlerSubscriptionRef = useRef<NativeEventSubscription | null>(null);
    
    const handleSheetPositionChange = useCallback<NonNullable<BottomSheetModalProps['onChange']>>(
        index => {
            const isBottomSheetVisible = index >= 0;

            if (isBottomSheetVisible && !backHandlerSubscriptionRef.current) {
                backHandlerSubscriptionRef.current = BackHandler.addEventListener(
                    'hardwareBackPress',
                    () => {
                        if (bottomSheetRef && typeof bottomSheetRef !== 'function')
                        bottomSheetRef.current?.dismiss();

                        return true;
                    },
                );
            } else if (!isBottomSheetVisible) {
                backHandlerSubscriptionRef.current?.remove();
                backHandlerSubscriptionRef.current = null;
            }
        },
        [bottomSheetRef, backHandlerSubscriptionRef],
    );
    
    return { handleSheetPositionChange };
    
};
  
export default useBottomSheetBackHandler;