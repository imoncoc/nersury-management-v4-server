import { z } from 'zod';
const variantValidationSchema = z.object({
  type: z.string().nonempty({ message: 'Variant type is required.' }),
  value: z.string().nonempty({ message: 'Variant value is required.' }),
});

const inventoryValidationSchema = z.object({
  quantity: z
    .number()
    .int({ message: 'Quantity must be an integer.' })
    .nonnegative({ message: 'Quantity cannot be negative.' }),
  inStock: z.boolean({ message: 'In stock must be a boolean value.' }),
});

const productValidationSchema = z.object({
  name: z.string().nonempty({ message: 'Product name is required.' }),
  description: z
    .string()
    .nonempty({ message: 'Product description is required.' }),
  price: z.number().positive({ message: 'Price must be a positive number.' }),
  category: z.string().nonempty({ message: 'Category is required.' }),
  tags: z
    .array(z.string().nonempty({ message: 'Tag cannot be an empty string.' }))
    .nonempty({ message: 'At least one tag is required.' }),
  variants: z
    .array(variantValidationSchema)
    .nonempty({ message: 'At least one variant is required.' }),
  inventory: inventoryValidationSchema,
  manufacturer: z.string().optional(),
});

export default productValidationSchema;
