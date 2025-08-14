"use client";

import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import clsx from "clsx";
import { Control } from "react-hook-form";

interface Option {
    label: string;
    value: string;
}

interface EFormSelectProps {
    name: string;
    label?: string;
    placeholder?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    control: Control<any>;
    options: Option[];
    required?: boolean;
    className?: string;
    defaultValue?:string;
}

const GFormSelect = ({
    name,
    label,
    placeholder = "Select an option",
    control,
    options,
    required = true,
    className
}: EFormSelectProps) => {
    return (
        <FormField
            control={control}
            name={name}
            rules={{ required: required ? "This field is required" : false }}
            render={({ field }) => (
                <FormItem>
                    {label && <FormLabel>{label}<span className="text-xl text-green-500 relative right-1">*</span></FormLabel>}
                    <Select
                        onValueChange={field.onChange}
                        value={field.value}
                    // defaultValue={field.value}
                    >
                        <FormControl>
                            <SelectTrigger className={clsx("rounded-md", className)}>
                                <SelectValue placeholder={placeholder} />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {options.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default GFormSelect;