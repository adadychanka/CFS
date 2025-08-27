import { type ControllerRenderProps } from "react-hook-form";

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

const POSSIBLE_INPUT_TYPES = ["email", "password"];

function AuthFormItem({ field, label, placeholder }: Props) {
  const inputType = POSSIBLE_INPUT_TYPES.includes(field.name)
    ? field.name
    : "text";

  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <Input placeholder={placeholder} {...field} type={inputType} />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
}

export { AuthFormItem };
