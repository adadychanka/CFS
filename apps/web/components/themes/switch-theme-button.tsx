import { SidebarMenuButton } from "@repo/ui/components/sidebar";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const SwitchThemeButton = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const handleToggleThemeNav = () => {
    setTheme(resolvedTheme === "light" ? "dark" : "light");
  };

  return (
    <SidebarMenuButton
      onClick={handleToggleThemeNav}
      aria-label="Switch UI theme between light and dark"
    >
      {resolvedTheme === "light" ? <Sun /> : <Moon />}
      <span> {resolvedTheme === "light" ? "Dark mode" : "Light mode"}</span>
    </SidebarMenuButton>
  );
};

export default SwitchThemeButton;
