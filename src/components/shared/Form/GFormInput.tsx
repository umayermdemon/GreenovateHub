"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import { ReactNode, useState, InputHTMLAttributes } from "react";
import { Eye, EyeOff } from "lucide-react";

interface IconInputFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "name"> {
  name: string;
  label?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  icon?: ReactNode;
}

const GFormInput = ({
  name,
  label,
  placeholder,
  type = "text",
  control,
  icon,
  required,
  ...rest
}: IconInputFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="relative">
      {icon && (
        <div className="absolute left-3 top-3/4 h-4 w-4 -translate-y-1/2 text-muted-foreground ">
          {icon}
        </div>
      )}
      <FormField
        control={control}
        name={name}
        rules={{ required: required ? "This field is required" : false }}
        render={({ field }) => (
          <FormItem>
            {label && (
              <FormLabel>
                {label}
                <span className="text-xl text-green-500 relative right-1">
                  *
                </span>
              </FormLabel>
            )}
            <FormControl>
              <div>
                <Input
                  placeholder={placeholder}
                  type={type === "password" && showPassword ? "text" : type}
                  className={icon ? "pl-10 pt-4 pb-4" : ""}
                  required={required}
                  {...field}
                  {...rest}
                />

                {type === "password" && (
                  <button
                    type="button"
                    onClick={handleTogglePassword}
                    className="absolute right-3 top-3/4 transform -translate-y-1/2 text-muted-foreground">
                    {showPassword ? (
                      <EyeOff className="cursor-pointer relative bottom-2" size={20} />
                    ) : (
                      <Eye className="cursor-pointer relative bottom-2" size={20} />
                    )}
                  </button>
                )}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default GFormInput;
