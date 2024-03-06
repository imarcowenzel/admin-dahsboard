"use client";

import { useMaskito } from '@maskito/react';
import { Control } from "react-hook-form";
import options from "@/lib/mask";

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
  setValue: any;
}

const PriceInput: React.FC<PriceInputProps> = ({ control, loading, setValue }) => {

  const inputRef = useMaskito({options})

  return (
    <FormField
      control={control}
      name="price"
      render={({ field }) => (
        <FormItem className="w-full">
          <FormControl>
            <Input
              {...field}
              ref={inputRef}
              onInput={(e) => {
                setValue("price", e.currentTarget.value)
              }}
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
