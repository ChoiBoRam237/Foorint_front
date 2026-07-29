import { privateBase } from "@/util/api";

/**
 * @brief 발자국 수정 관련 PATCH API
 */

export const patchUpdateApi = {
    // 발자국 수정
    patchFoorint: async (footPrintCode: number, formData: FormData) =>
        await (
            await privateBase.patch(`/v3/api/foorint/update`, formData, {
                params: { footPrintCode },
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            })
        ).data.data,
}