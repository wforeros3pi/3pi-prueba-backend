import { ICacheOperations } from '@common/interfaces/icacheoperations';
import { state } from '@fnd/storage/redis/client/client';

const LIFE_TIME = 1200;

export class RedisImplementation implements ICacheOperations<string> {
  client: any;

  constructor (redisClient: string) {
    this.client = state.clients.get(redisClient);
  }

  async getTTL (key: string): Promise<number> {
    try {
      const ttl = await this.client.ttlAsync(`${key}`);
      return ttl || 0;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  getAll (opts: any, options?: any): Promise<string[]> {
    throw new Error('Method not implemented.');
  }

  async getOne (key: string, options?: any): Promise<any | null> {
    try {
      const r = await this.client.getAsync(`${key}`);
      if (!r) return null;
      return r;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async createOne (key: string, item: string, options?: any): Promise<any> {
    try {
      const { ttl } = options || {};
      await this.client.setAsync(`${key}`, item);
      const r = await this.client.expireAsync(
                `${key}`,
                ttl || LIFE_TIME
      );
      return r;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async deleteOne (key: string, options?: any): Promise<boolean> {
    try {
      const r = await this.client.delAsync(`${key}`);
      return !!r;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
