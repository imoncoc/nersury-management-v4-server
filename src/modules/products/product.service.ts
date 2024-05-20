import mongoose from 'mongoose';
import { TProduct } from './product.interface';
import { productModel } from './product.model';

const createProductIntoDB = async (product: TProduct) => {
  const result = await productModel.create(product);
  return result;
};

const getAllProductsFromDB = async () => {
  const result = await productModel.find();
  return result;
};

const getSingleProductFromDB = async (productId: string) => {
  const result = await productModel.aggregate([
    {
      $match: { _id: new mongoose.Types.ObjectId(productId) },
    },
  ]);
  return result;
};

const deleteProductFromDB = async (id: string) => {
  const result = await productModel.deleteOne({
    _id: new mongoose.Types.ObjectId(id),
  });
  return result;
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  deleteProductFromDB,
};
