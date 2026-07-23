import { privateBase } from "@/util/api";

/**
 * @brief 여행 상세 화면 관련 GET API
 */

export const getDetailApi = {
    // 특정 발자국 상세 조회
    getFoorintDetail: async (footPrintCode: number) =>
        await (
            await privateBase.get(`/v3/api/foorint/${footPrintCode}`)
        ).data.data,
}