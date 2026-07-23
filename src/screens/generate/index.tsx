import { SafeAreaView } from "react-native-safe-area-context";
import { MainHeaderComponent } from "@/components/main-header";
import { FormComponent } from "@/components/form";
import { commonStyles } from "@/styles/common";
import { useControlGenerate } from "./index.control";

/**
 * @brief 발자국 등록
 */

export default function GenerateScreen() {
    const controller = useControlGenerate();

    return (
        <SafeAreaView style={commonStyles.container}>
            <MainHeaderComponent />

            <FormComponent
                screenTitle="발자국 등록"
                btnTitle="발자국 등록하기"
                isLoading={controller.isLoading}

                imgList={controller.imgList}
                setImgList={controller.setImgList}
                title={controller.title}
                setTitle={controller.setTitle}
                location={controller.location}
                setLocation={controller.setLocation}
                startDate={controller.startDate}
                setStartDate={controller.setStartDate}
                endDate={controller.endDate}
                setEndDate={controller.setEndDate}
                category={controller.category}
                setCategory={controller.setCategory}
                description={controller.description}
                setDescription={controller.setDescription}

                onClick={controller.onGenerateFoorint}
            />
        </SafeAreaView>
    )
}