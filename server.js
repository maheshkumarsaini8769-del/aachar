import app from './server/app.js';
import { connectDB } from './server/db.js';
import { seedInitialProducts } from './server/seed.js';

const PORT = process.env.PORT || 5001;

async function startServer() {
  try {
    // 1. Connect to MongoDB
    await connectDB();

    // 2. Automatically seed initial catalog if empty
    await seedInitialProducts(false);

    // 3. Start listening
    const server = app.listen(PORT, '0.0.0.0', () => {
      console.log(`[DesiRasoi Server] Running on http://127.0.0.1:${PORT}`);
      console.log(`[DesiRasoi Server] API endpoints available at http://127.0.0.1:${PORT}/api/products`);
    });

    const shutdown = async () => {
      console.log('\n[DesiRasoi Server] Shutting down gracefully...');
      server.close();
      process.exit(0);
    };

    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);
  } catch (error) {
    console.error('[DesiRasoi Server] Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
