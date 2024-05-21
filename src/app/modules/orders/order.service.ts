import { TOrder } from './order.interface';
import { orderModel } from './order.model';

const createOrderIntoDB = async (product: TOrder) => {
  const result = await orderModel.create(product);
  return result;
};

const getAllOrderFromDB = async () => {
  const result = await orderModel.find();
  return result;
};

export const OrderServices = {
  createOrderIntoDB,
  getAllOrderFromDB,
};
