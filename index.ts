
import express from 'express';
import userRoutes from './routes/userRoutes.js';
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


const app = express();
const port = 3000;

app.use(express.json());

app.use('/api', userRoutes);
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

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
