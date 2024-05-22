import { Schema, model } from 'mongoose';
import { TOrder } from './order.interface';
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
orderSchema.pre('save', async function (next) {
  const order = this as TOrder;
  try {
    const product: Array<TProduct> = await ProductServices.getProductByIdFromDB(
      order.productId,
    );
    console.log(product);
    if (!product) {
      return next(new Error('Product ID does not exist in the database'));
    }

    if (
      product.length &&
      (!product[0].inventory || !product[0].inventory.inStock)
    ) {
      return next(new Error('Product is not in stock'));
    }

    if (product[0].inventory.quantity < order.quantity) {
      return next(new Error('Insufficient product quantity in inventory'));
    }

    // Calculate new quantity
    product[0].inventory.quantity -= order.quantity;
    product[0].inventory.inStock = product[0].inventory.quantity > 0;

    const updateData: Partial<TProduct> = {
      inventory: product[0].inventory,
    };
    // Save the updated product
    const result = await ProductServices.updateProductInDB(
      product[0]._id,
      updateData,
    );
    // await product.save();
    if (!result) {
      return next(new Error('Something went wrong!'));
    }

    next();
  } catch (err: any) {
    console.log(err);
  }
});

export const orderModel = model<TOrder>('Order', orderSchema);
