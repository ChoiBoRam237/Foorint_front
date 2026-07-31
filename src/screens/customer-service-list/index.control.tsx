import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ICustomer } from "@/types/response/customer-service";
import { getCustomerListApi } from "./_api/GET";

/**
 * @brief 고객센터 채팅 리스트 컨트롤
 */

export const useControlCustomerList = () => {
    const [customerList, setCustomerList] = useState<ICustomer[]>([]);

    // 고객센터 채팅 목록 조회 api
    const {
        data,
        isLoading,
        isFetching
    } = useQuery({
        queryKey: ["customer-list"],
        queryFn: () => getCustomerListApi.getCustomerRoom(),
    });

    useEffect(() => {
        if (data && data.length > 0) setCustomerList(data);
    }, [data]);

    return {
        isLoading: isLoading || isFetching,
        customerList,
    }
}