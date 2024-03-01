"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Store } from "@prisma/client";
import axios from "axios";
import { TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import * as z from "zod";

import { AlertModal } from "@/components/modals/alert-modal";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const settingsSchema = z.object({
  name: z.string().min(2),
});

type SettingsSchema = z.infer<typeof settingsSchema>;

const SettingsForm = ({ initialData }: { initialData: Store }) => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm<SettingsSchema>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      name: initialData.name,
    },
  });

  async function onSubmit(data: SettingsSchema) {
    try {
      await axios.patch(`/api/stores/${initialData.id}`, data);
      router.refresh();
      toast.success("Store updated.");
    } catch (error: any) {
      toast.error("Something went wrong.");
    }
  }

  async function onDelete() {
    try {
      await axios.delete(`/api/stores/${initialData.id}`);
      router.refresh();
      router.push("/");
      toast.success("Store deleted.");
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setOpen(false);
    }
  }

  return (
    <div className="mt-5 flex justify-between w-full">
      <AlertModal
        isOpen={isOpen}
        loading={form.formState.isSubmitting}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
      />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex gap-x-2 items-end"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Name"
                    disabled={form.formState.isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={form.formState.isSubmitting}>
            Save changes
          </Button>
        </form>
        <div className="flex items-end">
          <Button
            type="button"
            disabled={form.formState.isSubmitting}
            onClick={() => setOpen(true)}
            variant="destructive"
            aria-label="Delete store"
          >
            <TrashIcon className="h-4 w-4" />
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default SettingsForm;
