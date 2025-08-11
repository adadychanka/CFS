import Header from "@repo/ui/custom/header";
import { type Metadata } from "next";

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
