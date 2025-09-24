import { SidebarMenuButton } from "@repo/ui/components/sidebar";
import { SunMoon } from "lucide-react";
import { useTheme } from "next-themes";

const ToggleThemeNavButton = () => {
  const { setTheme } = useTheme();

  const handleToggleThemeNav = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <SidebarMenuButton onClick={handleToggleThemeNav}>
      <SunMoon />
      <span>Toggle theme</span>
    </SidebarMenuButton>
  );
};

export default ToggleThemeNavButton;
