import '@fnd/external_interfaces/env';
import logger from '@fnd/external_interfaces/logger';

(async () => {
  const Logger = logger(__filename);

  const connectDB = async () => {
    const { createConnection } = await import(
      '@fnd/storage/mongo/client/client'
    );
    const MONGO_CLIENT = process.env.MONGO_CLIENT || 'mongo_client';
    const URI_MONGO = process.env.URI_MONGO || '';
    const MONGO_DATABASE = process.env.MONGO_DATABASE || '';
    const POOLSIZE = process.env.POOLSIZE || '1';
    await createConnection({
      key: MONGO_CLIENT,
      conectionUrl: URI_MONGO,
      database: MONGO_DATABASE,
      poolSize: parseInt(POOLSIZE)
    });
    Logger.info('Connected to MongoDB successfully');
  };

  const createCacheConnection = async () => {
    try {
      const { connect } = await import(
        '@fnd/storage/redis/client/client'
      );
      const REDIS_CLIENT = process.env.REDIS_CLIENT || 'client';
      const REDIS_PORT = parseInt(process.env.REDIS_PORT || '6379');
      const REDIS_HOST = process.env.REDIS_HOST || 'localhost';
      const REDIS_PASSWORD = process.env.REDIS_PASSWORD || undefined;
      connect(REDIS_CLIENT, REDIS_PORT, REDIS_HOST, REDIS_PASSWORD);
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  const startWebApp = async () => {
    /** Express server */
    const { Server } = await import('@fnd/web');
    /** Instance of server */
    const server = new Server();
    /** Start a web Server */
    server.start();
  };

  try {
    createCacheConnection();
    await connectDB();
    await startWebApp();
  } catch (err: any) {
    Logger.error(`ERROR : ${err.message}, Stack : ${err.stack}`);
  }
})();
