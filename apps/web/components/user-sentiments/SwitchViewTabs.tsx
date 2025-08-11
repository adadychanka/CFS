import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ui/components/tabs";
import { GalleryVertical, Table2 } from "lucide-react";
import SentimentsTable from "@/components/user-sentiments/SentimentsTable";

const SwitchViewTabs = () => {
  return (
    <Tabs defaultValue="manual">
      <TabsList className="mb-4">
        <TabsTrigger value="manual">
          <Table2 /> Table
        </TabsTrigger>
        <TabsTrigger value="file">
          <GalleryVertical /> Grouped
        </TabsTrigger>
      </TabsList>
      <TabsContent value="manual">
        <SentimentsTable />
      </TabsContent>
      <TabsContent value="file">
        <h2>☘️ Good luck there with collapses</h2>
      </TabsContent>
    </Tabs>
  );
};

export default SwitchViewTabs;
