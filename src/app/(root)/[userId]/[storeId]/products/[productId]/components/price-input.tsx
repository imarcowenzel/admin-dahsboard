"use client";

import { Control } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface PriceInputProps {
  control: Control<any>;
  loading: boolean;
}

const PriceInput: React.FC<PriceInputProps> = ({ control, loading }) => {
  return (
    <FormField
      control={control}
      name="price"
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Input
              type="number"
              {...field}
              placeholder="Price"
              disabled={loading}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default PriceInput;
