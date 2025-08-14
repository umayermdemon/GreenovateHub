import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

type InputProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
  name: string;
  label: string;
  type?: "text" | "email" | "password";
  placeholder: string;
};

export const FormInput = ({
  control,
  name,
  label,
  type = "text",
  placeholder,
}: InputProps) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel className="font-bold text-sm sm:text-base text-gray-500">
          {label}
        </FormLabel>
        <FormControl>
          <Input
            {...field}
            type={type}
            value={field.value || ""}
            placeholder={placeholder}
            className="p-3 sm:p-6 w-full border-2"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);
