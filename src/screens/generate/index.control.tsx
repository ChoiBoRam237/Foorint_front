import { useState } from "react"
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { RootStackParamList } from "@/navigation/types";
import { IFile } from "@/components/form";
import { ISelection } from "@/types/selection";
import { postGenerateApi } from "./_api/POST";
import { formatDateTime } from "@/components/form/index.control";

/**
 * @brief 발자국 등록 컨트롤
 */

export const useControlGenerate = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const [imgList, setImgList] = useState<IFile[]>([]); // 이미지 리스트
    const [title, setTitle] = useState<string>(""); // 제목
    const [location, setLocation] = useState<string>(""); // 여행 장소
    const [startDate, setStartDate] = useState<Date | null>(null); // 시작 날짜
    const [endDate, setEndDate] = useState<Date | null>(null); // 종료 날짜
    const [category, setCategory] = useState<ISelection | null>(null); // 카테고리
    const [description, setDescription] = useState<string>(""); // 내용

    // 발자국 생성 api
    const postGenerateFoorint = useMutation({
        mutationFn: async () => {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("location", location);
            formData.append("startDate", formatDateTime(startDate));
            formData.append("endDate", formatDateTime(endDate));
            category && formData.append("categoryCode", category?.code.toString());
            description !== "" && formData.append("description", description);
            imgList.length > 0 && (
                imgList.forEach(img => formData.append("imgList", {
                    uri: img.uri!,
                    name: img.name!,
                    type: img.type!,
                    size: img.size!
                }))
            );

            return await postGenerateApi.postGenerateFoorint(formData);
        },
        onSuccess: (data) => {
            navigation.replace("Detail", { code: data.code });
        },
        onError: (error: AxiosError) => {
            console.error("발자국 생성 에러 : ", error);
        }
    });

    const onGenerateFoorint = () => {
        postGenerateFoorint.mutate();
    }

    return {
        isLoading: postGenerateFoorint.isPending,

        imgList, setImgList,
        title, setTitle,
        location, setLocation,
        startDate, setStartDate,
        endDate, setEndDate,
        category, setCategory,
        description, setDescription,

        onGenerateFoorint,
    }
}