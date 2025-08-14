import { type Metadata } from "next";
import Header from "@repo/ui/components/header";

export const metadata: Metadata = {
  title: "Alerts",
  description: "View and manage suspicious activity alerts.",
};

const Page = () => {
  return (
    <>
      <Header title="Alerts" />
    </>
  );
};

export default Page;
