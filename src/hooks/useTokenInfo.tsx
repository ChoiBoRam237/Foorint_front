import { useEffect, useState } from "react";
import { keychain } from "@/util/keychain";
import { IToken } from "@/types/token";

/**
 * @brief 토큰 정보 hook
 * @returns
 * accessToken: 액세스 토큰
 * refreshToken: 리프레시 토큰
 */

export const useTokenInfo = () => {
    const [tokenInfo, setTokenInfo] = useState<IToken>();

    useEffect(() => {
        const getTokenInfo = async () => {
            const token = await keychain.getKeychain();
            const parseToken = token && JSON.parse(token.password);

            if (parseToken) {
                setTokenInfo({
                    accessToken: parseToken.accessToken,
                    refreshToken: parseToken.refreshToken,
                });
            }
        };

        getTokenInfo();
    }, []);
    
    return {
        accessToken: tokenInfo?.accessToken,
        refreshToken: tokenInfo?.refreshToken,
    }
}