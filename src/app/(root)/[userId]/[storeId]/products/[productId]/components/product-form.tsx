"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Product } from "@prisma/client";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { productSchema } from "@/schemas/product-schema";
import { ProductSchema } from "@/types";
import CategorySelect from "./category-select";
import DescriptionTextarea from "./desc-input";
import DiscountInput from "./discount-input";
import IsArchivedSwitch from "./is-archived-switch";
import NameInput from "./name-input";
import PhotoInput from "./photo-input";
import PriceInput from "./price-input";
import SizesInput from "./sizes-input";
import SKUInput from "./sku-input";

const ProductForm = ({ initialData }: { initialData: Product | null }) => {
  
  const { userId, storeId, productId } = useParams();
  const router = useRouter();

  const toastSuccess = initialData ? "Product updated." : "Product created.";
  const toastError = initialData
    ? "Failed to save the product. Please try again."
    : "Failed to create the product. Please try again.";
  const action = initialData ? "Save changes" : "Create";
  const loading = initialData ? "Saving..." : "Creating...";

  const defaultValues = initialData
    ? {
        ...initialData,
        price: parseFloat(String(initialData?.price)),
        discount: parseFloat(String(initialData?.discount)),
      }
    : {
        ...productSchema,
        photo: "",
      };

  const form = useForm<ProductSchema>({
    resolver: zodResolver(productSchema),
    defaultValues,
  });

  async function onSubmit(data: ProductSchema) {
    try {
      if (initialData) {
        await axios.patch(`/api/${storeId}/products/${productId}`, data);
      } else {
        await axios.post(`/api/${storeId}/products`, data);
      }
      router.push(`/${userId}/${storeId}/products`);
      router.refresh();
      toast.success(toastSuccess);
    } catch (error) {
      console.log(error);
      toast.error(toastError);
    }
  }

  return (

    <section className="mt-5 flex justify-center">

      <Form {...form}>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col lg:w-1/2 gap-y-5"
        >

          <PhotoInput
            control={form.control}
            loading={form.formState.isSubmitting}
          />

          <NameInput
            control={form.control}
            loading={form.formState.isSubmitting}
          />

          <SKUInput
            control={form.control}
            loading={form.formState.isSubmitting}
          />

          <DescriptionTextarea
            control={form.control}
            loading={form.formState.isSubmitting}
          />

          <PriceInput
            control={form.control}
            loading={form.formState.isSubmitting}
          />

          <DiscountInput
            control={form.control}
            loading={form.formState.isSubmitting}
          />

          <CategorySelect
            control={form.control}
            loading={form.formState.isSubmitting}
          />

          <SizesInput
            control={form.control}
            loading={form.formState.isSubmitting}
          />

          <IsArchivedSwitch
            control={form.control}
            loading={form.formState.isSubmitting}
          />

          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="text-black dark:text-white bg-secondary dark:bg-dark-secondary"
          >
            {!form.formState.isSubmitting ? action : loading}
          </Button>

        </form>

      </Form>

    </section>
  );
};

export default ProductForm;
