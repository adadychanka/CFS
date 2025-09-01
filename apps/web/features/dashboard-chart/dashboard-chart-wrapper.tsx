import DashboardChart from "./dashboard-chart";

type Props = {
  isSampleMode: boolean;
};

function DashboardChartWrapper({ isSampleMode }: Props) {
  return (
    <section className="w-full h-96 mb-8 flex flex-col items-center justify-center bg-neutral-100 border-1 rounded-md pt-12">
      <DashboardChart isSampleMode={isSampleMode} />
    </section>
  );
}

export default DashboardChartWrapper;
