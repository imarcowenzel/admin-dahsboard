"use client";

import { Control } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface DiscountInputProps {
  control: Control<any>;
  loading: boolean;
}

const DiscountInput: React.FC<DiscountInputProps> = ({ control, loading }) => {
  return (
    <FormField
      control={control}
      name="discount"
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Input
              type="number"
              {...field}
              placeholder="Discount"
              disabled={loading}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default DiscountInput;
