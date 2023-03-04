import { Request, Response, NextFunction } from 'express';

import boom, { Boom } from '@hapi/boom';
import { ErrorRequestHandler } from 'express-serve-static-core';

export const logErrors: ErrorRequestHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(err);
  }
  next(err);
};

export const wrapErrors: ErrorRequestHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (!err.isBoom) {
    next(boom.badImplementation(err));
  }

  next(err);
};

export const errorHandler: ErrorRequestHandler = (err: Boom, req: Request, res: Response, next: NextFunction) => {
  const {
    output: { statusCode, payload },
  } = err;

  res.status(statusCode).json(payload);
};


