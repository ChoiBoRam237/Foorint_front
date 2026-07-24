import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context"
import { commonStyles } from "@/styles/common"
import { noDataStyles } from "./indexStyles"

/**
 * @brief 데이터 없음 컴포넌트
 */

interface Props {
    text: string;
}

export const NoDataComponent = (props: Props) => {
    return (
        <SafeAreaView
            style={[
                commonStyles.container,
                noDataStyles.container
            ]}
        >
            <Text style={noDataStyles.text}>{props.text}</Text>
        </SafeAreaView>
    )
}