import React from "react";
import SavedFilesTable from "./saved-files-table";

function SavedFiles() {
  return (
    <section className="mt-4">
      <h1 className="text-lg">All processed files</h1>
      <SavedFilesTable />
    </section>
  );
}

export default SavedFiles;
