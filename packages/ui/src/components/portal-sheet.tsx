import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@repo/ui/components/sheet";
import { ReactNode } from "react";
import { Button } from "@repo/ui/components/button";

type Props = {
  title: string;
  description?: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  children: ReactNode;
};

/**
 * Reusable portal sheet component build on top of the shadcn sheet. Just collects common components into one.
 *
 * @param title
 * @param description
 * @param isOpen
 * @param setIsOpen
 * @param children
 * @constructor
 */
const PortalSheet = ({
  title,
  description,
  isOpen,
  setIsOpen,
  children,
}: Props) => {
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          {description && <SheetDescription>{description}</SheetDescription>}
        </SheetHeader>

        {children}

        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline" className="w-full">
              Close
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default PortalSheet;
