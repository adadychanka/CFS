import DashboardChart from "./dashboard-chart";

function DashboardChartWrapper({ workspaceId }: { workspaceId: string }) {
  return (
    <section className="w-full h-96 mb-8 flex flex-col items-center justify-center bg-neutral-100 dark:bg-neutral-900 border-1 rounded-md pt-12">
      <DashboardChart workspaceId={workspaceId} />
    </section>
  );
}

export default DashboardChartWrapper;
