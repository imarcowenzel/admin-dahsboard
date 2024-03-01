"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "react-hot-toast";

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

const createStoreSchema = z.object({
  name: z.string().min(2, {
    message: "Store name must be at least 2 characters.",
  }),
});

type CreateStoreSchema = z.infer<typeof createStoreSchema>;

const CreateStoreForm = () => {
  
  const router = useRouter();
  const params = useParams();

  const form = useForm<CreateStoreSchema>({
    resolver: zodResolver(createStoreSchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(values: CreateStoreSchema) {
    try {
      const store = await axios.post("/api/stores", values);
      toast.success("Store created!");
      router.push(`${params.userId}/${store.data.id}/dashboard`);
    } catch (error) {
      console.log(error);
      toast.error("Error creating store. Please try again.");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Store name</FormLabel>
              <FormControl>
                <Input placeholder="Enter store name..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="w-full flex justify-end">
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {!form.formState.isSubmitting ? "Create" : "Creating..."}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateStoreForm;
