import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { errorHandler } from './middleware/Error.js';
import userRouter from './Routes/UserRouter.js';
import productsRouter from './Routes/ProductsRouter.js';
import CategoryRouter from './Routes/CategoryRoute.js';
import OrdersRouter from './Routes/OrderRoutes.js';
import { connectDB } from './config/Db.js';
import Stripe from './config/Stripe.js';
import path from 'path';

dotenv.config();
const __dirname = path.resolve();
const app = express();
app.use(cors(process.env.ALLOWED_ORIGINS));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// connect DB
connectDB();

// other routes
app.use('/api/users', userRouter);
app.use('/api/products', productsRouter);
app.use('/api/categories', CategoryRouter);
app.use('/api/orders', OrdersRouter);
app.use('/api/orders', Stripe);
app.get('/api/config/cloudnary', (req, res) => {
  res.send(process.env.CLOUDINARY);
});

// error handling middleware
app.use(errorHandler);

// Main route
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in  http://localhost/${PORT}`);
});
