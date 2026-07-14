import React from "react";
import { Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { ISelection } from "@/types/selection";
import { colors } from "@/styles/colors";
import { filterStyles } from "./indexStyles";

/**
 * @brief 필터 컴포넌트
 */

interface Props {
    filterList: ISelection[];
    value: ISelection;
    setValue: React.Dispatch<React.SetStateAction<ISelection>>;
}

const ITEM_HEIGHT = 38;

export const FilterComponent = (props: Props) => {
    return (
        <Dropdown
            style={filterStyles.container}
            containerStyle={filterStyles.itemList}
            itemContainerStyle={filterStyles.item}
            selectedTextStyle={[ filterStyles.activeText, { marginLeft: 4 } ]}
            activeColor={colors.thirdLight}
            data={props.filterList}
            search={false}
            maxHeight={Math.min((props.filterList.length * ITEM_HEIGHT), 120)}
            valueField="code"
            labelField="name"
            value={props.value}
            onChange={(item) => props.setValue(item)}
            renderLeftIcon={() => (
                <AntDesign name="filter" color={colors.textPrimary} size={14} />
            )}
            renderRightIcon={() => <></>}
            renderItem={(item, selected) => (
                <View style={filterStyles.item}>
                    <Text
                        style={[
                            filterStyles.itemText,
                            selected && filterStyles.activeText,
                        ]}
                    >
                        {item.name}
                    </Text>
                </View>
            )}
        />
    )
}