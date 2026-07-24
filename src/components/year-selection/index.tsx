import React from "react";
import { Pressable, ScrollView, Text } from "react-native"
import { ISelection } from "@/types/selection"
import { useControlYearSelection } from "./index.control";
import { yearSelectionStyles } from "./indexStyles"

/**
 * @brief 년도 선택 컴포넌트
 */

export interface YearSelectionProps {
    value: ISelection | undefined;
    setValue: React.Dispatch<React.SetStateAction<ISelection | undefined>>;
}

export const YearSelectionComponent = (props: YearSelectionProps) => {
    const controller = useControlYearSelection(props);

    return (
        <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={yearSelectionStyles.container}
        >
            {controller.yearList.map((year, index) => {
                const isActive = props.value?.code === year.code;

                return (
                    <Pressable
                        key={index}
                        style={[
                            yearSelectionStyles.selection,
                            isActive && yearSelectionStyles.activeSelection
                        ]}
                        onPress={() => props.setValue(year)}
                    >
                        <Text
                            style={[
                                yearSelectionStyles.selectionText,
                                isActive && yearSelectionStyles.activeSelectionText
                            ]}
                        >
                            {year.name}
                        </Text>
                    </Pressable>
                )
            })}
        </ScrollView>
    )
}