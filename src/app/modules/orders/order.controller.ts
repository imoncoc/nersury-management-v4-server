import { Request, Response } from 'express';
import orderValidationSchema from './order.validation';
import { OrderServices } from './order.service';

// For post Order
const createOrder = async (req: Request, res: Response) => {
  try {
    const { order: orderData } = req.body;
    // const productExists = await ProductServices.getProductByIdFromDB(
    //   orderData.productId,
    // );
    // console.log({ productExists });

    const zodParsedData = orderValidationSchema.parse(orderData);

    const result = await OrderServices.createOrderIntoDB(zodParsedData);

    res.status(200).json({
      success: true,
      message: 'Order created successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  }
};

const getAllOrders = async (req: Request, res: Response) => {
  try {
    let result;
    const { email } = req.query;

    if (email) {
      result = await OrderServices.searchOrderByEmailIntoDB(email as string);
      if (result.length === 0) {
        return res.status(500).json({
          success: false,
          message: `No order found matching the email '${email}'`,
          data: [],
        });
      } else {
        return res.status(200).json({
          success: true,
          message: `Orders fetched successfully for user email: ${email} !`,
          data: result,
        });
      }
    }

    result = await OrderServices.getAllOrderFromDB();
    res.status(200).json({
      success: true,
      message: 'Orders fetched successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  }
};

export const orderController = {
  createOrder,
  getAllOrders,
};
