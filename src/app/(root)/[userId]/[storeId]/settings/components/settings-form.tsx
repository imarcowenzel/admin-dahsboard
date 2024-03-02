"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Store } from "@prisma/client";
import axios from "axios";
import { TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

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
import { settingsSchema } from "@/schemas/product-schema";
import { SettingsSchema } from "@/types";

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
      toast.error("Failed to update the store. Please try again.");
    }
  }

  async function onDelete() {
    try {
      await axios.delete(`/api/stores/${initialData.id}`);
      router.refresh();
      router.push("/");
      toast.success("Store deleted.");
    } catch (error: any) {
      toast.error("Failed to update the store. Please try again.");
    } finally {
      setOpen(false);
    }
  }

  return (
    <section className="mt-5 flex flex-col lg:flex-row gap-5 justify-between w-full">
      <AlertModal
        isOpen={isOpen}
        loading={form.formState.isSubmitting}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
      />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex gap-x-5 items-end lg:justify-start justify-between w-full"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Store name</FormLabel>
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

          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="text-black dark:text-white bg-secondary dark:bg-dark-secondary"
          >
            {!form.formState.isSubmitting ? "Save change" : "Saving..."}
          </Button>
        </form>
      </Form>

      <div className="flex items-end">
        <Button
          type="button"
          disabled={form.formState.isSubmitting}
          onClick={() => setOpen(true)}
          variant="destructive"
          aria-label="Delete store"
          className="flex gap-2 items-center w-full"
        >
          <TrashIcon className="h-4 w-4" />
          Delete store
        </Button>
      </div>
    </section>
  );
};

export default SettingsForm;
