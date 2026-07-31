import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { commonApi } from "@/util/_api";
import { asyncStorage } from "@/util/asyncStorage";

/**
 * @brief 고객센터 채팅방 생성 API Hook
 */

interface Props {
    onSuccess: (customerRoomCode: number) => void;
}

export const useCustomerRoom = (props: Props) => {
    // 고객센터 채팅방 생성 api
    const generateCustomerRoom = useMutation({
        mutationFn: () => commonApi.postGenerateCustomerRoom(),
        onSuccess: async (data) => {
            const userInfo = await asyncStorage.getAsyncStorage("userInfo");

            if (userInfo) {
                await asyncStorage.setAsyncStorage(
                    "userInfo",
                    JSON.stringify({
                        ...userInfo,
                        customerRoomCode: data.code,
                    })
                );
            }
            props.onSuccess(data.code);
        },
        onError: (error: AxiosError) => {
            console.error("고객센터 채팅방 생성 에러 : ", error);
        }
    });

    const onGenerateCustomerRoom = () => {
        generateCustomerRoom.mutate();
    }

    return { onGenerateCustomerRoom };
}