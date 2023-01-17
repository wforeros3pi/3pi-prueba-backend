/* eslint-disable no-unused-vars */
import { ErrorBadRequest } from '@common/dto/errors/bad_request';
import { DateTime } from 'luxon';

export type getCurrentDateFn = () => Date;
export type getLastDaysFn = (date: Date, daysPlus: number) => Date;
export type setUTCDateFn = (date: Date) => Date;
export type fromISOToDateFn = (date: string) => Date;
export type changeFormatFn = (date: Date) => string;
export type dateValidatorFn = (date: string) => boolean;
export type validToFn = () => Date;
export type checkISOFormat1Fn = (string: string) => boolean;
export type setIsoDateFn = (date: Date) => Date;

type setUTCZeroDateT = (date: DateTime) => Date;

const UTC_TIMEZONE = 'Atlantic/St_Helena';

export enum DateStringFormatEnum {
  DATE_TIME_FORMAT = 'yyyy-MM-dd HH:mm:ss',
  TIME_FORMAT = 'HH:mm:ss',
  DATE_FORMAT = 'yyyy-MM-dd',
}

const getCurrentDate: getCurrentDateFn = () => {
  const UTCDate = setUTCZeroDate(DateTime.now());
  return UTCDate;
};

const getLastDays: getLastDaysFn = (date: Date, days: number) => {
  const sevenLastDays = setUTCZeroDate(
    DateTime.fromJSDate(date).minus({ days })
  );
  return sevenLastDays;
};
const setUTCDate: setUTCDateFn = (date: Date) => {
  const UTCDate = setUTCZeroDate(DateTime.fromJSDate(date));
  return UTCDate;
};

const setIsoDate: setIsoDateFn = (date: Date) => {
  const isoDate = new Date(date.toISOString());
  return isoDate;
};

const validTo: validToFn = () => {
  const dateValidTo = setUTCZeroDate(DateTime.now().plus({ months: 4 }));
  return dateValidTo;
};

const fromISOToDate = (isoDate: string) => {
  if (checkISOFormat(isoDate)) throw new ErrorBadRequest('Date its no valid');
  const resultDate = setUTCZeroDate(DateTime.fromISO(isoDate));
  return resultDate;
};

const setUTCZeroDate: setUTCZeroDateT = (date: DateTime) => {
  return new Date(
    date
      .setZone(UTC_TIMEZONE)
      .toFormat(DateStringFormatEnum.DATE_TIME_FORMAT)
  );
};

const dateValidator: dateValidatorFn = (date: string) => {
  const resultDate = DateTime.fromSQL(date);
  return resultDate.isValid;
};

const checkISOFormat: checkISOFormat1Fn = (item: string) => {
  const ISO8601RegExp =
        /^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])(T|\s)(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(\\.[0-9]+)?(.[0-9]{1,3})??(Z)?$/;
  return ISO8601RegExp.test(item);
};

const service = {
  fromISOToDate,
  getCurrentDate,
  setUTCDate,
  dateValidator,
  validTo,
  checkISOFormat,
  getLastDays,
  setIsoDate
};
export default service;
export {
  fromISOToDate,
  getCurrentDate,
  setUTCDate,
  dateValidator,
  validTo,
  checkISOFormat,
  getLastDays,
  setIsoDate
};
