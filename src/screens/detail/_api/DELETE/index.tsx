import { privateBase } from "@/util/api";

/**
 * @brief 여행 상세 화면 관련 DELETE API
 */

export const deleteDetailApi = {
    // 발자국 삭제
    deleteFootPrint: async (footPrintCode: number) =>
        await (
            await privateBase.delete(`/v3/api/foorint/${footPrintCode}`)
        ).data.data,
}