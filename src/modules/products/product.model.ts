import { Schema, model } from 'mongoose';
import { TInventory, TProduct, TVariant } from './product.interface';

const variantSchema = new Schema<TVariant>({
  type: {
    type: String,
    require: true,
  },
  value: {
    type: String,
    require: true,
  },
});

const inventorySchema = new Schema<TInventory>({
  quantity: {
    type: Number,
    require: true,
  },
  inStock: {
    type: Boolean,
    require: true,
  },
});

const productSchema = new Schema<TProduct>(
  {
    name: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    category: {
      type: String,
      require: true,
    },
    tags: {
      type: [],
      require: true,
    },
    variants: {
      type: [variantSchema],
      require: true,
    },
  },
  {
    versionKey: false, // skip unwanted field __v in database
  },
);

export const productModel = model<TProduct>('Product', productSchema);
