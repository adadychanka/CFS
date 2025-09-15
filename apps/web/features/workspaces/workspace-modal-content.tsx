import { z } from "zod";
import {
  NEW_WORKSPACE_MAX_LENGTH,
  NEW_WORKSPACE_MIN_LENGTH,
} from "@/constants";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@repo/ui/components/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/form";
import { Input } from "@repo/ui/components/input";
import { Button } from "@repo/ui/components/button";

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

export type WorkspaceFormValues = z.infer<typeof formSchema>;

type Props = {
  title: string;
  description: string;
  submitLabel: string;
  submittingLabel: string;
  defaultName?: string;
  onSubmit: (values: WorkspaceFormValues, reset: () => void) => Promise<void>;
};

const WorkspaceModalContent = ({
  title,
  description,
  submitLabel,
  submittingLabel,
  defaultName,
  onSubmit,
}: Props) => {
  const form = useForm<WorkspaceFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: defaultName || "",
    },
  });

  const handleSubmit = async (values: WorkspaceFormValues) => {
    await onSubmit(values, () => form.reset());
  };

  return (
    <DialogContent className="sm:max-w-[425px]">
      <Form {...form}>
        <form
          className="flex flex-col gap-4"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Name</FormLabel>
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
              {form.formState.isSubmitting ? submittingLabel : submitLabel}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
};

export default WorkspaceModalContent;
