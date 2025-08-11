import Header from "@/components/header";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "View and manage your user feedbacks",
};
import SentimentsTable from "@/components/user-sentiments/SentimentsTable";

export default function Home() {
  return (
    <>
      <Header title="Dashboard" />
      <div className="w-full max-w-[1280px] mx-auto p-4">
        <section className="w-full h-64 mb-8 flex items-center justify-center bg-neutral-100 rounded-md">
          Charts :)
        </section>
        <SentimentsTable />
      </div>
    </>
  );
}
