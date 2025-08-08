import Header from "@repo/ui/components/header";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ui/components/tabs";
import ManualFeedbackTab from "@/components/feedback-form/manual-feedback-tab";

const Page = () => {
  return (
    <>
      <Header title="New Sentiment" />
      <div className="max-w-[1280px] mx-auto p-4">
        <Tabs defaultValue="manual">
          <TabsList className="mb-2">
            <TabsTrigger value="manual">Manual entry</TabsTrigger>
            <TabsTrigger value="file">File upload</TabsTrigger>
          </TabsList>
          <TabsContent value="manual">
            <ManualFeedbackTab />
          </TabsContent>
          <TabsContent value="file">
            <h2>File upload will here</h2>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Page;
