/* eslint-disable require-jsdoc */
import { NextFunction, Request, Response } from 'express';
import config from '../config';
import logger from '../config/winston';
import AppError from './appError';
import getErrorMessage from './getErrorMessage';

const sendErrorDev = (
  error: AppError,
  response: Response,
): Response<any, Record<string, any>> => {
  return response.status(error.statusCode).json({
    status: error.status,
    message: error.message,
    stack: error.stack,
  });
};

const sendErrorProd = (
  error: AppError,
  response: Response,
): Response<any, Record<string, any>> => {
  // Operational, trusted error
  if (error.isOperational) {
    return response.status(error.statusCode).json({
      status: error.status,
      message: error.message,
    });
  }
  // Programming or other unknown error
  return response.status(500).json({
    status: 'error',
    message: 'Oops! Something went wrong',
  });
};

export const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
): Response<any, Record<string, any>> => {
  config.nodeEnv !== 'test' ?? logger.error({ Error: getErrorMessage(error) });

  error.statusCode = error.statusCode || 500;
  error.status = error.status || 'error';

  if (process.env.NODE_ENV === 'production') {
    return sendErrorProd(error, res);
  }

  return sendErrorDev(error, res);
};
