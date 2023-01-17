import { Request, Response, NextFunction } from 'express';
import logger from '@fnd/external_interfaces/logger';
import { BaseError } from '@common/dto/errors/base_error';
import { ApiError } from '@common/dto/errors/api_error';
import { HTTPCodesEnum } from '@common/dto/enums/errors_enums';

const Logger = logger(__filename);
/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!err) {
    next();
    return;
  }
  /** Logging Error */
  Logger.error(`ERROR : ${err.message} STACK : ${err.stack}`);
  if (err instanceof BaseError) {
    res.status(err.status || HTTPCodesEnum.INTERNAL_SERVER_ERROR).json(
      new ApiError(err.code, err.error, err.metadata)
    );
  } else if (err instanceof Error) {
    res.status(HTTPCodesEnum.INTERNAL_SERVER_ERROR).json(
      new ApiError(HTTPCodesEnum.INTERNAL_SERVER_ERROR, err.message)
    );
  } else {
    res.status(HTTPCodesEnum.INTERNAL_SERVER_ERROR).json(
      new ApiError(HTTPCodesEnum.INTERNAL_SERVER_ERROR, 'Unknow error')
    );
  }
};
