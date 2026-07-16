import { AxiosRequestConfig } from "axios";
import { publicBase } from "../api";

/**
 * @brief 공통 API
 */

export const commonApi = {
    // 액세스 토큰 재발급
    getRefreshToken: async (config: AxiosRequestConfig<any>) =>
        await (
            await publicBase.get(`/v3/api/token/refresh`, config)
        ).data.data,
}