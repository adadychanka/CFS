"use client";

import { Button } from "@repo/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@repo/ui/components/dialog";
import { type ReactNode, useState } from "react";

type Props = {
  onConfirm: () => void;
  children: ReactNode;
  ariaLabel?: string;
};

const UserConfirmDisable = ({ onConfirm, children, ariaLabel }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="ghost" aria-label={ariaLabel}>
          {children}
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Disable User?</DialogTitle>
        </DialogHeader>
        <p>
          Are you sure you want to disable this user account? This action can be
          undone by reactivating the user.
        </p>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={onConfirm}>Disable</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UserConfirmDisable;
