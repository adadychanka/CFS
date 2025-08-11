import Header from "@repo/ui/components/header";
import SwitchViewTabs from "@/components/user-sentiments/SwitchViewTabs";

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
