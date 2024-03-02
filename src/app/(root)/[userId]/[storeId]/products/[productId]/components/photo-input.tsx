"use client";

import { Control } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import ImageUpload from "@/components/ui/image-upload";

interface PhotoInputProps {
  control: Control<any>;
  loading: boolean;
}

const PhotoInput: React.FC<PhotoInputProps> = ({ control, loading }) => {
  return (
    <FormField
      control={control}
      name="photo"
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <ImageUpload
              value={field.value}
              onChange={(url) => field.onChange(url)}
              onRemove={() => field.onChange("")}
              disabled={loading}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default PhotoInput;
