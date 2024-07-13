import express from 'express';
import { ProductControllers } from './product.controller';
const router = express.Router();

router.post('/products', ProductControllers.createProduct);
router.get('/products', ProductControllers.getAllProducts);
router.get('/products/:productId', ProductControllers.getSingleProduct);
router.patch('/products/:productId', ProductControllers.updateProduct);
router.delete('/products/:productId', ProductControllers.deleteProduct);
router.get(
  '/categories-product/name',
  ProductControllers.getCategoriesProducts,
);
router.post(
  '/products/update-stock',
  ProductControllers.updateStockForProducts,
);

export const ProductRoutes = router;
