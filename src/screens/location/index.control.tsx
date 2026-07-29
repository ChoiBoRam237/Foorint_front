import { useEffect, useState } from "react"
import { ISelection } from "@/types/selection"
import { IUserLocation } from "@/types/response/user";
import { useQuery } from "@tanstack/react-query";
import { getLocationApi } from "./_api/GET";
import { useFoorintDetail } from "@/hooks/_api/useFoorintDetail";

/**
 * @brief 여행 장소 컨트롤
 */

export const useControlLocation = () => {
    const [locationList, setLocationList] = useState<IUserLocation[]>([]);
    const [selectedYear, setSelectedYear] = useState<ISelection>();
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [selectedCode, setSelectedCode] = useState<number>();

    // 업로드한 이미지 목록 조회 api
    const {
        data,
        isLoading,
        isFetching
    } = useQuery({
        queryKey: ["images", selectedYear],
        queryFn: () => getLocationApi.getUserLocation(selectedYear?.code ?? -1),
    });

    // 특정 발자국 상세 조회 api
    const { 
        detailLoading, 
        foorintDetail 
    } = useFoorintDetail({ footPrintCode: selectedCode! });

    useEffect(() => {
        if (data && data.length > 0) setLocationList(data);
    }, [data]);

    return {
        isLoading: isLoading || isFetching,
        detailLoading,
        locationList,
        foorintDetail,
        selectedYear, setSelectedYear,
        modalOpen, setModalOpen,
        selectedCode, setSelectedCode,
    }
}