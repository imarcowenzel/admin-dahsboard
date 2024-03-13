"use client";

import axios from "axios";
import { useState } from "react";
import { Control } from "react-hook-form";
import toast from "react-hot-toast";

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
  const [removalStatus, setRemovalStatus] = useState<boolean | null>(null);

  async function removePhoto(photo: { url: string; key: string }) {
    try {
      const res = await axios.delete("/api/uploadthing", { data: photo });

      if (res.data.success === true) {
        setRemovalStatus(true);
      } else {
        setRemovalStatus(false);
      }
    } catch (error: any) {
      console.error(error.message);
      setRemovalStatus(false);
    }
  }

  return (
    <FormField
      control={control}
      name="photo"
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <ImageUpload
              value={field.value}
              onChange={(photoUploaded) =>
                field.onChange({
                  url: photoUploaded.url,
                  key: photoUploaded.key,
                })
              }
              onRemove={async () => {
                await removePhoto(field.value);
                if (removalStatus === true) {
                  field.onChange("");
                  toast.success("Photo removed.");
                } else {
                  toast.error("Failed to remove photo.");
                }
                setRemovalStatus(null);
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

export default PhotoInput;
