export interface ICacheOperations<T> {
  getAll(opts: any, options?: any): Promise<T[]>;
  getOne(key: string, options?: any): Promise<T | null>;
  createOne(key: string, item: T, options?: any): Promise<T>;
  deleteOne(key: string, options?: any): Promise<boolean>;
  getTTL(key: string): Promise<number>;
}
