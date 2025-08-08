import React from "react";
import { SidebarTrigger } from "@repo/ui/components/sidebar";
import { Separator } from "@repo/ui/components/separator";

type Props = {
  title: string;
};

const Header = ({ title }: Props) => {
  return (
    <header className="w-full flex h-16 items-center gap-2 border-b px-4">
      <SidebarTrigger />
      <Separator
        orientation="vertical"
        className="mr-2 data-[orientation=vertical]:h-4"
      />
      <p>{title}</p>
    </header>
  );
};

export default Header;
