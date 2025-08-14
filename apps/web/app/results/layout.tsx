"use client";

import ChartWrapper from "@/components/e-charts/chart-wrapper";
import Header from "@/components/header";
import { GalleryVertical, Table2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

function Layout({ children }: Props) {
  const pathname = usePathname();
  const tabs = [
    { href: "/results", label: "Table", icon: Table2 },
    { href: "/results/grouped", label: "Grouped", icon: GalleryVertical },
  ];
  return (
    <>
      <Header title="Dashboard" />
      <div className="w-full max-w-[1280px] mx-auto p-4">
        <ChartWrapper />
        <div className="bg-secondary px-1 py-2 inline-flex rounded">
          {tabs.map((tab) => {
            const isActive = pathname === tab.href;
            const Icon = tab.icon;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`flex gap-2 py-1 px-2 rounded text-sm ${
                  isActive ? "bg-white shadow-md" : ""
                }`}
              >
                <Icon width={20} height={20} /> {tab.label}
              </Link>
            );
          })}
        </div>
        {children}
      </div>
    </>
  );
}

export default Layout;
