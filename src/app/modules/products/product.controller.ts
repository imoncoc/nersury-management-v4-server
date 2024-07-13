import { Request, Response } from 'express';
import { ProductServices } from './product.service';
import productValidationSchema from './product.validation';
import { TProduct } from './product.interface';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

// For post product
const createProduct = async (req: Request, res: Response) => {
  try {
    const product: TProduct = req.body;

    // Data validation using zod
    const zodParsedData = productValidationSchema.parse(product);

    const result = await ProductServices.createProductIntoDB(zodParsedData);

    res.status(200).json({
      success: true,
      message: 'Product created successfully',
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

// For get all products
// const getAllProducts = async (req: Request, res: Response) => {
//   try {
//     const { searchTerm } = req.query;
//     // console.log({ searchTerm });
//     let result;
//     if (searchTerm) {
//       // console.log('search term works');
//       result = await ProductServices.searchProductsInDB(searchTerm as string);
//       if (result.length === 0) {
//         return res.status(500).json({
//           success: false,
//           message: `No products found matching the search term '${searchTerm}'`,
//           data: [],
//         });
//       } else {
//         return res.status(200).json({
//           success: true,
//           message: `Products matching search term '${searchTerm}' fetched successfully!`,
//           data: result,
//         });
//       }
//     }

//     result = await ProductServices.getAllProductsFromDB();
//     res.status(200).json({
//       success: true,
//       message: 'Products fetched successfully!',
//       data: result,
//     });
//   } catch (err: any) {
//     res.status(500).json({
//       success: false,
//       message: err.message || 'something went wrong',
//       error: err,
//     });
//   }
// };

const getAllProducts = catchAsync(async (req, res) => {
  const result = await ProductServices.getAllProductsFromDB(req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Products retrieved successfully',
    data: result,
  });
});

// For Single Product
const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.getSingleProductFromDB(productId);
    res.status(200).json({
      success: true,
      message: 'Product fetched successfully!',
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

const updateProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const updateData = req.body;

    const result = await ProductServices.updateProductInDB(
      productId,
      updateData,
    );
    if (!result) {
      res.status(404).json({
        success: false,
        message: 'Product not found or invalid productId',
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Product updated successfully!',
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

// Delete Single Product
const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.deleteProductFromDB(productId);
    res.status(200).json({
      success: true,
      message: 'Product deleted successfully!',
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

const getCategoriesProducts = catchAsync(async (req, res) => {
  const result = await ProductServices.categoriesProductsInDB();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Products categories retrieved successfully',
    data: result,
  });
});

const updateStockForProducts = catchAsync(async (req, res) => {
  const result = await ProductServices.updateStockForProductsIntoDB(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Products categories retrieved successfully',
    data: result,
  });
});

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  getCategoriesProducts,
  updateStockForProducts,
};
