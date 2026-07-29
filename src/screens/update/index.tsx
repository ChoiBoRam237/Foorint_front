import { SafeAreaView } from "react-native-safe-area-context";
import { MainHeaderComponent } from "@/components/main-header";
import { FormComponent } from "@/components/form";
import { LoadingComponent } from "@/components/loading";
import { commonStyles } from "@/styles/common";
import { useControlUpdate } from "./index.control";

/**
 * @brief 발자국 수정
 */

export default function UpdateScreen() {
    const controller = useControlUpdate();

    if (controller.detailLoading) return <LoadingComponent />;

    return (
        <SafeAreaView style={commonStyles.container}>
            <MainHeaderComponent />

            <FormComponent
                screenTitle="발자국 수정"
                btnTitle="발자국 수정하기"
                isLoading={controller.isLoading}

                imgList={controller.imgList}
                setImgList={controller.setImgList}
                previewImgList={controller.previewImgList}
                setPreviewImgList={controller.setPreviewImgList}
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

                onClick={controller.onUpdateFoorint}
            />
        </SafeAreaView>
    )
}