import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { postFormApi } from "./_api/POST";
import { useCategory } from "@/hooks/_api/useCategory";

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
    const [addCategory, setAddCategory] = useState<boolean>(false); // 카테고리 추가 여부
    const [categoryName, setCategoryName] = useState<string>(""); // 추가할 카테고리 이름
    const [categoryColor, setCategoryColor] = useState<string>("#000000"); // 추가할 카테고리 색상
    const [colorPickerOpen, setColorPickerOpen] = useState<boolean>(false); // 색상 선택 오픈 여부
    const [isProcessing, setIsProcessing] = useState(false);

    // 내가 만든 카테고리 조회 hook
    const {
        categoryList,
        onCategoryFetch,
    } = useCategory();

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
            onCategoryFetch(); // 카테고리 목록 조회 api 재호출
        },
        onError: (error: AxiosError) => {
            console.error("카테고리 생성 에러 : ", error);
        }
    });

    const onGenerateCategory = () => {
        postGenerateCategory.mutate();
    }

    return {
        startDateOpen, setStartDateOpen,
        endDateOpen, setEndDateOpen,

        focusedField, setFocusedField,
        isProcessing, setIsProcessing,

        categoryList,
        addCategory, setAddCategory,
        categoryName, setCategoryName,
        categoryColor, setCategoryColor,
        colorPickerOpen, setColorPickerOpen,

        onGenerateCategory,
    }
}