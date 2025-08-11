import Header from "@repo/ui/components/header";
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
