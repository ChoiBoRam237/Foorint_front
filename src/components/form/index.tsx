import React from 'react';
import { ActivityIndicator, Dimensions, Image, Platform, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Dropdown } from 'react-native-element-dropdown';
import Carousel, { Pagination } from 'react-native-reanimated-carousel';
import ImageCropPicker from 'react-native-image-crop-picker';
import DatePicker from 'react-native-date-picker';
import ColorPicker, { HueSlider, OpacitySlider, Panel1, PreviewText } from 'reanimated-color-picker';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';
import { format } from 'date-fns';
import { colors } from '@/styles/colors';
import { ISelection } from '@/types/selection';
import { CloudComponent } from '../cloud';
import { colorPickerStyles, formStyles } from './indexStyles';
import { useControlForm } from './index.control';

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
    isLoading: boolean;

    imgList: IFile[];
    setImgList: React.Dispatch<React.SetStateAction<IFile[]>>;
    title: string;
    setTitle: React.Dispatch<React.SetStateAction<string>>;
    location: string;
    setLocation: React.Dispatch<React.SetStateAction<string>>;
    startDate: Date | null;
    setStartDate: React.Dispatch<React.SetStateAction<Date | null>>;
    endDate: Date | null;
    setEndDate: React.Dispatch<React.SetStateAction<Date | null>>;
    category: ISelection | null;
    setCategory: React.Dispatch<React.SetStateAction<ISelection | null>>;
    description: string;
    setDescription: React.Dispatch<React.SetStateAction<string>>;

    onClick: () => void;
}

