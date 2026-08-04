import { publicBase } from "@/util/api";
import { ILoginRequest } from "@/types/request/login";

/**
 * @brief 로그인 관련 GET API
 */

export const postLoginApi = {
    // 카카오 로그인
    postKakaoLogin: async(request: ILoginRequest) =>
        await (
            await publicBase.post(`/v3/api/login/kakao`, request)
        ).data.data,

    // 구글 로그인
    postGoogleLogin: async (request: ILoginRequest) =>
        await (
            await publicBase.post(`/v3/api/login/google`, request)
        ).data.data,
}