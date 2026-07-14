import React from "react";
import { Pressable, ScrollView, Text } from "react-native"
import { ISelection } from "@/types/selection"
import { yearSelectionStyles } from "./indexStyles"

/**
 * @brief 년도 선택 컴포넌트
 */

interface Props {
    yearList: ISelection[];
    value: ISelection;
    setValue: React.Dispatch<React.SetStateAction<ISelection>>;
}

export const YearSelectionComponent = (props: Props) => {
    return (
        <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={yearSelectionStyles.container}
        >
            {props.yearList.map((year, index) => {
                const isActive = props.value.code === year.code;

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