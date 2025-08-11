import Header from "@repo/ui/custom/header";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "View and manage your user feedbacks",
};

export default function Home() {
  return (
    <>
      <Header title="Dashboard" />
    </>
  );
}
