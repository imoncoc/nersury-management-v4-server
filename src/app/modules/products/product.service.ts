import mongoose from 'mongoose';
import { TProduct } from './product.interface';
import { productModel } from './product.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { productSearchableFields } from './product.constant';

const createProductIntoDB = async (product: TProduct) => {
  const result = await productModel.create(product);
  return result;
};

const getAllProductsFromDB = async (query: Record<string, unknown>) => {
  // const result = await productModel.find(query)
  const productQuery = new QueryBuilder(productModel.find(), query)
    .search(productSearchableFields)
    .filter()
    .sort()
    .fields();
  const meta = await productQuery.countTotal();
  const result = await productQuery.modelQuery;
  return { meta, result };
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

  // Check if the document exists before updating
  const existingProduct = await productModel.findById(objectId);
  if (!existingProduct) {
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

// For searching by name, description, category
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

const getProductByIdFromDB = async (id: string) => {
  const result = await productModel.find({
    _id: new mongoose.Types.ObjectId(id),
  });

  return result;
};

const updateProductInventoryFromDB = async (
  productId: string,
  newQuantity: number,
  inStock: boolean,
) => {
  const objectId = new mongoose.Types.ObjectId(productId);
  const result = await productModel.updateOne(
    { _id: objectId },
    {
      $set: { 'inventory.quantity': newQuantity, 'inventory.inStock': inStock },
    },
  );
  return result.modifiedCount > 0;
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  deleteProductFromDB,
  updateProductInDB,
  searchProductsInDB,
  getProductByIdFromDB,
  updateProductInventoryFromDB,
};
