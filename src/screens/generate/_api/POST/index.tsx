import { privateBase } from "@/util/api";

/**
 * @brief 발자국 생성 관련 POST API
 */

export const postGenerateApi = {
    // 발자국 생성
    postGenerateFoorint: async (formData: FormData) =>
        await (
            await privateBase.post(`/v3/api/foorint`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            })
        ).data.data,
}