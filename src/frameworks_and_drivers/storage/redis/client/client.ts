import promisifyAll from '@fnd/external_interfaces/promisify';
import redis from 'redis';

import logger from '@fnd/external_interfaces/logger';
promisifyAll(redis.RedisClient.prototype);
promisifyAll(redis.Multi.prototype);
const Logger = logger(__filename);

export const state = {
  clients: new Map()
};

export const connect = (
  clientKey: string,
  port: number,
  host: string,
  redisPassword?: string
) => {
  const client = createClient(port, host, clientKey, redisPassword);
  state.clients.set(clientKey, client);
  return client;
};

/**
 *
 * @param {number} port
 * @param {string} host
 */
const createClient = (
  port: number,
  host: string,
  key: string,
  redisPassword?: string
) => {
  const client = redis.createClient(port, host, {
    retry_strategy: function (options: any) {
      if (options.error && options.error.code === 'ECONNREFUSED') {
        // End reconnecting on a specific error and flush all commands with
        // a individual error
        return new Error('The server refused the connection');
      }
      if (options.total_retry_time > 1000 * 60 * 60 * 24) {
        // End reconnecting after a specific timeout and flush all commands
        // with a individual error
        return new Error('Retry time exhausted');
      }
      if (options.attempt > Number.MAX_SAFE_INTEGER) {
        // End reconnecting with built in error
        return new Error('Retry attempts limit reached');
      }
      // reconnect after
      return 5000;
    },
    password: redisPassword
  });

  client.on('connect', () =>
    Logger.debug(`Connected to redis :  ${host}:${port}`)
  );
  client.on('reconnecting', () =>
    Logger.debug('reconnecting to redis server')
  );
  client.on('error', (err: any) =>
    Logger.debug(`error redis server ${err.message}`)
  );
  client.on('end', () => Logger.debug('end close connection redis server'));
  client.on('warning', (w: any) => Logger.debug(`error redis server ${w}`));
  client.on('ready', () => Logger.debug(`client ready ${key}`));

  return client;
};
