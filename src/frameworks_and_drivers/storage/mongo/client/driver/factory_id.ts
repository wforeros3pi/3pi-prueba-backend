import { ObjectId } from 'mongodb';

export type validatorIdFn = (id: string) => boolean;
export type idGenFn = () => string;

const idGen = () => {
  return new ObjectId().toHexString();
};

const validatorId = (id: string) => {
  if (!id) return false;
  return ObjectId.isValid(id);
};

const validatorIdThatWorks = (id: string) => {
  if (!id) return false;

  try {
    ObjectId.createFromHexString(id);
  } catch (e) {
    return false;
  }

  return true;
};

const service = { idGen, validatorId, validatorIdThatWorks };
export default service;
export { idGen, validatorId, validatorIdThatWorks };
