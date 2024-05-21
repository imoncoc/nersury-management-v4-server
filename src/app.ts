import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { ProductRoutes } from './app/modules/products/product.route';
const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// application routes
app.use('/api', ProductRoutes);

const getController = (req: Request, res: Response) => {
  res.send('Hello Next level Developer!');
};

app.get('/', getController);

export default app;
