import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import branchRoutes from './routes/branchRoutes.js';
import supplierRoutes from './routes/supplierRoutes.js';
import productRoutes from './routes/productRoutes.js';
import customerRoutes from './routes/customerRoutes.js';
import saleRoutes from './routes/saleRoutes.js';
import employeeRoutes from './routes/employeeRoutes.js';
import inventoryItemRoutes from './routes/inventoryItemRoutes.js';
import expenseRoutes from './routes/expenseRoutes.js';
import financialAccountRoutes from './routes/financialAccountRoutes.js';
import supplyChainItemRoutes from './routes/supplyChainItemRoutes.js';
import supplyMovementRoutes from './routes/supplyMovementRoutes.js';
import supplyInventoryRoutes from './routes/supplyInventoryRoutes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', branchRoutes);
app.use('/api', supplierRoutes);
app.use('/api', productRoutes);
app.use('/api', customerRoutes);
app.use('/api', saleRoutes);
app.use('/api', employeeRoutes);
app.use('/api', inventoryItemRoutes);
app.use('/api', expenseRoutes);
app.use('/api', financialAccountRoutes);
app.use('/api', supplyChainItemRoutes);
app.use('/api', supplyMovementRoutes);
app.use('/api', supplyInventoryRoutes);

const PORT = process.env.PORT || 5000;

// Removed mongoose connection to allow the app to run without a database

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
