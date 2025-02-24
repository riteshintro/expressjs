import express from 'express';
import userRoutes from './api/routes/users';
import adminRoutes from './api/routes/admin';

const app = express();

app.use(express.json());
app.use('/u-v2', userRoutes);
app.use('/a-v2', adminRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});