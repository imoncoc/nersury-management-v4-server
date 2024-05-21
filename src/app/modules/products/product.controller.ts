import { Request, Response } from 'express';
import { ProductServices } from './product.service';
import productValidationSchema from './product.validation';

// For post product
const createProduct = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const { product: productData } = req.body;
    console.log({ productData });
    // Data validation using zod
    const zodParsedData = productValidationSchema.parse(productData);

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
const getAllProducts = async (req: Request, res: Response) => {
  try {
    const { searchTerm } = req.query;
    // console.log({ searchTerm });
    let result;
    if (searchTerm) {
      // console.log('serach term works');
      result = await ProductServices.searchProductsInDB(searchTerm as string);
      console.log({ result });
      if (result.length === 0) {
        return res.status(200).json({
          success: false,
          message: `No products found matching the search term '${searchTerm}'`,
          data: [],
        });
      } else {
        return res.status(200).json({
          success: true,
          message: `Products matching search term '${searchTerm}' fetched successfully!`,
          data: result,
        });
      }
    }

    result = await ProductServices.getAllProductsFromDB();
    res.status(200).json({
      success: true,
      message: 'Products fetched successfully!',
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
    const { product: updateData } = req.body;

    console.log('Received product data:', updateData);
    // we can use zod validation if pass every data other wise as it now
    // const zodParsedData = productValidationSchema.parse(updateData);

    console.log('Validated product data:', updateData);
    const result = await ProductServices.updateProductInDB(
      productId,
      updateData,
    );

    console.log('Update result:', result);

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

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
