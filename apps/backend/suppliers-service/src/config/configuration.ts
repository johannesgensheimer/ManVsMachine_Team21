export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    path: process.env.DATABASE_PATH || 'suppliers.db',
    sync: process.env.DATABASE_SYNC === 'true' || process.env.NODE_ENV !== 'production',
    logging: process.env.DATABASE_LOGGING === 'true',
  },
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:3001',
    credentials: true,
  },
  swagger: {
    title: 'Supplier Relationship Management API',
    description: 'API for managing supplier relationships',
    version: '1.0',
  },
});