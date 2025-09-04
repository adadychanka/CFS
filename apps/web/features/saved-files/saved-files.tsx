import React from "react";
import SavedFilesTable from "./saved-files-table";

function SavedFiles() {
  return (
    <section className="mt-4">
      <h2 className="font-medium mb-2">All processed files</h2>
      <SavedFilesTable />
    </section>
  );
}

export default SavedFiles;
