import * as z from "zod";

export const productSchema = z.object({
  photo: z.object({ url: z.string(), key: z.string() }),
  name: z
    .string()
    .min(1, { message: "Please provide a name for the product." }),
  sku: z.string().optional(),
  description: z
    .string()
    .min(10, { message: "Please provide a description for the product." }),
  price: z
    .string()
    .min(1, { message: "Please provide a price for the product." }),
  discount: z.string().default("0"),
  quantity: z
    .string()
    .min(1, { message: "Please provide a quantity for the product." })
    .regex(/^[0-9]+$/, {
      message: "Quantity should only contain numbers.",
    }),
  category: z
    .string()
    .min(1, { message: "Please provide a category for the product." }),
  sizes: z
    .string()
    .regex(/^[a-zA-Z0-9,]+$/, {
      message: "Sizes should only contain letters, numbers, and commas.",
    })
    .min(1, { message: "Please provide at least one size for the product." }),
  isArchived: z.boolean().optional().default(false),
});

export const settingsSchema = z.object({
  name: z.string().min(2),
});
