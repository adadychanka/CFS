import React from "react";
import SavedFilesTableWrapper from "./saved-files-table-wrapper";

function SavedFiles() {
  return (
    <section className="mt-4">
      <h1 className="text-lg">All processed files</h1>
      <SavedFilesTableWrapper />
    </section>
  );
}

export default SavedFiles;
