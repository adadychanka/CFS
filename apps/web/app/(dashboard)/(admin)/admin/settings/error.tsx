"use client";

type Props = {
  error: Error;
};

function ErrorPage({ error }: Props) {
  return (
    <div className="flex items-center justify-center h-screen w-full bg-background">
      <div className="flex flex-col items-center space-y-4">
        <div className="h-16 w-16 flex items-center justify-center rounded-full bg-primary">
          <span className="text-red-600 text-3xl">⚠️</span>
        </div>
        <h1 className="text-2xl font-bold text-foreground">Error!</h1>
        <p className="text-lg text-muted-foreground text-center px-4">
          {error.message}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-2 rounded-xl bg-primary text-primary-foreground font-medium shadow hover:opacity-90 transition"
        >
          Retry
        </button>
      </div>
    </div>
  );
}

export default ErrorPage;
