import { useState } from "react"
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigation/types";
import { IFile } from "@/components/form";
import { ISelection } from "@/types/selection";

/**
 * @brief 발자국 등록 컨트롤
 */

export const useControlGenerate = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const [imgList, setImgList] = useState<IFile[]>([]); // 이미지 리스트
    const [title, setTitle] = useState<string>(""); // 제목
    const [place, setPlace] = useState<string>(""); // 여행 장소
    const [startDate, setStartDate] = useState<Date | null>(null); // 시작 날짜
    const [endDate, setEndDate] = useState<Date | null>(null); // 종료 날짜
    const [category, setCategory] = useState<ISelection | null>(null); // 카테고리
    const [addCategory, setAddCategory] = useState<string>(""); // 추가할 카테고리
    const [content, setContent] = useState<string>(""); // 내용

    // TODO : 저장 후 상세화면으로 이동
    const onGenerate = () => {
        navigation.navigate("Detail", { code: 1 });
    }

    return {
        imgList, setImgList,
        title, setTitle,
        place, setPlace,
        startDate, setStartDate,
        endDate, setEndDate,
        category, setCategory,
        addCategory, setAddCategory,
        content, setContent,

        onGenerate,
    }
}