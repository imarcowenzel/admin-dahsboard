import * as z from "zod";

export const productSchema = z.object({
  photo: z
    .string()
    .min(1, { message: "Please upload a photo for the product." }),
  name: z
    .string()
    .min(1, { message: "Please provide a name for the product." }),
  sku: z.string().optional(),
  description: z
    .string()
    .min(10, { message: "Please provide a description for the product." }),
  price: z.coerce
    .number()
    .min(1, { message: "Please provide a price for the product." }),
  discount: z.coerce.number().optional(),
  category: z
    .string()
    .min(1, { message: "Please provide a category for the product." }),
  sizes: z
    .string()
    .regex(/^[a-zA-Z0-9,]+$/, {
      message: "Sizes should only contain letters, numbers, and commas.",
    })
    .min(1, { message: "Please provide at least one size for the product." }),
  isArchived: z.boolean().optional(),
});

export const settingsSchema = z.object({
  name: z.string().min(2),
});
