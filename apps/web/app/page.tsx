import SwitchViewTabs from "@/components/user-sentiments/SwitchViewTabs";
import Header from "@/components/header";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "View and manage your user feedbacks",
};

export default function Home() {
  return (
    <>
      <Header title="Dashboard" />
      <div className="w-full max-w-[1280px] mx-auto p-4">
        <section className="w-full h-64 mb-8 flex items-center justify-center bg-neutral-100 rounded-md">
          Charts :)
        </section>

        <SwitchViewTabs />
      </div>
    </>
  );
}
