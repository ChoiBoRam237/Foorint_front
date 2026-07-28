import { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query";
import { ISelection } from "@/types/selection"
import { IUserImg } from "@/types/response/user";
import { getUploadPhotoApi } from "./_api/GET";
import { useFoorintDetail } from "@/hooks/_api/useFoorintDetail";
import { useCodeStore } from "@/screens/upload-photo/_store/useCodeStore";

/**
 * @brief 업로드한 사진 컨트롤
 */

export const useControlUploadPhoto = () => {
    const { code, setCode } = useCodeStore();
    const [imageList, setImageList] = useState<IUserImg[]>([]);
    const [selectedYear, setSelectedYear] = useState<ISelection>();
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [selectedImgIndex, setSelectedImgIndex] = useState<number>(0);

    // 업로드한 이미지 목록 조회 api
    const {
        data,
        isLoading,
        isFetching
    } = useQuery({
        queryKey: ["images", selectedYear],
        queryFn: () => getUploadPhotoApi.getUserImages(selectedYear?.code ?? -1),
    });

    // 특정 발자국 상세 조회 api
    const { 
        detailLoading, 
        foorintDetail 
    } = useFoorintDetail({ footPrintCode: code! });

    useEffect(() => {
        if (data && data.length > 0) setImageList(data);
    }, [data]);

    return {
        isLoading: isLoading || isFetching,
        detailLoading,
        imageList,
        foorintDetail,
        selectedYear, setSelectedYear,
        modalOpen, setModalOpen,
        selectedImgIndex, setSelectedImgIndex,
        setCode,
    }
}