import { useEffect, useRef, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSharedValue } from "react-native-reanimated";
import { ICarouselInstance } from "react-native-reanimated-carousel";
import { AxiosError } from "axios";
import { ISelection } from "@/types/selection";
import { commonApi } from "@/util/_api";
import { postFormApi } from "./_api/POST";
import { queryClient } from "../../../queryClient";

/**
 * @brief 폼 컨트롤
 */

export const formatDateTime = (date: Date | null) => {
    if (!date) return null;
    return date.toISOString().slice(0, 19);
};

export const useControlForm = () => {
    const [startDateOpen, setStartDateOpen] = useState<boolean>(false); // 시작 날짜 선택 모달
    const [endDateOpen, setEndDateOpen] = useState<boolean>(false); // 종료 날짜 선택 모달
    const [focusedField, setFocusedField] = useState<string | null>(null);
    const [categoryList, setCategoryList] = useState<ISelection[]>([]); // 카테고리 목록
    const [addCategory, setAddCategory] = useState<boolean>(false); // 카테고리 추가 여부
    const [categoryName, setCategoryName] = useState<string>(""); // 추가할 카테고리 이름
    const [categoryColor, setCategoryColor] = useState<string>("#000000"); // 추가할 카테고리 색상
    const [colorPickerOpen, setColorPickerOpen] = useState<boolean>(false); // 색상 선택 오픈 여부
    const imgRef = useRef<ICarouselInstance>(null);
    const imgProgress = useSharedValue<number>(0);
    const [isProcessing, setIsProcessing] = useState(false);

    // 카테고리 생성 api
    const postGenerateCategory = useMutation({
        mutationFn: async () => {
            const data = {
                name: categoryName,
                color: categoryColor,
            };
            return await postFormApi.postGenerateCategory(data);
        },
        onSuccess: () => {
            setCategoryName("");
            setCategoryColor("#000000");
            setAddCategory(false);
            setColorPickerOpen(false);
            queryClient.invalidateQueries({
                queryKey: ["category"]
            });
        },
        onError: (error: AxiosError) => {
            console.error("카테고리 생성 에러 : ", error);
        }
    });

    // 내가 만든 카테고리 조회 api
    const { data } = useQuery({
        queryKey: ["category"],
        queryFn: () => commonApi.getCategory(),
    });

    const onGenerateCategory = () => {
        postGenerateCategory.mutate();
    }

    useEffect(() => {
        if (data) setCategoryList(data);
    }, [data]);

    return {
        startDateOpen, setStartDateOpen,
        endDateOpen, setEndDateOpen,

        focusedField, setFocusedField,
        imgRef, imgProgress,
        isProcessing, setIsProcessing,

        categoryList,
        addCategory, setAddCategory,
        categoryName, setCategoryName,
        categoryColor, setCategoryColor,
        colorPickerOpen, setColorPickerOpen,

        onGenerateCategory,
    }
}