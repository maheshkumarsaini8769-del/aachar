import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.resolve(__dirname, '../public/uploads');

const app = express();

app.use(cors());
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

// Serve uploaded files statically
app.use('/uploads', express.static(uploadsDir));

// API Routes
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'DesiRasoi Achar Backend API',
    time: new Date().toISOString()
  });
});

// 404 handler for API routes
app.use((req, res) => {
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ success: false, error: 'API route not found' });
  }
  res.status(404).send('Not Found');
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('[API Error]:', err);
  res.status(err.statusCode || 500).json({
    success: false,
    error: err.message || 'Internal server error'
  });
});

export default app;
