import React, { useRef, useState } from 'react';
import { Dimensions, Image, Platform, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Dropdown } from 'react-native-element-dropdown';
import Carousel, { ICarouselInstance, Pagination } from 'react-native-reanimated-carousel';
import { useSharedValue } from "react-native-reanimated";
import ImageCropPicker from 'react-native-image-crop-picker';
import DatePicker from 'react-native-date-picker';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';
import { format } from 'date-fns';
import { colors } from '@/styles/colors';
import { ISelection } from '@/types/selection';
import { CloudComponent } from '../cloud';
import { formStyles } from './indexStyles';

/**
 * @brief 폼 컴포넌트
 */

export interface IFile {
    uri?: string;
    name?: string;
    type?: string;
    size?: number;
    isUploadButton?: boolean;
}

interface Props {
    screenTitle: string;
    btnTitle: string;

    imgList: IFile[];
    setImgList: React.Dispatch<React.SetStateAction<IFile[]>>;
    title: string;
    setTitle: React.Dispatch<React.SetStateAction<string>>;
    place: string;
    setPlace: React.Dispatch<React.SetStateAction<string>>;
    startDate: Date | null;
    setStartDate: React.Dispatch<React.SetStateAction<Date | null>>;
    endDate: Date | null;
    setEndDate: React.Dispatch<React.SetStateAction<Date | null>>;
    category: ISelection | null;
    setCategory: React.Dispatch<React.SetStateAction<ISelection | null>>;
    addCategory: string;
    setAddCategory: React.Dispatch<React.SetStateAction<string>>;
    content: string;
    setContent: React.Dispatch<React.SetStateAction<string>>;

    onClick: () => void;
}

export const FormComponent = (props: Props) => {
    const insets = useSafeAreaInsets();
    const [startDateOpen, setStartDateOpen] = useState<boolean>(false); // 시작 날짜 선택 모달
    const [endDateOpen, setEndDateOpen] = useState<boolean>(false); // 종료 날짜 선택 모달
    const [focusedField, setFocusedField] = useState<string | null>(null);
    const [addCategory, setAddCategory] = useState<boolean>(false); // 카테고리 추가 여부
    const imgRef = useRef<ICarouselInstance>(null);
    const imgProgress = useSharedValue<number>(0);
    const [isProcessing, setIsProcessing] = useState(false);
    
    const onChoosePhoto = async () => {
        if (isProcessing) return;
        setIsProcessing(true);

        try {
            const images = await ImageCropPicker.openPicker({
                multiple: true,
                maxFiles: 5,
                mediaType: 'photo',
            });

            const newFiles = images.map((image, index) => {
                const fileName = image.filename || `image_${Date.now()}_${index}.jpg`;
                
                return {
                    uri: Platform.OS === 'ios' 
                        ? image.path.replace('file://', '') 
                        : image.path,
                    name: fileName,
                    type: image.mime,
                    size: image.size,
                };
            });

            props.setImgList(prev => [...prev, ...newFiles]);
        } catch (e) {
            console.error("에러 : ", e);
        } finally {
            setIsProcessing(false);
        }
    };

    const carouselData = 
        props.imgList.length < 5 
            ? [...props.imgList, { isUploadButton: true }] 
            : props.imgList;

    return (
        <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={[
                formStyles.container,
                {
                    paddingTop: insets.top + 76,
                    paddingBottom: insets.bottom + 30,
                },
            ]}
        >
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

                        <View style={{ flex: 1 }}>
                            <Carousel
                                ref={imgRef}
                                width={Dimensions.get('window').width - 32}
                                height={241}
                                onProgressChange={imgProgress}
                                data={carouselData}
                                renderItem={(item) => {
                                    if (item.item.isUploadButton) {
                                        return (
                                            <Pressable onPress={onChoosePhoto}>
                                                <View style={formStyles.imageUpload}>
                                                    <Ionicons name="images-outline" color={colors.textPrimary} size={28} />
                                                    <Text style={formStyles.imageUploadTitle}>이미지 업로드</Text>
                                                </View>
                                            </Pressable>
                                        )
                                    }

                                    return(
                                        <View style={formStyles.imageItemWrapper}>
                                            <Image
                                                style={formStyles.imageItem}
                                                source={{ uri: item.item.uri }}
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
                                    )
                                }}
                            />
                        </View>
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
                                <Pressable
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
                                </Pressable>

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
                                <Pressable
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
                                </Pressable>

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

                                    <Pressable
                                        style={({ pressed }) => [
                                            formStyles.categoryAddButton,
                                            pressed && { backgroundColor: "#88CEFA" }
                                        ]}
                                        onPress={() => {
                                            setAddCategory(false);
                                        }}
                                    >
                                        <Octicons name="check" color={colors.textPrimary} size={24} />
                                    </Pressable>
                                </View>
                            )}
                        </View>

                        {!addCategory && (
                            <Pressable
                                style={formStyles.categoryAddTextWrapper}
                                onPress={() => setAddCategory(true)}
                            >
                                <AntDesign name="plus" color={colors.textPrimary} size={16} />
                                <Text style={formStyles.categoryAddText}>카테고리 추가하기</Text>
                            </Pressable>
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

            <Pressable
                style={({ pressed }) => [
                    formStyles.saveButton,
                    pressed && { backgroundColor: "#8EDAF7" }
                ]}
                onPress={props.onClick}
            >
                <Text style={formStyles.buttonText}>{props.btnTitle}</Text>
            </Pressable>
        </ScrollView>
    )
}