import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { ProductRoutes } from './app/modules/products/product.route';
import { OrderRoutes } from './app/modules/orders/order.router';
const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

const getController = (req: Request, res: Response) => {
  res.send('Hello Next level Developer!');
};
app.get('/', getController);

// application routes
app.use('/api', ProductRoutes);
app.use('/api', OrderRoutes);

app.all('*', (req: Request, res: Response) => {
  res.status(400).json({
    success: false,
    message: 'Route is not found!',
  });
});

export default app;
