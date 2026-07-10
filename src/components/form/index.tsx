import React, { useRef, useState } from 'react';
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Dropdown } from 'react-native-element-dropdown';
import Carousel, { ICarouselInstance, Pagination } from 'react-native-reanimated-carousel';
import { useSharedValue } from "react-native-reanimated";
import { ImagePickerResponse, launchImageLibrary } from 'react-native-image-picker';
import DatePicker from 'react-native-date-picker';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';
import { format } from 'date-fns';
import { colors } from '@/styles/colors';
import { IDropdown } from '@/types/dropdown';
import { CloudComponent } from '../cloud';
import { formStyles } from './indexStyles';

/**
 * @brief 폼 컴포넌트
 */

interface Props {
    screenTitle: string;
    btnTitle: string;

    imgList: File[];
    setImgList: React.Dispatch<React.SetStateAction<File[]>>;
    title: string;
    setTitle: React.Dispatch<React.SetStateAction<string>>;
    place: string;
    setPlace: React.Dispatch<React.SetStateAction<string>>;
    startDate: Date | null;
    setStartDate: React.Dispatch<React.SetStateAction<Date | null>>;
    endDate: Date | null;
    setEndDate: React.Dispatch<React.SetStateAction<Date | null>>;
    category: IDropdown | null;
    setCategory: React.Dispatch<React.SetStateAction<IDropdown | null>>;
    addCategory: string;
    setAddCategory: React.Dispatch<React.SetStateAction<string>>;
    content: string;
    setContent: React.Dispatch<React.SetStateAction<string>>;
}

