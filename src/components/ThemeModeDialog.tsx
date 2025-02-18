"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function ThemeDialog() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (theme === "light") {
      setOpen(true); // Open the dialog if light mode is detected
    }
  }, [theme]);

  const handleConfirm = () => {
    setTheme("dark"); // Switch to Dark Mode
    setOpen(false); // Close the dialog
  };

  return (
    <Dialog open={open} onOpenChange={handleConfirm}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>🌑 Dark Mode is Here!</DialogTitle>
          <DialogDescription>
            We’ve switched to Dark Mode for a smoother, more stylish experience.
            It’s easy on the eyes and looks fantastic—enjoy!
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={handleConfirm}>Got it!</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
