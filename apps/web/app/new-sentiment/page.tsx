import Header from "@repo/ui/custom/header";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "New Sentiment",
  description:
    "Upload and analyze user reviews from text or CSV files to generate sentiment insights.",
};

const Page = () => {
  return (
    <>
      <Header title="New Sentiment" />
    </>
  );
};

export default Page;