export const FormComponent = (props: Props) => {
    const insets = useSafeAreaInsets();
    const [value, setValue] = useState<ImagePickerResponse>();
    const [startDateOpen, setStartDateOpen] = useState<boolean>(false); // 시작 날짜 선택 모달
    const [endDateOpen, setEndDateOpen] = useState<boolean>(false); // 종료 날짜 선택 모달
    const [focusedField, setFocusedField] = useState<string | null>(null);
    const [addCategory, setAddCategory] = useState<boolean>(false); // 카테고리 추가 여부
    const imgRef = useRef<ICarouselInstance>(null);
    const imgProgress = useSharedValue<number>(0);
    
    const onChoosePhoto = async () => {
        const result = await launchImageLibrary({
            mediaType: 'photo',
            quality: 0.9,
        });

        if (result.didCancel) {
            console.log('유저 캔슬');
        } else if (result.errorMessage) {
            console.error('에러 :' + result.errorMessage);
            setValue(result);
        } else {
            console.log("이미지", result);
            setValue(result);
        }
    };
      
    return (
        <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={[
                formStyles.container,
                {
                    paddingTop: insets.top + 40,
                    paddingBottom: insets.bottom + 30,
                },
            ]}
        >
            <View>{JSON.stringify(value)}</View>
            <View style={formStyles.wrapper}>
                <View style={formStyles.titleWrapper}>
                    <View style={formStyles.titleInnerWrapper}>
                        <View style={formStyles.icon}>
                            <Foundation name="foot" color={colors.textPrimary} size={20} />
                        </View>

                        <Text style={formStyles.title}>{props.screenTitle}</Text>
                    </View>

                    <CloudComponent
                        target="three"
                        width={72}
                        height={48}
                        position={{
                            left: 10,
                            bottom: -4,
                        }}
                    />
                </View>

                <View style={formStyles.itemContainer}>
                    <View style={formStyles.itemWrapper}>
                        <View style={formStyles.itemTitleWrapper}>
                            <Text style={formStyles.itemTitle}>이미지 등록</Text>
                            <Text style={formStyles.itemSubTitle}>(최대 5장)</Text>
                        </View>

                        <Carousel
                            ref={imgRef}
                            width={100}
                            onProgressChange={imgProgress}
                            data={props.imgList}
                            renderItem={(item) => (
                                <View style={formStyles.imageItemWrapper}>
                                    <Image
                                        style={formStyles.imageItem}
                                        src={URL.createObjectURL(item.item)}
                                    />

                                    <Pagination.Basic
                                        dotStyle={{ backgroundColor: "rgba(0,0,0,0.2)", borderRadius: 50 }}
                                        containerStyle={formStyles.imagePagination}
                                        progress={imgProgress}
                                        data={props.imgList}
                                        onPress={(index) => (
                                            imgRef.current?.scrollTo({
                                                count: index - imgProgress.value,
                                                animated: true,
                                            })
                                        )}
                                    />
                                </View>
                            )}
                        />

                        {/* <TouchableOpacity
                            activeOpacity={1}
                            onPress={onChoosePhoto}
                        >
                            <View style={formStyles.imageUpload}>
                                <Ionicons name="images-outline" color={colors.textPrimary} size={28} />
                                <Text style={formStyles.imageUploadTitle}>이미지 업로드</Text>
                            </View>
                        </TouchableOpacity> */}
                    </View>

                    <View style={formStyles.itemWrapper}>
                        <View style={formStyles.itemTitleWrapper}>
                            <Text style={formStyles.itemTitle}>제목</Text>
                            <Text style={formStyles.itemSubTitle}>(필수)</Text>
                        </View>

                        <TextInput
                            placeholder="제목을 입력해 주세요"
                            placeholderTextColor={colors.placeholder}
                            style={[
                                formStyles.input,
                                focusedField === "title" && formStyles.focusedInput
                            ]}
                            value={props.title}
                            onChangeText={props.setTitle}
                            onFocus={() => setFocusedField("title")}
                            onBlur={() => setFocusedField(null)}
                        />
                    </View>

                    <View style={formStyles.itemWrapper}>
                        <View style={formStyles.itemTitleWrapper}>
                            <Text style={formStyles.itemTitle}>여행 장소</Text>
                            <Text style={formStyles.itemSubTitle}>(필수)</Text>
                        </View>

                        <TextInput
                            placeholder="장소를 입력해 주세요"
                            placeholderTextColor={colors.placeholder}
                            style={[
                                formStyles.input,
                                focusedField === "place" && formStyles.focusedInput
                            ]}
                            value={props.place}
                            onChangeText={props.setPlace}
                            onFocus={() => setFocusedField("place")}
                            onBlur={() => setFocusedField(null)}
                        />
                    </View>

                    <View style={formStyles.itemWrapper}>
                        <View style={formStyles.itemTitleWrapper}>
                            <Text style={formStyles.itemTitle}>여행 날짜</Text>
                            <Text style={formStyles.itemSubTitle}>(필수)</Text>
                        </View>

                        <View style={formStyles.calendarWrapper}>
                            <View style={formStyles.calendar}>
                                <TouchableOpacity
                                    activeOpacity={1}
                                    style={formStyles.calendarSelection}
                                    onPress={() => {
                                        setEndDateOpen(false);
                                        setStartDateOpen(true);
                                    }}
                                >
                                    {props.startDate ? (
                                        <Text style={formStyles.calendarText}>{format(props.startDate, "yyyy-MM-dd")}</Text>
                                    ) : (
                                        <Text style={formStyles.calendarPlaceholder}>시작 날짜</Text>
                                    )}
                                    <Ionicons name="calendar-outline" color={colors.placeholder} size={14} />
                                </TouchableOpacity>

                                <DatePicker
                                    mode="date"
                                    modal={true}
                                    open={startDateOpen}
                                    title="시작 날짜"
                                    date={props.startDate ?? new Date()}
                                    onConfirm={(date) => {
                                        setStartDateOpen(false);
                                        props.setStartDate(date);
                                    }}
                                    onCancel={() => setStartDateOpen(false)}
                                />
                            </View>

                            <View style={formStyles.calendar}>
                                <TouchableOpacity
                                    activeOpacity={1}
                                    style={formStyles.calendarSelection}
                                    onPress={() => {
                                        setStartDateOpen(false);
                                        setEndDateOpen(true);
                                    }}
                                >
                                    {props.endDate ? (
                                        <Text style={formStyles.calendarText}>{format(props.endDate, "yyyy-MM-dd")}</Text>
                                    ) : (
                                        <Text style={formStyles.calendarPlaceholder}>종료 날짜</Text>
                                    )}
                                    <Ionicons name="calendar-outline" color={colors.placeholder} size={14} />
                                </TouchableOpacity>

                                <DatePicker
                                    mode="date"
                                    modal={true}
                                    open={endDateOpen}
                                    title="종료 날짜"
                                    date={props.endDate ?? new Date()}
                                    onConfirm={(date) => {
                                        setEndDateOpen(false);
                                        props.setEndDate(date);
                                    }}
                                    onCancel={() => setEndDateOpen(false)}
                                />
                            </View>
                        </View>
                    </View>

                    <View style={formStyles.categoryWrapper}>
                        <View style={formStyles.itemWrapper}>
                            <Text style={formStyles.itemTitle}>카테고리</Text>

                            <Dropdown
                                style={formStyles.dropdownContainer}
                                containerStyle={formStyles.dropdown}
                                itemContainerStyle={formStyles.dropdownItem}
                                placeholder='카테고리를 선택해 주세요'
                                placeholderStyle={formStyles.dropdownPlaceholder}
                                selectedTextStyle={formStyles.dropdownLabel}
                                activeColor={colors.thirdLight}
                                data={[
                                    { code: 1, name: "국내여행", color: "#FF0000" },
                                    { code: 2, name: "해외여행", color: "#FF7B00" }
                                ]}
                                search={false}
                                maxHeight={170}
                                valueField="code"
                                labelField="name"
                                value={props.category}
                                onFocus={() => setFocusedField("category")}
                                onBlur={() => setFocusedField(null)}
                                onChange={(item) => {
                                    setFocusedField(null);
                                    props.setCategory(item);
                                }}
                                renderRightIcon={() => (
                                    <FontAwesome 
                                        name="angle-down" 
                                        color={colors.placeholder} 
                                        size={20}
                                    />
                                )}
                                renderItem={(item) => (
                                    <View
                                        style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            alignItems: "center",
                                            columnGap: 8,
                                            borderRadius: 8,
                                        }}
                                    >
                                        <View 
                                            style={{
                                                width: 8,
                                                height: 8,
                                                borderRadius: 50,
                                                backgroundColor: item.color,
                                            }}
                                        />
                                        <Text style={formStyles.dropdownLabel}>{item.name}</Text>
                                    </View>
                                )}
                            />

                            {addCategory && (
                                <View style={formStyles.categoryAddWrapper}>
                                    <TextInput
                                        style={[
                                            formStyles.input,
                                            focusedField === "add-category" && formStyles.focusedInput,
                                            { flex: 1 }
                                        ]}
                                        placeholder="카테고리 이름을 작성해 주세요"
                                        placeholderTextColor={colors.placeholder}
                                        value={props.addCategory}
                                        onFocus={() => setFocusedField("add-category")}
                                        onBlur={() => setFocusedField(null)}
                                        onChangeText={props.setAddCategory}
                                    />

                                    <TouchableOpacity
                                        activeOpacity={0.8}
                                        style={formStyles.categoryAddButton}
                                        onPress={() => {
                                            setAddCategory(false);
                                        }}
                                    >
                                        <Octicons name="check" color={colors.textPrimary} size={24} />
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>

                        {!addCategory && (
                            <TouchableOpacity
                                activeOpacity={0.8}
                                style={formStyles.categoryAddTextWrapper}
                                onPress={() => setAddCategory(true)}
                            >
                                <AntDesign name="plus" color={colors.textPrimary} size={16} />
                                <Text style={formStyles.categoryAddText}>카테고리 추가하기</Text>
                            </TouchableOpacity>
                        )}
                    </View>

                    <View style={formStyles.itemWrapper}>
                        <Text style={formStyles.itemTitle}>내용</Text>

                        <TextInput
                            multiline={true}
                            placeholder="내용을 입력해 주세요"
                            placeholderTextColor={colors.placeholder}
                            style={[
                                formStyles.textarea,
                                focusedField === "content" && formStyles.focusedInput
                            ]}
                            value={props.content}
                            onChangeText={props.setContent}
                            onFocus={() => setFocusedField("content")}
                            onBlur={() => setFocusedField(null)}
                        />
                    </View>
                </View>
            </View>

            <TouchableOpacity
                style={formStyles.saveButton}
            >
                <Text style={formStyles.buttonText}>{props.btnTitle}</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}