"use client";

import { Moon, Sun, Check } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { theme: currentTheme, setTheme } = useTheme();
  const isActive = (theme: string) => currentTheme === theme;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="space-y-1" sideOffset={8} align="end">
        <DropdownMenuItem
          className={cn("cursor-pointer", isActive("light") && "bg-accent")}
          onClick={() => setTheme("light")}
        >
          Light
          {isActive("light") && <Check className="ml-auto size-4" />}
        </DropdownMenuItem>
        <DropdownMenuItem
          className={cn("cursor-pointer", isActive("dark") && "bg-accent")}
          onClick={() => setTheme("dark")}
        >
          Dark
          {isActive("dark") && <Check className="ml-auto size-4" />}
        </DropdownMenuItem>
        <DropdownMenuItem
          className={cn("cursor-pointer", isActive("system") && "bg-accent")}
          onClick={() => setTheme("system")}
        >
          System
          {isActive("system") && <Check className="ml-auto size-4" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