export const FormComponent = (props: Props) => {
    const insets = useSafeAreaInsets();
    const controller = useControlForm();
    
    const onChoosePhoto = async () => {
        if (controller.isProcessing) return;
        controller.setIsProcessing(true);

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
            controller.setIsProcessing(false);
        }
    };

    const dataCheck = () => {
        return props.title !== "" 
            && props.location !== ""
            && props.startDate !== null
            && props.endDate !== null;
    }

    const carouselData = [
        ...props.imgList,
        ...(props.imgList.length < 5
            ? [{ isUploadButton: true }]
            : []),
    ];

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
                            {props.imgList.length > 0 ? (
                                <Carousel
                                    ref={controller.imgRef}
                                    width={Dimensions.get('window').width - 32}
                                    height={241}
                                    loop={false}
                                    data={carouselData}
                                    onProgressChange={controller.imgProgress}
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
                                        } else {
                                            return(
                                                <Image
                                                    style={formStyles.imageItem}
                                                    source={{ uri: item.item.uri }}
                                                />
                                            )
                                        }
                                    }}
                                />
                            ) : (
                                <Pressable onPress={onChoosePhoto}>
                                    <View style={formStyles.imageUpload}>
                                        <Ionicons name="images-outline" color={colors.textPrimary} size={28} />
                                        <Text style={formStyles.imageUploadTitle}>이미지 업로드</Text>
                                    </View>
                                </Pressable>
                            )}
                        </View>

                        {props.imgList.length > 0 && (
                            <Pagination.Basic
                                dotStyle={formStyles.imagePaginationDot}
                                activeDotStyle={{ backgroundColor: colors.thirdDark }}
                                containerStyle={formStyles.imagePagination}
                                progress={controller.imgProgress}
                                data={carouselData}
                                onPress={(index) => (
                                    controller.imgRef.current?.scrollTo({
                                        count: index - controller.imgProgress.value,
                                        animated: true,
                                    })
                                )}
                            />
                        )}
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
                                controller.focusedField === "title" && formStyles.focusedInput
                            ]}
                            value={props.title}
                            onChangeText={props.setTitle}
                            onFocus={() => controller.setFocusedField("title")}
                            onBlur={() => controller.setFocusedField(null)}
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
                                controller.focusedField === "location" && formStyles.focusedInput
                            ]}
                            value={props.location}
                            onChangeText={props.setLocation}
                            onFocus={() => controller.setFocusedField("location")}
                            onBlur={() => controller.setFocusedField(null)}
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
                                        controller.setEndDateOpen(false);
                                        controller.setStartDateOpen(true);
                                    }}
                                >
                                    {props.startDate ? (
                                        <Text style={formStyles.calendarText}>{format(props.startDate, "yyyy-MM-dd")}</Text>
                                    ) : (
                                        <Text style={formStyles.calendarPlaceholder}>시작 날짜</Text>
                                    )}
                                    <Ionicons name="calendar-outline" color={colors.placeholder} size={18} />
                                </Pressable>

                                <DatePicker
                                    mode="date"
                                    modal={true}
                                    open={controller.startDateOpen}
                                    title="시작 날짜"
                                    date={props.startDate ?? new Date()}
                                    onConfirm={(date) => {
                                        controller.setStartDateOpen(false);
                                        props.setStartDate(date);
                                    }}
                                    onCancel={() => controller.setStartDateOpen(false)}
                                />
                            </View>

                            <View style={formStyles.calendar}>
                                <Pressable
                                    style={formStyles.calendarSelection}
                                    onPress={() => {
                                        controller.setStartDateOpen(false);
                                        controller.setEndDateOpen(true);
                                    }}
                                >
                                    {props.endDate ? (
                                        <Text style={formStyles.calendarText}>{format(props.endDate, "yyyy-MM-dd")}</Text>
                                    ) : (
                                        <Text style={formStyles.calendarPlaceholder}>종료 날짜</Text>
                                    )}
                                    <Ionicons name="calendar-outline" color={colors.placeholder} size={18} />
                                </Pressable>

                                <DatePicker
                                    mode="date"
                                    modal={true}
                                    open={controller.endDateOpen}
                                    title="종료 날짜"
                                    date={props.endDate ?? new Date()}
                                    onConfirm={(date) => {
                                        controller.setEndDateOpen(false);
                                        props.setEndDate(date);
                                    }}
                                    onCancel={() => controller.setEndDateOpen(false)}
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
                                data={controller.categoryList}
                                search={false}
                                maxHeight={170}
                                valueField="code"
                                labelField="name"
                                value={props.category}
                                onFocus={() => controller.setFocusedField("category")}
                                onBlur={() => controller.setFocusedField(null)}
                                onChange={(item) => {
                                    controller.setFocusedField(null);
                                    props.setCategory(item);
                                }}
                                renderRightIcon={() => (
                                    <FontAwesome 
                                        name="angle-down" 
                                        color={colors.placeholder} 
                                        size={20}
                                    />
                                )}
                                renderLeftIcon={() => props.category && (
                                    <View 
                                        style={{
                                            width: 8,
                                            height: 8,
                                            borderRadius: 50,
                                            backgroundColor: props.category?.color,
                                            marginRight: 8,
                                        }}
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

                            {controller.addCategory && (
                                <View style={formStyles.categoryAddWrapper}>
                                    <Pressable
                                        style={formStyles.categoryColorPicker}
                                        onPress={() => controller.setColorPickerOpen(prev => !prev)}
                                    >
                                        <View
                                            style={[
                                                formStyles.categoryColor,
                                                { backgroundColor: controller.categoryColor }
                                            ]}
                                        />
                                    </Pressable>

                                    <TextInput
                                        style={[
                                            formStyles.input,
                                            controller.focusedField === "add-category" && formStyles.focusedInput,
                                            { flex: 1 }
                                        ]}
                                        placeholder="카테고리 이름을 작성해 주세요"
                                        placeholderTextColor={colors.placeholder}
                                        value={controller.categoryName}
                                        onFocus={() => controller.setFocusedField("add-category")}
                                        onBlur={() => controller.setFocusedField(null)}
                                        onChangeText={controller.setCategoryName}
                                    />

                                    <Pressable
                                        style={({ pressed }) => [
                                            formStyles.categoryAddButton,
                                            pressed && { backgroundColor: "#88CEFA" }
                                        ]}
                                        onPress={() => {
                                            if (controller.categoryName !== "" && controller.categoryColor !== "") {
                                                controller.onGenerateCategory();
                                            } else {
                                                controller.setCategoryColor("#000000");
                                                controller.setAddCategory(false);
                                            }
                                        }}
                                    >
                                        <Octicons name="check" color={colors.textPrimary} size={24} />
                                    </Pressable>

                                    {controller.colorPickerOpen && (
                                        <View style={colorPickerStyles.colorPickerWrapper}>
                                            <ColorPicker
                                                value={controller.categoryColor}
                                                style={colorPickerStyles.colorPicker}
                                                sliderThickness={25}
                                                thumbSize={24}
                                                thumbShape='circle'
                                                boundedThumb={true}
                                                onChangeJS={(color) => controller.setCategoryColor(color.hex)}
                                            >
                                                <Panel1 style={colorPickerStyles.panel} />
                                                <HueSlider style={colorPickerStyles.slider} />

                                                <View style={colorPickerStyles.hr} />

                                                <PreviewText style={colorPickerStyles.previewTxt} colorFormat='hex' />
                                            </ColorPicker>

                                            <View style={colorPickerStyles.okWrapper}>
                                                <Pressable
                                                    style={colorPickerStyles.okButton}
                                                    onPress={() => controller.setColorPickerOpen(false)}
                                                >
                                                    <Text style={colorPickerStyles.okText}>OK</Text>
                                                </Pressable>
                                            </View>
                                        </View>
                                    )}
                                </View>
                            )}
                        </View>

                        {!controller.addCategory && (
                            <Pressable
                                style={formStyles.categoryAddTextWrapper}
                                onPress={() => controller.setAddCategory(true)}
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
                                controller.focusedField === "description" && formStyles.focusedInput
                            ]}
                            value={props.description}
                            onChangeText={props.setDescription}
                            onFocus={() => controller.setFocusedField("description")}
                            onBlur={() => controller.setFocusedField(null)}
                        />
                    </View>
                </View>
            </View>

            <Pressable
                style={({ pressed }) => [
                    formStyles.saveButton,
                    !dataCheck() && { backgroundColor: colors.disabled },
                    (pressed && dataCheck()) && { backgroundColor: "#8EDAF7" }
                ]}
                disabled={!dataCheck() || props.isLoading}
                onPress={props.onClick}
            >
                {!props.isLoading ? (
                    <Text
                        style={[
                            formStyles.buttonText,
                            !dataCheck() && { color: "white" },
                        ]}
                    >
                        {props.btnTitle}
                    </Text>
                ) : (
                    <ActivityIndicator size="small" color="white" />
                )}
            </Pressable>
        </ScrollView>
    )
}