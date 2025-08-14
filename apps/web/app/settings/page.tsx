import { type Metadata } from "next";
import Header from "@repo/ui/components/header";

export const metadata: Metadata = {
  title: "Settings",
  description: "Manage your preferences and usage limits",
};

const Page = () => {
  return (
    <>
      <Header title="Settings" />
    </>
  );
};

export default Page;
