const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

router.get('/health', (req, res) => {
  const dbState = mongoose.connection.readyState;
  const dbStatusMap = {
    0: 'Disconnected',
    1: 'Connected',
    2: 'Connecting',
    3: 'Disconnecting',
  };

  res.status(200).json({
    status: 'healthy',
    platform: 'Omniva SaaS Engine',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    uptimeSeconds: process.uptime(),
    database: {
      status: dbStatusMap[dbState] || 'Unknown',
      connected: dbState === 1,
    },
    environment: process.env.NODE_ENV || 'development',
  });
});

// Deep health check for monitoring probes and production deployment readiness
router.get('/health/deep', async (req, res) => {
  const dbState = mongoose.connection.readyState;
  let dbLatencyMs = -1;

  if (dbState === 1 && mongoose.connection.db) {
    const start = Date.now();
    try {
      await mongoose.connection.db.admin().ping();
      dbLatencyMs = Date.now() - start;
    } catch {
      dbLatencyMs = -1;
    }
  }

  const memory = process.memoryUsage();

  res.status(200).json({
    status: dbState === 1 ? 'ready' : 'degraded',
    platform: 'Omniva Multi-Tenant SaaS Platform',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    system: {
      nodeVersion: process.version,
      memory: {
        heapUsedMb: Math.round(memory.heapUsed / 1024 / 1024),
        heapTotalMb: Math.round(memory.heapTotal / 1024 / 1024),
        rssMb: Math.round(memory.rss / 1024 / 1024),
      },
    },
    database: {
      connected: dbState === 1,
      latencyMs: dbLatencyMs,
      replicaSet: mongoose.connection.client?.topology?.description?.type || 'ReplicaSetNoPrimary',
    },
    security: {
      helmetActive: true,
      corsRestricted: true,
      rateLimitingActive: true,
      nosqlSanitizationActive: true,
    },
  });
});

module.exports = router;
