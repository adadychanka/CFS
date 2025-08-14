import { type Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "View and manage your user feedbacks",
};

export default function Home() {
  return redirect("/results");
}
