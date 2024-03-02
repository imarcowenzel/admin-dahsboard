"use client";

import { Control } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";

interface IsArchivedSwitchProps {
  control: Control<any>;
  loading: boolean;
}

const IsArchivedSwitch: React.FC<IsArchivedSwitchProps> = ({
  control,
  loading,
}) => {
  return (
    <FormField
      control={control}
      name="isArchived"
      render={({ field }) => (
        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
          <FormControl>
            <Switch
              checked={field.value}
              onCheckedChange={field.onChange}
              aria-readonly
              disabled={loading}
            />
          </FormControl>
          <div className="space-y-1 leading-none">
            <FormLabel>Is archived? {field.value}</FormLabel>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default IsArchivedSwitch;
