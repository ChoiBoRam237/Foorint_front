import { privateBase } from "@/util/api";

/**
 * @brief 년도 선택 관련 GET API
 */

export const getYearSelectionApi = {
    // 내가 발자국 업로드한 년도 목록 조회
    getYearList: async () =>
        await (
            await privateBase.get(`/v3/api/foorint/year`)
        ).data.data,
}