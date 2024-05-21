import { Schema, model } from 'mongoose';
import { TOrder } from './order.interface';

const orderSchema = new Schema<TOrder>(
  {
    email: {
      type: String,
      require: true,
    },
    productId: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    quantity: {
      type: Number,
      require: true,
    },
  },
  {
    versionKey: false, // skip unwanted field __v in database
  },
);

export const orderModel = model<TOrder>('Order', orderSchema);
