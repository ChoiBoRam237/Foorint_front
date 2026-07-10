import { SafeAreaView } from "react-native-safe-area-context";
import { MainHeader } from "@/components/main-header";
import { generateStyles } from "./indexStyles";
import { FormComponent } from "@/components/form";
import { useControlGenerate } from "./index.control";

/**
 * @brief 발자국 등록
 */

export const GenerateScreen = () => {
    const controller = useControlGenerate();

    return (
        <SafeAreaView style={generateStyles.container}>
            <MainHeader />

            <FormComponent
                screenTitle="발자국 등록"
                btnTitle="발자국 등록하기"

                imgList={controller.imgList}
                setImgList={controller.setImgList}
                title={controller.title}
                setTitle={controller.setTitle}
                place={controller.place}
                setPlace={controller.setPlace}
                startDate={controller.startDate}
                setStartDate={controller.setStartDate}
                endDate={controller.endDate}
                setEndDate={controller.setEndDate}
                category={controller.category}
                setCategory={controller.setCategory}
                addCategory={controller.addCategory}
                setAddCategory={controller.setAddCategory}
                content={controller.content}
                setContent={controller.setContent}
            />
        </SafeAreaView>
    )
}