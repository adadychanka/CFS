import PreviewListTable from "@/components/feedback-form/preview-list-table";
import { TEST_PREVIEW_FEEDBACKS } from "@repo/ui/constants/contants";

const PreviewList = () => {
  return (
    <div>
      <p className="pb-2 font-medium">
        {TEST_PREVIEW_FEEDBACKS.length} items to preview
      </p>
      <PreviewListTable />
    </div>
  );
};

export default PreviewList;
