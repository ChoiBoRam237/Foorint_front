import { publicBase } from "@/util/api";

/**
 * @brief 로그인 관련 GET API
 */

export const postLoginApi = {
    // 카카오 로그인
    postKakaoLogin: async(accessToken: string) =>
        await (
            await publicBase.post(`/v3/api/login/kakao`, { accessToken })
        ).data.data,

    // 구글 로그인
    postGoogleLogin: async (idToken: string) =>
        await (
            await publicBase.post(`/v3/api/login/google`, { idToken })
        ).data.data,
}