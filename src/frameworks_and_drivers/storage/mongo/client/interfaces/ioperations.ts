import { Collection } from 'mongodb';

export interface IMongoOperations<T, FDal> {
    // Writing
    insertOne(item: T, collection: Collection): Promise<T>;
    updateOne(id: string, item: T, collection: Collection): Promise<T | null>;
    deleteOne(id: string, collection: Collection): Promise<boolean>;
    // Reading
    findAll(
        filter: FDal,
        options: IOptions,
        collection: Collection
    ): Promise<T[]>;
    findOne(id: string, collection: Collection): Promise<T | null>;
    count(filter: FDal, collection: Collection): Promise<number>;
}

export interface IMongoBulkOperations<T> {
    upsert(query: any, item: T, collection: Collection): Promise<T>;
    insertMany(item: T[], collection: Collection): Promise<T[]>;
}

export interface IOperations<T, FDom> {
    // Writing
    create(item: T): Promise<T>;
    update(id: string, item: T): Promise<T | null>;
    delete(id: string): Promise<boolean>;
    // Reading
    getAll(filter: FDom, options?: IOptions): Promise<T[]>;
    getOne(id: string): Promise<T | null>;
    countRegisters(filter: FDom): Promise<number>;
    // Bulk operations
    upsertDocs(query: any, item: T): Promise<T>;
    createMany(item: T[]): Promise<T[]>;
}

export interface IAditionalOperations<Filter = any, T = any> {
    executeQuery(filter: Filter, options: any): Promise<T>;
}

export interface IOptions {
    skip?: number;
    limit?: number;
    sort?: any;
}
