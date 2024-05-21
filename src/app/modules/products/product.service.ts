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

// For updating single product
const updateProductInDB = async (
  productId: string,
  updateData: Partial<TProduct>,
) => {
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    throw new Error('Invalid productId');
  }

  const objectId = new mongoose.Types.ObjectId(productId);

  // Log the ObjectId conversion
  console.log('Converted ObjectId:', objectId);

  // Check if the document exists before updating
  const existingProduct = await productModel.findById(objectId);
  if (!existingProduct) {
    console.log('Product not found for id:', objectId);
    return null;
  }

  const updatedProduct = await productModel.findByIdAndUpdate(
    new mongoose.Types.ObjectId(productId),
    { $set: updateData },
    { new: true, runValidators: true },
  );
  return updatedProduct;
};

const deleteProductFromDB = async (id: string) => {
  const result = await productModel.deleteOne({
    _id: new mongoose.Types.ObjectId(id),
  });
  return result;
};

const searchProductsInDB = async (term: string) => {
  const result = await productModel.find({
    $or: [
      { name: { $regex: term, $options: 'i' } },
      { description: { $regex: term, $options: 'i' } },
      { category: { $regex: term, $options: 'i' } },
    ],
  });

  return result;
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  deleteProductFromDB,
  updateProductInDB,
  searchProductsInDB,
};
