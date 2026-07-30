import { useState } from "react";
import { useUserInfo } from "@/hooks/useUserInfo";

/**
 * @brief 고객센터 채팅 컨트롤
 */

export const useControlChat = () => {
    const { userCode } = useUserInfo();
    const [chatValue, setChatValue] = useState<string>("");
    
    return {
        userCode,
        chatValue, setChatValue,
    }
}