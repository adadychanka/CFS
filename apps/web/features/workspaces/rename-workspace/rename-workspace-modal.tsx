"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@repo/ui/components/dialog";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/form";
import { toast } from "sonner";
import { clientAuthGuard } from "@/utils/client-auth-guard";
import { renameNewWorkspace } from "@/lib/actions/workspaces"; // <- replace with renameWorkspace when available
import {
  NEW_WORKSPACE_MAX_LENGTH,
  NEW_WORKSPACE_MIN_LENGTH,
} from "@/constants";

const formSchema = z.object({
  name: z
    .string()
    .min(
      NEW_WORKSPACE_MIN_LENGTH,
      `Name must contain at least ${NEW_WORKSPACE_MIN_LENGTH} character(s)`,
    )
    .max(
      NEW_WORKSPACE_MAX_LENGTH,
      `Name must contain at most ${NEW_WORKSPACE_MAX_LENGTH} character(s)`,
    ),
});

type Props = {
  workspace: {
    id: string;
    name: string;
  };
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRefetchWorkspaces: () => void;
};

const RenameWorkspaceModal = ({
  workspace,
  open,
  onOpenChange,
  onRefetchWorkspaces,
}: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: workspace.name,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const result = await renameNewWorkspace(workspace.id, values.name);
    if (result.success) {
      onRefetchWorkspaces();
      form.reset();
      toast.success("Workspace renamed successfully!");
      onOpenChange(false);
    } else {
      clientAuthGuard(result.status);
      toast.error("Could not rename the workspace");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form
            className="flex flex-col gap-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <DialogHeader>
              <DialogTitle>Rename Workspace</DialogTitle>
              <DialogDescription>
                Enter a new name for your workspace.
              </DialogDescription>
            </DialogHeader>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Marketing team" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Renaming..." : "Rename"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default RenameWorkspaceModal;
