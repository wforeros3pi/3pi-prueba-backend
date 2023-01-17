import { MongoClient, Db } from 'mongodb';
import logger from '@fnd/external_interfaces/logger';

const env = process.env.DB_LOG_LEVEL || 'development';
const LOG_LEVEL = env === 'development' ? 'debug' : 'error';

const Logger = logger(__filename);

const clients: Map<string, Db> = new Map();

interface connectionProperties {
    key?: string;
    conectionUrl?: string;
    database?: string;
    poolSize?: number;
}

const createConnection = async ({
  key = 'mongo_client',
  conectionUrl = '',
  database = 'database',
  poolSize = 1
}: connectionProperties) => {
  const con: MongoClient = await MongoClient.connect(conectionUrl, {
    useNewUrlParser: true,
    bufferMaxEntries: 0,
    connectTimeoutMS: 5000,
    poolSize,
    useUnifiedTopology: true,
    logger: (msg: any) => {
      Logger.info(`${msg}`);
    },
    loggerLevel: LOG_LEVEL
  });
  const db: Db = con.db(database);
  clients.set(key, db);
};

const isConnected = async (db: Db) => {
  try {
    const connect = await db.command({
      connectionStatus: 1,
      showPrivileges: true
    });
    return !!connect.ok;
  } catch (err) {
    return false;
  }
};

export { isConnected, createConnection, clients };
