import Header from "@/components/header";
import React from "react";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Alerts",
  description: "View and manage suspicious activity alerts.",
};

const Page = () => {
  return (
    <>
      <Header title="Alerts" />
    </>
  );
};

export default Page;
