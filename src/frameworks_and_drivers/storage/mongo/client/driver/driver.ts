import { IMongoOperations, IOptions } from '../interfaces/ioperations';
import { Collection } from 'mongodb';
import { StorageError } from '@common/dto/errors/storage_error';

export abstract class MongoDriver<T, FDal>
implements IMongoOperations<T, FDal> {
  /**
     *
     * @param item items to insert
     * @param collection mongo collection
     * @returns
     */
  async insertMany (item: T[], collection: Collection<any>): Promise<T[]> {
    try {
      const result = await collection.insertMany(item);
      return <T[]>result.ops;
    } catch (error: any) {
      throw new StorageError(error.message);
    }
  }

  /**
     *
     * @param query Query for upserting docs
     * @param items items to insert
     * @param collection mongo collection
     * @returns
     */
  async upsert (query: any, item: T, collection: Collection): Promise<T> {
    try {
      const result = await collection.replaceOne(query, item, {
        upsert: true
      });
      return <T>result.ops[0];
    } catch (error: any) {
      throw new StorageError(error.message);
    }
  }

  /**
     *
     * @param item Item to save
     * @param collection name of collection
     * @returns
     */
  async insertOne (item: T, collection: Collection): Promise<T> {
    try {
      const result = await collection.insertOne(item);
      return <T>result.ops[0];
    } catch (error: any) {
      throw new StorageError(error.message);
    }
  }

  /**
     *
     * @param id Id of item to update
     * @param item data to update
     * @param collection name of collection
     * @returns
     */
  async updateOne (
    id: string,
    item: T,
    collection: Collection
  ): Promise<T | null> {
    try {
      const result = await collection.findOneAndUpdate(
        { _id: id },
        { $set: item },
        { returnOriginal: false }
      );
      return result.value;
    } catch (error: any) {
      throw new StorageError(error.message);
    }
  }

  /**
     *
     * @param id Id of item to delete
     * @param collection name of collection
     * @returns
     */
  async deleteOne (id: string, collection: Collection): Promise<boolean> {
    try {
      const result = await collection.findOneAndDelete({ _id: id });
      return !!result.ok;
    } catch (error: any) {
      throw new StorageError(error.message);
    }
  }

  /**
     *
     * @param filter query of search
     * @param options options of search
     * @param collection name of collection
     * @returns
     */
  async findAll (
    filter: FDal,
    options: IOptions,
    collection: Collection
  ): Promise<T[]> {
    try {
      const result = await collection.find(filter, options).toArray();
      return <T[]>result;
    } catch (error: any) {
      throw new StorageError(error.message);
    }
  }

  /**
     *
     * @param id id of item to retrieve
     * @param collection name of collection
     * @returns
     */
  async findOne (id: string, collection: Collection): Promise<T> {
    try {
      const result = await collection.findOne({
        _id: id
      });
      return <T>result;
    } catch (error: any) {
      throw new StorageError(error.message);
    }
  }

  /**
     *
     * @param filter query of search
     * @param collection name of collection
     * @returns
     */
  async count (filter: FDal, collection: Collection): Promise<number> {
    try {
      const result: number = await collection.countDocuments(filter);
      return result;
    } catch (error: any) {
      throw new StorageError(error.message);
    }
  }
}
