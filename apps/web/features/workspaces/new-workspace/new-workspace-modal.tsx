"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@repo/ui/components/dialog";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { SidebarGroupAction } from "@repo/ui/components/sidebar";
import { Plus } from "lucide-react";
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
import { createNewWorkspace } from "@/lib/actions/workspaces";
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
      `name must contain at most ${NEW_WORKSPACE_MAX_LENGTH} character(s)`,
    ),
});

type Props = {
  isOpen: boolean;
  onModalToggle: (isOpen: boolean) => void;
  onRefetchWorkspaces: () => void;
};

const NewWorkspaceModal = ({
  isOpen,
  onModalToggle,
  onRefetchWorkspaces,
}: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const result = await createNewWorkspace(values.name);
    if (result.success) {
      onModalToggle(false);
      onRefetchWorkspaces();
      form.reset();
      toast.success(result.message);
    } else {
      clientAuthGuard(result.status);
      toast.success("Could not create the workspace");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onModalToggle}>
      <DialogTrigger asChild>
        <SidebarGroupAction title="Add Project">
          <Plus /> <span className="sr-only">Create a new workspace</span>
        </SidebarGroupAction>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form
            className="flex flex-col gap-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <DialogHeader>
              <DialogTitle>Create New Workspace</DialogTitle>
              <DialogDescription>
                Set up your workspace details. You can update these anytime.
              </DialogDescription>
            </DialogHeader>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Personal project" {...field} />
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
                {form.formState.isSubmitting
                  ? "Creating workspace..."
                  : "Create workspace"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default NewWorkspaceModal;
