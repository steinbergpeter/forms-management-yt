import type { Control } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { type User } from "@/validation/formSchema";

type FieldProps = {
  control: Control<User>;
  name: keyof User;
  label: string;
  desc: string;
  className?: string;
};

const Field = ({ control, name, label, desc, className }: FieldProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input placeholder="" {...field} />
          </FormControl>
          <FormDescription>{desc}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export { Field };
