import mongoose from 'mongoose';
import { TProduct, UpdateStockInput } from './product.interface';
import { Product } from './product.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { productSearchableFields } from './product.constant';

const createProductIntoDB = async (product: TProduct) => {
  const result = await Product.create(product);
  return result;
};

const getAllProductsFromDB = async (query: Record<string, unknown>) => {
  const productQuery = new QueryBuilder(Product.find(), query)
    .search(productSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await productQuery.modelQuery;
  const meta = await productQuery.countTotal();
  return { meta, result };
};

const getSingleProductFromDB = async (productId: string) => {
  const result = await Product.aggregate([
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
  const existingProduct = await Product.findById(objectId);
  if (!existingProduct) {
    return null;
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    new mongoose.Types.ObjectId(productId),
    { $set: updateData },
    { new: true, runValidators: true },
  );
  return updatedProduct;
};

const deleteProductFromDB = async (id: string) => {
  const result = await Product.deleteOne({
    _id: new mongoose.Types.ObjectId(id),
  });
  return result;
};

// For searching by name, description, category
const searchProductsInDB = async (term: string) => {
  const result = await Product.find({
    $or: [
      { name: { $regex: term, $options: 'i' } },
      { description: { $regex: term, $options: 'i' } },
      { category: { $regex: term, $options: 'i' } },
    ],
  });

  return result;
};

const getProductByIdFromDB = async (id: string) => {
  const result = await Product.find({
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
  const result = await Product.updateOne(
    { _id: objectId },
    {
      $set: { 'inventory.quantity': newQuantity, 'inventory.inStock': inStock },
    },
  );
  return result.modifiedCount > 0;
};

// const categoriesProductsInDB = async () => {
//   const result = await Product.find({}, 'categoriesName');
//   const categoriesSet = new Set(
//     result.map((product) => product.categoriesName),
//   );
//   const uniqueCategories = Array.from(categoriesSet);

//   return uniqueCategories;
// };
const categoriesProductsInDB = async () => {
  const products = await Product.find({}, 'categoriesName thumbnail');
  const categoriesMap = new Map();
  products.forEach((product) => {
    if (!categoriesMap.has(product.categoriesName)) {
      categoriesMap.set(product.categoriesName, product.thumbnail);
    }
  });
  const uniqueCategories = Array.from(
    categoriesMap,
    ([categoriesName, thumbnail]) => ({ categoriesName, thumbnail }),
  );

  return uniqueCategories;
};

const updateStockForProductsIntoDB = async (updates: UpdateStockInput[]) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const results = [];
    for (const update of updates) {
      const { id, quantity } = update;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error(`Invalid productId: ${id}`);
      }

      const product = await Product.findById(id).session(session);
      if (!product) {
        throw new Error(`Product not found: ${id}`);
      }

      const newStock = product.stock - quantity;
      const updatedData: Partial<TProduct> = {
        stock: newStock,
        availabilityStock: newStock > 0,
      };

      const updatedProduct = await Product.findByIdAndUpdate(
        id,
        { $set: updatedData },
        { new: true, runValidators: true, session },
      );

      results.push(updatedProduct);
    }

    await session.commitTransaction();
    session.endSession();

    return results;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
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
  categoriesProductsInDB,
  updateStockForProductsIntoDB,
};
