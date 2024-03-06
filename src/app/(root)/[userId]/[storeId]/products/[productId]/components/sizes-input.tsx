"use client";

import { Control } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface SizesInputProps {
  control: Control<any>;
  loading: boolean;
}

const SizesInput: React.FC<SizesInputProps> = ({ control, loading }) => {
  return (
    <FormField
      control={control}
      name="sizes"
      render={({ field }) => (
        <FormItem className="w-full">
          <FormControl>
            <Input
              {...field}
              placeholder="Sizes (use commas to separate each size)"
              disabled={loading}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default SizesInput;
