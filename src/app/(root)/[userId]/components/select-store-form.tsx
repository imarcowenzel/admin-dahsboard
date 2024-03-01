"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Store } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const selectStoreSchema = z.object({
  store: z.string().min(2, {
    message: "Please, select a store.",
  }),
});

type SelectStoreSchema = z.infer<typeof selectStoreSchema>;

const SelectStoreForm = ({ stores }: { stores: Store[] }) => {
  const router = useRouter();
  const { userId } = useParams();

  const form = useForm<SelectStoreSchema>({
    resolver: zodResolver(selectStoreSchema),
    defaultValues: {
      store: "",
    },
  });

  async function onSubmit(values: SelectStoreSchema) {
    router.push(`${userId}/${values.store}/dashboard`);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="store"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Stores</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a store" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {stores?.map((store) => (
                    <SelectItem
                      key={store.id}
                      value={store.id}
                      disabled={form.formState.isSubmitting}
                      className="cursor-pointer"
                    >
                      {store.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="w-full flex justify-end">
          <Button disabled={form.formState.isSubmitting}>Continue</Button>
        </div>
      </form>
    </Form>
  );
};

export default SelectStoreForm;
