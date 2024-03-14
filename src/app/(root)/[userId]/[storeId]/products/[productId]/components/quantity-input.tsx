import { Control } from "react-hook-form";

import {
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface QuantityInputProps {
  control: Control<any>;
  loading: boolean;
}

const QuantityInput = ({ control, loading }: QuantityInputProps) => {
  return (
    <FormField
      control={control}
      name="quantity"
      render={({ field }) => (
        <FormItem className="w-full">
          <FormControl>
            <Input {...field} placeholder="Quantity" disabled={loading} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default QuantityInput;
