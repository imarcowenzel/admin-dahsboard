"use client";

import { Control } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMaskito } from "@maskito/react";

import options from "./porcentage-postfix-mask";

interface DiscountInputProps {
  control: Control<any>;
  loading: boolean;
  setValue: any;
  form: any;
}

const DiscountInput: React.FC<DiscountInputProps> = ({
  control,
  loading,
  setValue,
  form,
}) => {
  const maskedInputRef = useMaskito({ options });

  return (
    <FormField
      control={control}
      name="discount"
      render={({ field }) => (
        <FormItem className="w-full">
          <FormControl>
            <Input
              {...field}
              ref={maskedInputRef}
              placeholder="Discount"
              onInput={(e) => {
                form.setValue("discount", e.currentTarget.value);
              }}
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
