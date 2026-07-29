import { useEffect, useState } from "react"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { RootStackParamList } from "@/navigation/types";
import { IFile, IPreviewFile } from "@/components/form";
import { formatDateTime } from "@/components/form/index.control";
import { CommonImgResponse } from "@/types/response/common";
import { ISelection } from "@/types/selection";
import { patchUpdateApi } from "./_api/PATCH";
import { useFoorintDetail } from "@/hooks/_api/useFoorintDetail";
import { BASE_URL } from "@env";

/**
 * @brief 발자국 등록 컨트롤
 */

type GenerateRouteProp = RouteProp<RootStackParamList, "Update">;

export const useControlUpdate = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const route = useRoute<GenerateRouteProp>();
    const [imgList, setImgList] = useState<IFile[]>([]); // 이미지 리스트
    const [previewImgList, setPreviewImgList] = useState<IPreviewFile[]>([]); // 미리보기 이미지 리스트
    const [removeImgCodeList, setRemoveImgCodeList] = useState<number[]>([]); // 삭제할 이미지 리스트
    const [title, setTitle] = useState<string>(""); // 제목
    const [location, setLocation] = useState<string>(""); // 여행 장소
    const [startDate, setStartDate] = useState<Date | null>(null); // 시작 날짜
    const [endDate, setEndDate] = useState<Date | null>(null); // 종료 날짜
    const [category, setCategory] = useState<ISelection | null>(null); // 카테고리
    const [description, setDescription] = useState<string>(""); // 내용

    // 특정 발자국 상세 조회 api
    const { 
        detailLoading, 
        foorintDetail 
    } = useFoorintDetail({ footPrintCode: route.params.code });

    // 발자국 수정 api
    const patchFoorint = useMutation({
        mutationFn: async () => {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("location", location);
            formData.append("startDate", formatDateTime(startDate));
            formData.append("endDate", formatDateTime(endDate));
            category && formData.append("categoryCode", (category?.code ?? 0).toString());
            formData.append("description", description);
            imgList.length > 0 && (
                imgList.forEach(img => formData.append("imgList", {
                    uri: img.uri!,
                    name: img.name!,
                    type: img.type!,
                    size: img.size!
                }))
            );
            removeImgCodeList.length > 0 && (
                removeImgCodeList.forEach(
                    code => formData.append("removeImgCodeList", code)
                )
            );

            return await patchUpdateApi.patchFoorint(route.params.code, formData);
        },
        onSuccess: (data) => {
            navigation.replace("Detail", { code: data.code });
        },
        onError: (error: AxiosError) => {
            console.error("발자국 생성 에러 : ", error);
        }
    });

    const onUpdateFoorint = () => {
        patchFoorint.mutate();
    }

    useEffect(() => {
        if (foorintDetail) {
            setTitle(foorintDetail.title);
            setLocation(foorintDetail.location);
            setStartDate(new Date(foorintDetail.startDate));
            setEndDate(new Date(foorintDetail.endDate));
            setCategory(foorintDetail.category);
            setDescription(foorintDetail.description);
            setPreviewImgList(
                foorintDetail.imgList.map(item => ({
                    uri: `${BASE_URL}${item.folderName}${item.imgUrl}`,
                }))
            );
        }
    }, [route.params.code, foorintDetail]);

    useEffect(() => {
        if (!foorintDetail) return;

        const imgUrlList = previewImgList.map(item => item.uri);

        const removeCodeList = foorintDetail.imgList
            .filter(origin => !imgUrlList.includes(`${BASE_URL}${origin.folderName}${origin.imgUrl}`))
            .map(item => item.code);

        setRemoveImgCodeList(removeCodeList);
    }, [foorintDetail, previewImgList]);

    console.log("imgList => ", imgList);
    console.log("previewImgList => ", previewImgList);
    console.log("removeImgCodeList => ", removeImgCodeList);

    return {
        detailLoading,
        isLoading: patchFoorint.isPending,

        imgList, setImgList,
        previewImgList, setPreviewImgList,
        title, setTitle,
        location, setLocation,
        startDate, setStartDate,
        endDate, setEndDate,
        category, setCategory,
        description, setDescription,

        onUpdateFoorint,
    }
}