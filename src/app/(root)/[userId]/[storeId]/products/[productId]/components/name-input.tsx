"use client";

import { Control } from "react-hook-form";

import {
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface NameInputProps {
  control: Control<any>;
  loading: boolean;
}

const NameInput: React.FC<NameInputProps> = ({ control, loading }) => {
  return (
    <FormField
      control={control}
      name="name"
      render={({ field }) => (
        <FormItem className="w-full">
          <FormControl>
            <Input {...field} placeholder="Name" disabled={loading} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default NameInput;
