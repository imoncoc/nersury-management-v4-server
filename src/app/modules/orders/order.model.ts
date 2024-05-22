import { Schema, model } from 'mongoose';
import { TOrder } from './order.interface';
import { productModel } from '../products/product.model';
import { ProductServices } from '../products/product.service';
import { TProduct } from '../products/product.interface';

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

// before save order need to check if product is available
// orderSchema.pre('save', async function (next) {
//   const order = this as any;
//   try {
//     const product: TProduct = await ProductServices.getProductByIdFromDB(
//       order.productId,
//     );
//     if (!product) {
//       return next(new Error('Product ID does not exist in the database'));
//     }

//     if (!product.inventory || !product.inventory.inStock) {
//       return next(new Error('Product is not in stock'));
//     }

//     if (product.inventory.quantity < order.quantity) {
//       return next(new Error('Insufficient product quantity in inventory'));
//     }

//     // Calculate new quantity
//     product.inventory.quantity -= order.quantity;
//     product.inventory.inStock = product.inventory.quantity > 0;

//     // Save the updated product
//     // await product.save();

//     next();
//   } catch (err: any) {
//     console.log(err);
//   }
// });

export const orderModel = model<TOrder>('Order', orderSchema);
