import { ControllerRenderProps } from "react-hook-form";

import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/form";
import { Input } from "@repo/ui/components/input";

type EmailField = ControllerRenderProps<{ email: string }, "email">;
type PasswordField = ControllerRenderProps<{ password: string }, "password">;

type Props = {
  field: EmailField | PasswordField;
  label: string;
  placeholder: string;
};

function AuthFormItem({ field, label, placeholder }: Props) {
  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <Input placeholder={placeholder} {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
}

export { AuthFormItem };
