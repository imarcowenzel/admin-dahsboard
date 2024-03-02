import * as z from "zod";

import { productSchema, settingsSchema } from "@/schemas/product-schema";

export type ProductSchema = z.infer<typeof productSchema>;

export type SettingsSchema = z.infer<typeof settingsSchema>;
