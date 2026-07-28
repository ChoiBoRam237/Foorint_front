import { privateBase } from "@/util/api";

/**
 * @brief 업로드한 사진 관련 GET API
 */

export const getUploadPhotoApi = {
    // 업로드한 이미지 목록 조회
    getUserImages: async (year: number) =>
        await (
            await privateBase.get(`/v3/api/user/images`, {
                params: { year }
            })
        ).data.data,
}