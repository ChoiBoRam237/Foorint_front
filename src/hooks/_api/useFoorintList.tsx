import { useEffect, useState } from "react"
import { ITripResponse } from "@/types/response/trip"
import { useQuery } from "@tanstack/react-query";
import { commonApi } from "@/util/_api";

/**
 * @brief 발자국 목록 조회 API Hook
 */

interface Props {
    year?: number;
    categoryCode: number;
    keyword?: string;
}

export const useFoorintList = (props: Props) => {
    const [foorintList, setFoorintList] = useState<ITripResponse[]>([]);

    const { data, isLoading, isFetching } = useQuery({
        queryKey: ["list", props.year, props.categoryCode, props.keyword],
        queryFn: () => commonApi.getFoorintList(props.categoryCode, props.keyword, props.year),
    });

    useEffect(() => {
        if (data) setFoorintList(data);
    }, [data]);

    return {
        listLoading: isLoading || isFetching,
        foorintList,
    }
}