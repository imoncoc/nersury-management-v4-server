import { TProduct } from './product.interface';
import { productModel } from './product.model';

const createProductIntoDB = async (product: TProduct) => {
  const result = await productModel.create(product);
  return result;
};

export const ProductServices = {
  createProductIntoDB,
};
