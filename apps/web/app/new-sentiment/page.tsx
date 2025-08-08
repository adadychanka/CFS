import Header from "@/components/header";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "New Sentiment",
  description:
    "Upload and analyze user reviews from text or CSV files to generate sentiment insights.",
};
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ui/components/tabs";

const Page = () => {
  return (
    <>
      <Header title="New Sentiment" />
      <div className="p-4">
        <Tabs defaultValue="manual">
          <TabsList className="mb-2">
            <TabsTrigger value="manual">Manual entry</TabsTrigger>
            <TabsTrigger value="file">File upload</TabsTrigger>
          </TabsList>
          <TabsContent value="manual">
            <h2>Manul form will here</h2>
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
