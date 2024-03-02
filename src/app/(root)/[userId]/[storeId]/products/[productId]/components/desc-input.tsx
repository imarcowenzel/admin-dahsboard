"use client";

import { Control } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

interface DescriptionTextareaProps {
  control: Control<any>;
  loading: boolean;
}

const DescriptionTextarea: React.FC<DescriptionTextareaProps> = ({
  control,
  loading,
}) => {
  return (
    <FormField
      control={control}
      name="description"
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Textarea {...field} placeholder="Description" disabled={loading} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default DescriptionTextarea;
