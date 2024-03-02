"use client";

import { Control } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface SKUInputProps {
  control: Control<any>;
  loading: boolean;
}

const SKUInput: React.FC<SKUInputProps> = ({ control, loading }) => {
  return (
    <FormField
      control={control}
      name="sku"
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Input {...field} placeholder="SKU" disabled={loading} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default SKUInput;
